// function that takes in a base64 encoded image and saves it to the local file system
import fs from 'fs';
import { randomUUID } from 'crypto';
import path from 'path';

export const LocalImageService = {
    saveImage: async (image: string) => {
        try {
            // Decode image from base64
            const decodedImage = Buffer.from(image, 'base64');

            // Image Name
            const fileID = `${randomUUID()}`;
            const fileDate: Number = Date.now();
            const fileName = `${fileID}_${fileDate}.png`;

            const fileSize = decodedImage.length;


            // File Path
            const relativePath = path.join(__dirname, '../../S3/');
            const filePath = `${relativePath}/${fileName}`;

            // Write file to local file system
            fs.writeFileSync(filePath, decodedImage);

            // Return file path
            return {
                fileID,
                fileDate,
                fileName,
                filePath,
                fileSize,
            };
        } catch (error) {
            console.error(error);
            throw ({ message: 'Error occurred while saving image', error });
        }
    },
    retriveImage: async (imagePath: string) => {
        try {
            // Read file from local file system
            const image = fs.readFileSync(imagePath);

            // Encode image to base64
            const encodedImage = Buffer.from(image).toString('base64');

            // Return encoded image
            return encodedImage;
        } catch (error) {
            console.error(error);
            throw ({ message: 'Error occurred while retrieving image', error });
        }
    }
};