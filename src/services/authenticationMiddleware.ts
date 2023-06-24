import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { apiGatewayDev, apiGatewayProd } from "../../config/api_gateway";

const environment = process.env.ENV ;

let apiGateway: string;

if (environment === 'production') {
  apiGateway = apiGatewayProd;
} else {
  apiGateway = apiGatewayDev;
}

console.log(`API Gateway: ${apiGateway}`)

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
    
    if (!data.tokenValid) {
      // Token is not valid or verification failed
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    // Fix this later
    (req as any).tokenData = data;

    // Token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error occurred during authentication:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authenticationMiddleware;
