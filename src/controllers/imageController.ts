import { Request, Response } from 'express';

export const ImageController = {
  uploadImage: async (req: Request, res: Response) => {
    try {
      // Decode image from base64

      // Call Image save function

      // Save to database

      // Return success

      res.status(201).json({  });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
