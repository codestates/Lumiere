import mongoose from 'mongoose';

const artistSchema = mongoose.Schema(
  {
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    code: {
      // 작가코드
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    aka: {
      // 활동명 (영문)
      type: String,
    },
    record: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    joinAt: {
      type: Date,
      required: true,
      default: () => Date.now() + 9 * 60 * 60 * 1000,
    },
    countOfWorks: {
      type: Number,
      required: true,
      default: 1,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { versionKey: false },
);

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
