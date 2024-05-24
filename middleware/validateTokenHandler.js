import ah from "express-async-handler";
import jwt from "jsonwebtoken";
import { constants } from "../constants.js";

const validateToken = ah(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Authorization token is missing or invalid");
        }
        
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(constants.UNAUTHORIZED);
        throw new Error("User is not authorized");
    }
});

export default validateToken;
