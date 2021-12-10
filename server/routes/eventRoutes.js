import express from 'express';
import {
  addEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// endpoint => /api/events
router.route('/').get(getEvents).post(protect, admin, addEvent);
router
  .route('/:id')
  .patch(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

export default router;
