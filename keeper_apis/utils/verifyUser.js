import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return next(errorHandler(401,false,"Unauthorized user",));
    jwt.verify(token,process.env.JWT_TOKEN,(error,user)=>{
        if (error) return next(errorHandler(403,false,"Forbidden"));

        req.user = user;
        next();
    });
};