import express from 'express';
import { ImageController } from '../controllers/imageController';

export const imageRoutes = express.Router();

imageRoutes.post('/', ImageController.uploadImage);
imageRoutes.get('/:imageId', ImageController.getImage);
imageRoutes.delete('/:imageId', ImageController.deleteImage);

// Add more routes as needed
