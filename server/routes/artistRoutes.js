import express from 'express';
import {
  createArtist,
  getArtists,
  updateArtist,
  getArtistById,
  likeArtist,
} from '../controllers/artistController.js';
import { protect, admin } from '../middleware/auth.js'; // for private routes

const router = express.Router();

// endpoint => /api/artists
router.route('/like').patch(protect, likeArtist);
router.route('/').post(protect, admin, createArtist).get(getArtists);
router.route('/:id').patch(protect, admin, updateArtist).get(getArtistById);

export default router;
