import express from 'express';
import { getSimilarTvs, getTrendingTv, getTvDetails, getTvsByCategory, getTvTrailers } from '../controllers/tv.controller.js';

const router = express.Router();

router.get('/trending', getTrendingTv);   // here we are using the get method to get the trending movies from the database
router.get('/:id/trailers', getTvTrailers);  // here we are using the get method to get the trailers of the movie from the database
router.get('/:id/details', getTvDetails);  // here we are using the get method to get the trailers of the movie from the database
router.get('/:id/similar', getSimilarTvs);  // here we are using the get method to get the trailers of the movie from the database
router.get('/:category', getTvsByCategory);

export default router;  