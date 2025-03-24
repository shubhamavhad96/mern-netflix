import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {

    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {  // if the name is not found in the database then we are going to send the response as null
            return res.status(404).send(null);
        }

        // we are going to save this to search history when the usere search for the person or the movie or the tv show we are going to have a entire section of search history in the frontend

        // we are using the below code to save the search history in the database
        // await is used to wait for the search history to be saved in the database before sending the response to the frontend
        

        await User.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory: {
                    id:response.results[0].id,                  // this means that we are going to save the id of the person in the search history
                    image: response.results[0].profile_path,     // this means that we are going to save the image of the person, movie or a tv show in the search history
                    title: response.results[0].name,             // this means that we are going to save the name of the person, movie or a tv show in the search history
                    searchType: "person",                         // means that we are going to save the type of the search in the search history
                    createdAt: new Date(),                        // this means that we are going to save the date and time when the search was made
                } 
            }                 
        })
        res.status(200).json({success: true, content: response.results});

    } catch (error) {
        console.log("Error in searchPerson controller: ", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}
export async function searchMovie(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {  // if the name is not found in the database then we are going to send the response as null
            return res.status(404).send(null);
        }

        // this means if this is not null then update the search history in the database

        await User.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory: {
                    id:response.results[0].id,                 
                    image: response.results[0].poster_path,     // all the sections are the same as the searchPerson function but here instead of profile path we are using the poster path
                    title: response.results[0].title,           // here we are using the title of the movie instead of the name of the person  
                    searchType: "movie",                        // here we are using the movie instead of the person 
                    createdAt: new Date(),                        
                } 
            }                 
        })
        res.status(200).json({success: true, content: response.results});

    } catch (error) {
        console.log("Error in searchMovie controller: ", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}
export async function searchTv(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {  // if the name is not found in the database then we are going to send the response as null
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory: {
                    id:response.results[0].id,                 
                    image: response.results[0].poster_path,     // all the sections are the same as the searchPerson function but here instead of profile path we are using the poster path
                    title: response.results[0].name,           // here we are using the title of the tv instead of the name of the person  
                    searchType: "tv",                        // here we are using the tv instead of the person 
                    createdAt: new Date(),                        
                } 
            }                 
        })

        res.status(200).json({success: true, content: response.results});

    } catch (error) {
        console.log("Error in searchTv controller: ", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export async function getSearchHistory(req, res) {
    try {
        // here we dont need to get the content from the database, we already have the user under the req object

        // and why this is possible because we put the usere object in the req object in the protectRoute middleware
        res.status(200).json({success: true, content: req.user.searchHistory});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export async function removeItemFromSearchHistory(req, res) {

    // normally in the req.params object the id is a string but we need to convert it to an integer so that we can delet it because the id in the search history is an integer
    // os that's why the history was not deleting even aftee we deleted the item from the search history

    // we can check the type of the id using the typeof operator

    // console.log(typeof id);  // here we are checking the type of the id

    let { id } = req.params;

    id = parseInt(id);  // here we are converting the id to an integer
    
    try {
        await User.findByIdAndUpdate(req.user._id,{              // here we are using the $pull operator to remove the item from the search history
            $pull: {
                searchHistory: {id: id}
            }
        })
        res.status(200).json({success : true, message: "Item removed from search history"});
    } catch (error) {
        console.log("Error in removeItemFromSearchHistory controller: ", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}
    