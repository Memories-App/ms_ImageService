import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { imageRoutes } from './src/routes/imageRoutes';
import serviceRoutes from './src/routes/serviceRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());            // middleware that enables Cross-Origin Resource Sharing (CORS) in Express.js.
app.use(helmet());          //  adds various security headers to enhance the security of your application.

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
