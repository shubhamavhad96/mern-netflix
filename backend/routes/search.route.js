import express from 'express';
import { getSearchHistory, removeItemFromSearchHistory, searchMovie, searchPerson, searchTv } from '../controllers/search.controller.js';

const router = express.Router();

// the person is going to be the actor and the query is going to be the name of the actor

router.get('/person/:query',searchPerson);  // here we are using the searchPerson function to search for the person
router.get('/movie/:query',searchMovie);  //  here we are using the searchMovie function to search for the movie
router.get('/tv/:query',searchTv);  // here we are using the searchTv function to search for the tv show

// all of the above functions are going to be used to search for the person, movie and tv show

// and below is the function to get the search history

router.get('/history',getSearchHistory);  // here we are using the getSearchHistory function to get the search history

router.delete('/history/:id',removeItemFromSearchHistory);  // here we are using the removeItemFromSearchHistory function to remove the item from the search history

// here id is the id of the item that we want to remove from the search history

export default router;  