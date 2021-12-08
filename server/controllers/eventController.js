import asyncHandler from 'express-async-handler';
import Event from '../models/event.js';

// @desc   Create a event
// @route  POST /api/events
// @access Private/Admin
const addEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
});

// @desc   Fetch all events
// @route  GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ _id: -1 });
  res.json(events);
});

// @desc   Fetch single event
// @route  GET /api/events/:id
// @access Private/Admin
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) res.json(event);
  else {
    res.status(404).json({ message: '해당 배너가 존재하지 않습니다' });
  }
});

// @desc   Update a event
// @route  PATCH /api/events/:id
// @access Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(event);
});

// @desc   Delete the event
// @route  DELETE /api/events/:id
// @access Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(200).json({ messsage: '해당 배너가 정상적으로 삭제되었습니다' });
});

export { getEvents, getEventById, addEvent, updateEvent, deleteEvent };
