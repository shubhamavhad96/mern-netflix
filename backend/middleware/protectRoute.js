// we are going to create a middleware to protect the routes that need authentication by taking the token from the cookies and then we will decode it and then we will check if the user is authenticated or not
// if the user is authenticated then we will allow the user to access the protected routes otherwise we will send the error message

import jwt from 'jsonwebtoken';  // here we are importing the jwt from the jsonwebtoken package
import { User } from '../models/user.model.js';  // here we are importing the User model from the user.model.js file
import { ENV_VARS } from '../config/envVars.js';  // here we are importing the ENV_VARS object from the envVars.js file


// next function is if this is successful then call the next function that is movie or tv 

export const protectRoute = async (req, res, next) => { 
    try {
        const token = req.cookies["jwt-netflix"];  // here we are getting the token from the cookies that we set in the login function in the auth.controller.js file

        // for this we will add cookie parser in the server.js file to parse the cookies

        if(!token) { 
            return res.status(401).json({success: false, message: "Unauthorized - No Token Provided"})  // if the token is not provided then it will send the 401 status code
         }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);  // here we are decoding the token that we get from the cookies, it is the same we used to create the token in the auth.controller.js file

        if(!decoded) { 
            return res.status(401).json({success: false, message: "Unauthorized - Invalid Token"})  // if the token is invalid then it will send the 401 status code
         }

         // but if we pass this above checks then we will get the user id from the decoded token

         const user = await User.findById(decoded.userId).select("-password");  // here we are finding the user by the user id that we get from the decoded token and we are excluding the password from the user object

         // if the user is not found then we will send the 404 status code

         if(!user) { 
            return res.status(404).json({success: false, message: "User Not Found"}) 
         }

        req.user = user;   // we will fetch the user from the database so that we will authenticate the user

         // if the user is found then we will call the next function

         next();  
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({success: false, message: "Internal Server Error"})  
    }
 }