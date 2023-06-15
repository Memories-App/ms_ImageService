import express from 'express';

import { header, body } from 'express-validator';
import { ImageController } from '../controllers/imageController';
import authenticationMiddleware from '../services/authenticationMiddleware';

export const imageRoutes = express.Router();

imageRoutes.post('/upload', 
authenticationMiddleware,
    header('Authorization' ).notEmpty().withMessage('Authentication header is missing'),
    body('image').notEmpty().withMessage('Image is missing'),
    ImageController.uploadImage);

// Add more routes as needed
