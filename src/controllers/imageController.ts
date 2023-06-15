import { Request, Response } from 'express';
import { LocalImageService } from '../services/LocalImageService';

export const ImageController = {
  uploadImage: async (req: Request, res: Response) => {
    try {
      const base64_image = req.body;     
      
      // Call Image save function
      const imageData = await LocalImageService.saveImage(base64_image);

      // Save to database

      // Return success

      res.status(201).json(imageData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
