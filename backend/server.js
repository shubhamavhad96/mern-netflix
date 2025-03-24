import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';   // this is coming from node and we are using it to get the path of the file

import authRoutes from './routes/auth.route.js';  // here we are importing the authRoutes from the auth.route.js file
import movieRoutes from './routes/movie.route.js';  // here we are importing the authRoutes from the auth.route.js file
import tvRoutes from './routes/tv.route.js';  // here we are importing the authRoutes from the auth.route.js file
import searchRoutes from './routes/search.route.js';  // here we are importing the authRoutes from the auth.route.js file


import { ENV_VARS } from './config/envVars.js';   // this is the object that contains the environment variables from the .env file
import { connectDB } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';


const app = express();
const PORT = ENV_VARS.PORT;   // here we are using the PORT from the ENV_VARS object for the server and setting it to 3000 it will help to run the server on port 3000
const __dirname = path.resolve();  // here we are using the path.resolve() method to get the path of the file

app.use(express.json());  // this is neccessary to parse the request body that we used in the signup function in the auth.controller.js file

app.use(cookieParser());  // here we are using the cookieParser middleware to parse the cookies that we set in the login function in the auth.controller.js file

// In the protectRoute function the cookie is not going to work without the cookieParser middleware so we need to add the cookieParser middleware to the server

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);   // here we are using the protectRoute middleware to protect the movie routes same with the tv routes why 
// because we want to protect the movie and tv routes so that only the authenticated users can access the routes
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if(ENV_VARS.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));  // here we are using the express.static() method to serve the static files from the frontend/dist folder
    // this is going to be our react/client application 

    //the below line means if we see any other route other than this show them a react application
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));  // here we are using the res.sendFile() method to send the index.html file from the frontend/dist folder to the client
    })
}

app.listen(PORT, () => {                                     // instead of using the hard coded port number we are using the PORT from the ENV_VARS object
    console.log('server started at http://localhost:' + PORT);  // here we replaced the hard coded port number with the PORT from the ENV_VARS object
    connectDB();  // here we are calling the connectDB function to connect to the database
})
