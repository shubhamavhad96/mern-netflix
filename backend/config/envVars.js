import dotenv from 'dotenv';


dotenv.config(); // Load environment variables from .env file

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,  // here we are using the MONGO_URI from the .env file for the database connection 
    PORT: process.env.PORT || 3000,    // this will help to run the server on port 3000 if the PORT is not set in the .env file
    JWT_SECRET: process.env.JWT_SECRET,  // this is the secret key that we are using for the jwt token
    NODE_ENV: process.env.NODE_ENV,      // this is the environment that we are using for the server
    TMDB_API_KEY: process.env.TMDB_API_KEY,  // this is the api key that we are using to fetch the data from the TMDB API
}