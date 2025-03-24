import axios from 'axios';     // this is the library that we will use to make requests to the TMDB API
import { ENV_VARS } from '../config/envVars.js';  // this is the object that contains the environment variables from the .env file

// why we craeted this function? because we want to fetch the data from the TMDB API and whenever we want to fetch any data from the TMDB API we will use this function so that we don't have to write the same code again 
// and again we created a new file for this function so that we can use this function in other files
// this function will take the url as an argument and it will return the data that we got from the TMDB API

export const fetchFromTMDB = async (url) => {      
    const options = {                           // options is an object that contains the method and the headers that we will use to fetch the data from the TMDB API
        headers: {                              // this line means we are using the headers to fetch the data from the TMDB API
          accept: 'application/json',           // this line means we are accepting the data in the json format
          Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`   // this line means we are using the TMDB_API_KEY from the ENV_VARS object to fetch the data from the TMDB API
        }
    };

    const response = await axios.get(url, options);  // here we are using the axios library to fetch the data from the TMDB API with the url and the options

    if(response.status !== 200) { 
        throw new Error('Failed to fetch data from TMDB' + response.statusText);  // if the status code is not 200 then it will throw an error and we will get the error message with the status text
     }

    // this is how we fetch the data with the axios library

    return response.data;  // here we are returning the data that we got from the TMDB API
}