import express from 'express';
import {
  createArtist,
  getArtists,
  updateArtist,
  inActivateArtist,
  getArtistById,
  zzimArtist,
  getZzimArtists,
} from '../controllers/artistController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// endpoint => /api/artists
router.route('/zzim').patch(protect, zzimArtist).get(protect, getZzimArtists);
router
  .route('/')
  .get(getArtists)
  .post(protect, admin, createArtist)
  .patch(protect, admin, inActivateArtist);
router.route('/:id').patch(protect, admin, updateArtist).get(getArtistById);

export default router;
