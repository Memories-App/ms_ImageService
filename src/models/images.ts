import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    imageID: { type: String, required: true },
    imageDate: { type: Date, required: true },
    imagePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileName: { type: String, required: true },
    image_type: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
