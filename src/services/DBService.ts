import User from "../models/user";
import Image from "../models/images";

const DBService = {
    async saveImageToDatabase(
        userEmail: string,
        imageId: string,
        imageDate: Number,
        imagePath: string,
        fileName: string,
        fileSize: number,
        imageType: string
    ) {
        try {
            // Find the user in the user collection
            const user = await User.findOne({ email: userEmail });

            // Create a new image object
            const image = new Image({
                imageID: imageId,
                imageDate: imageDate,
                imagePath: imagePath,
                image_type: imageType,
                fileName: fileName,
                fileSize: fileSize,
                owner: user?._id
            });

            // Save the image to the database
            await image.save();
            return image;
        } catch (error) {
            console.error('Error saving image to database:', error);
            throw {
                error: 'Error saving image to database',
            };
        }
    },

    async checkDuplicateImage(userEmail: string, imageType: string) {
        // Find the user in the user collection
        const user = await User.findOne({ email: userEmail });

        const existingImage = await Image.findOne({ owner: user?._id, image_type: imageType });

        return existingImage ? true : false;
    }
};

export default DBService;
