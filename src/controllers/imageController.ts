import { Request, Response } from 'express';
import { LocalImageService } from '../services/LocalImageService';
import ImageType from '../models/image_type';
import User from '../models/user';
import Image from '../models/images';

import DBService from '../services/DBService';

export const ImageController = {
  /**
   * Description: Uploads an image for a user.
   * Parameters to pass in HTTP Request:
   * - Headers:
   *   - Authorization: The user's authorization token.
   *   - imageType: The type of the image (e.g., "moon", "core", "timecapsule").
   * - Body:
   *   - The base64-encoded image data.
   */
  uploadImage: async (req: Request, res: Response) => {
    try {
      // Get E-Mail from the Authorization header
      const email = (req as any).tokenData.profile.email;
      const imageType: string = String(req.headers.imagetype);
      const base64_image = req.body;

      // Check if the user already has an image of the same type
      await DBService.checkDuplicateImage(email, imageType);

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
      res.status(500).json({ error: error });
    }
  },

  getImageIds: async (req: Request, res: Response) => {
    try {
      // Get E-Mail from the Authorization header
      const userEmail = (req as any).tokenData.profile.email;

      // Get user ID from email
      const { _id: userId } = await User.findOne({ email: userEmail });

      // Get all distinct image types from the database
      const imageTypes = await ImageType.distinct('type');

      // Find all images for the user with the specified types
      const images = await Image.find({ owner: userId, image_type: { $in: imageTypes } }, 'imageID image_type');

      // Group image IDs by type
      const imageIdsByType = {};

      imageTypes.forEach((type) => {
        const image = images.find((img) => img.image_type === type);
        imageIdsByType[type] = image ? image.imageID : null;
      });

      res.status(200).json(imageIdsByType);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  },
  getImageById: async (req: Request, res: Response) => {
    try {
      // Get E-Mail from the Authorization header
      const userEmail = (req as any).tokenData.profile.email;

      // Get user ID from email
      const { _id: userId } = await User.findOne({ email: userEmail });

      // Get Image by ID req.headers.imageid
      const { imagePath, imageDate } = await Image.findOne({ owner: userId, imageID: req.headers.imageid });

      // Retrieve image from local file system
      const image = await LocalImageService.retriveImage(imagePath);

      // Return image
      res.status(200).json({
        image: image,
        date: imageDate,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  },
};

