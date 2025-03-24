import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js'; 


export const generateTokenAndSetCookie = (userId, res) => {       // this line means we are taking userId and res and we are exporting the function so that we can use it in other files
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: '15d'}); // this line means we are creating a token with the userId and the secret key and the token will expire in 15 days  

    // now that we have the token we will set the token in the cookie

    res.cookie("jwt-netflix", token, {      // this line means we are setting the token in the cookie with the name jwt-netflix
        maxAge: 15 * 24 * 60 * 60 * 1000,  // this line means the token will expire in 15 days and we are converting the days into milliseconds
        httpOnly: true,                     // this line means the cookie will be accessible only by the server / browser and not by the javascript, prevents XSS attacks
        sameSite:"strict",                   // this line means the cookie will be sent only to the same site and not to the other sites prevents CSRF attacks
        secure: ENV_VARS.NODE_ENV !== 'development', // this line means the cookie will be sent only on the secure connection and not on the insecure connection  
    })

    return token;  // this line means we are returning the token so that we can use it in other files
}
