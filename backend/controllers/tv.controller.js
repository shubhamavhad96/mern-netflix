import { fetchFromTMDB } from '../services/tmdb.service.js';

// here in this file we are writing the logic to fetch the trending movies from the TMDB API so that we can show the trending movies on the home page of the website

export async function getTrendingTv(req, res) {       // this means fetch that trending movie from the database
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US") // this is the url from where we are fetching the trending movies from TMDB
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];  // here we are getting the random movie from the trending movies it will show the random movie from the trending movies

        // here in above code i added ? after the results because if the results is null then it will not throw the error it will return the null
        res.json({ success: true, content: randomMovie })  // here we are sending the response to the frontend with the random movie
    } catch (error) {
        console.log("Error in /add-movie", error);
        res.status(500).json({success: false, message: "Internal Server Error"})  
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params;  // here we are getting the id of the movie from the request parameters that we used in the route
    try {
       const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)  // fetching the trailers of the movie from the TMDB API and id here is dynamic,
       // it will get the id of the movie from the request parameters
       res.json({ success: true, trailers: data.results })  //sending the response to the frontend with the trailers of the movie
    
       // we are using data.results because the trailers are stored in the results array in the data object that we get from the TMDB API
    } catch (error) {
        if(error.message.includes("404")) {    // this is the error handling if the movie is not found then it will send the 404 status code
            return res.status(404).send(null)  // if the movie is not found then it will send the 404 status code
         }
        res.status(500).json({success: false, message: "Internal Server Error"})  // if there is any other error then it will send the 500 status code
    }
}


export async function getTvDetails(req, res) {
    const { id } = req.params;  
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)  // fetching the details of the movie from the TMDB API and id here is dynamic,
        res.status(200).json({ success: true, content: data })  //sending the response to the frontend with the details
    } catch (error) {
        if(error.message.includes("404")) {    // this is the error handling if the movie is not found then it will send the 404 status code
           return res.status(404).send(null)  // if the movie is not found then it will send the 404 status code
        }
        res.status(500).json({success: false, message: "Internal Server Error"})  // if there is any other error then it will send the 500 status code
    }
}

export async function getSimilarTvs(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)  // fetching the similar movies from the TMDB API and id here is dynamic,
        res.status(200).json({ success: true, similar: data.results })  //sending the response to the frontend with the similar movies
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"})  // if there is any other error then it will send the 500 status code
    }
}

export async function getTvsByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)  // fetching the movies by category from the TMDB API and category here is dynamic,
        res.status(200).json({ success: true, content: data.results })  
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}