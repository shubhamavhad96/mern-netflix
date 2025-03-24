import express from 'express';
import { authCheck, login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();  // here we are using express.Router() to create a new router object


router.post('/signup',signup)       // '/' is the root route for the server and where get the request and response the main page, also called controller function
                                    // now i changed it from get to post because we are sending the data to the server and we are creating a new user so we are using the post method

router.post('/login',login)         // '/' is the root route for the server and where get the request and response the main page, also called controller function
                                

router.post('/logout',logout)      // '/' is the root route for the server and where get the request and response the main page, also called controller function


router.get('/authCheck',protectRoute,authCheck)      // '/' this is for the authentication check to check if the user is authenticated or not





export default router;  // we are exporting the router object so that we can use it in other files


