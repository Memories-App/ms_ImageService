import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { apiGateway } from "../../config/api_gateway";

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization) {
      // Authentication header is missing
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    // Send Post to API Gateway to verify token
    const response = await fetch(`${apiGateway}/authentication/auth/verifyToken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization
        },  
        body: JSON.stringify({ token: authorization })
    });

    const data = await response.json();
    
    if (response.status !== 200 || data.tokenValid === false) {
      // Token is not valid or verification failed
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    // Token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error occurred during authentication:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authenticationMiddleware;
