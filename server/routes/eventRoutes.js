import express from 'express';
import {
  addEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect, admin } from '../middleware/auth.js'; // for private routes

const router = express.Router();

// endpoint => /api/events
router.route('/').get(getEvents).post(protect, admin, addEvent);
router
  .route('/:id')
  .get(protect, admin, getEventById)
  .patch(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

// 이벤트 추가, 수정, 삭제
// 모든 이벤트, 해당 이벤트 get
export default router;
