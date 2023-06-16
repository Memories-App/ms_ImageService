import mongoose from 'mongoose';

export interface User {
    id: string;
    name: {
        familyName: string;
        givenName: string;
    };
    email: string;
    picture: string;
    accessToken: string;
}
  
// MongoDB Schema
const userSchema = new mongoose.Schema({
  picture: { type: String, required: true },
  name: { type: Object, required: true },
  email: { type: String, required: true },
  last_login: { type: Date, required: true, default: Date.now },
  image_type: { type: String, required: true, },
  strategy: { type: String, required: true, },
});

const User = mongoose.model('User', userSchema);

export default User;

 