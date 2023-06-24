import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { imageRoutes } from './src/routes/imageRoutes';
import serviceRoutes from './src/routes/serviceRoutes';

import ImageType from './src/models/image_type';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());            // middleware that enables Cross-Origin Resource Sharing (CORS) in Express.js.
app.use(helmet());          //  adds various security headers to enhance the security of your application.

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ueytzgw.mongodb.net/?retryWrites=true&w=majority`)
  .then(async () => {
    console.log('Connected to MongoDB');

    const imageTypesToCheck = {
      moon: 30,
      core: 90,
      timecapsule: 365,
    };

    // Check if image types exist, and create them if they don't
    for (const imageType in imageTypesToCheck) {
      const existingType = await ImageType.findOne({ type: imageType });

      if (!existingType) {
        const expirationDays = imageTypesToCheck[imageType];
        const newImageType = new ImageType({ type: imageType, date: new Date(), expiration: expirationDays });
        await newImageType.save();
        console.log(`Created image type: ${imageType}`);
      }
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });


// Allow parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.text({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/', serviceRoutes) // Mount the serviceRoutes middleware
app.use('/images', imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
