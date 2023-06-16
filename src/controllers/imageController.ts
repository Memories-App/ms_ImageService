import { Request, Response } from 'express';
import { LocalImageService } from '../services/LocalImageService';

import DBService from '../services/DBService';

export const ImageController = {
  uploadImage: async (req: Request, res: Response) => {
    try {

      // Get E-Mail from the Authorization header
      const email = (req as any).tokenData.profile.email;
      const imageType: string = String(req.headers.imagetype);      

      const base64_image = req.body;

      // Check if the user already has an image of the same type
      const hasDuplicateImage = await DBService.checkDuplicateImage(email, imageType);

      if (hasDuplicateImage) {
        const error = 'Image type already used';
        const createdAt = new Date();
        return res.status(400).json({ error, createdAt });
      }

      // Call Image save function
      const { fileID, fileDate, filePath, fileSize, fileName } = await LocalImageService.saveImage(base64_image);

      // Save to database
      const dbResult = await DBService.saveImageToDatabase(
        email,
        fileID,
        fileDate,
        filePath,
        fileName,
        fileSize,
        imageType
      );

      // Return success

      res.status(201).json(dbResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
