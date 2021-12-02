import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    heading: {
      // 배너 타이틀
      type: String,
      required: true,
    },
    content: {
      // 내용
      type: String,
      required: true,
    },
    linkname: {
      // 링크명
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
