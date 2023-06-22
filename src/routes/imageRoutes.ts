import express from 'express';
import { header, body, validationResult } from 'express-validator';
import { ImageController } from '../controllers/imageController';
import authenticationMiddleware from '../services/authenticationMiddleware';

export const imageRoutes = express.Router();

imageRoutes.post('/upload',
    authenticationMiddleware,
    [
        header('Authorization').notEmpty().withMessage('Authentication header is missing'),
        header('imageType').notEmpty().withMessage('Image type is missing'),
        body('image').notEmpty().withMessage('Image is missing')
    ],
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Missing parameters', missingParams: errors.array() });
        }

        // If all parameters are present, proceed to the controller
        next();
    },
    ImageController.uploadImage
);

imageRoutes.get("/getImageIds",
    authenticationMiddleware,
    [
        header('Authorization').notEmpty().withMessage('Authentication header is missing')
    ],
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Missing parameters', missingParams: errors.array() });
        }

        // If all parameters are present, proceed to the controller
        next();
    },
    ImageController.getImageIds
)

// Add more routes as needed
