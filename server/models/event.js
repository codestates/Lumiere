import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    linkname: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
