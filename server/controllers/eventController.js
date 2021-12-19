import asyncHandler from 'express-async-handler';
import Event from '../models/event.js';

// @desc   Create a event
// @route  POST /api/events
// @access Private/Admin
const addEvent = asyncHandler(async (req, res) => {
  const { heading, content, linkname, link, image } = req.body;
  if (heading && content && linkname && link && image) {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } else {
    res.status(400).json({ message: '내용을 모두 입력해주세요' });
  }
});

// @desc   Fetch all events
// @route  GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
  // const events = await Event.find({});
  const events = await Event.aggregate([{ $sample: { size: 4 } }]);
  res.json(events);
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
  await Event.deleteOne({ _id: req.params.id });
  res.status(200).json({ messsage: '해당 배너가 정상적으로 삭제되었습니다' });
});

export { getEvents, addEvent, updateEvent, deleteEvent };
