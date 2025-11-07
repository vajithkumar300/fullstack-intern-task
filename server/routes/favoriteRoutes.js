import express from 'express';
import { protect } from '../middlewares/auth.js';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoriteController.js';
const favoriteRoutes = express.Router();

;

favoriteRoutes.post('/:templateId', protect, addFavorite);
favoriteRoutes.delete('/:templateId', protect, removeFavorite);
favoriteRoutes.get('/', protect, getFavorites);

export default favoriteRoutes;
