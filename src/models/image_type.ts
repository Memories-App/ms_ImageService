import mongoose from "mongoose";

const imageTypeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    expiration: { type: Number, required: true}
});

const ImageType = mongoose.model('ImageType', imageTypeSchema);

export default ImageType;