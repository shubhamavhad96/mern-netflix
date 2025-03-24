import express from 'express';
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingMovie } from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/trending', getTrendingMovie);   // here we are using the get method to get the trending movies from the database
router.get('/:id/trailers', getMovieTrailers);  // here we are using the get method to get the trailers of the movie from the database
router.get('/:id/details', getMovieDetails);  // here we are using the get method to get the trailers of the movie from the database
router.get('/:id/similar', getSimilarMovies);  // here we are using the get method to get the trailers of the movie from the database
router.get('/:category', getMoviesByCategory);  // here we are using the get method to get the trailers of the movie from the database

export default router;  // here we are exporting the router object