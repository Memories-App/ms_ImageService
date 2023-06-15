import express from 'express';

const router = express.Router();

export const Servicecontroller = {
    getServices: async (req, res) => {
        try {
            
            return res.json({ 
                service: 'image-service', 
                status: 'running',
                routes: [
                    {
                        method: 'GET',
                        path: '/',
                        description: 'Get all available routes and sercice information',
                    },
                    {
                        method: 'POST',
                        path: '/images/upload',
                        description: 'Upload an Image',
                    },
                ]
             });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};