import mongoose from 'mongoose';

const artistSchema = mongoose.Schema(
  {
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // 작가코드
    code: {
      type: String,
      required: true,
    },
    name: {
      // 작가명
      type: String,
      required: true,
    },
    aka: {
      // 활동명 (영문)
      type: String,
    },
    record: {
      // 작가소개
      type: String,
    },
    thumbnail: {
      type: String,
    },
    joinAt: {
      // 작가 등록일
      type: Date,
      required: true,
      default: () => Date.now() + 9 * 60 * 60 * 1000,
    },
    countOfWorks: {
      // 작가와 연결된 상품이 등록될 떄마다 카운트 올려주기
      type: Number,
      required: true,
      default: 1,
    },
    isActive: {
      // 중단 여부
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { versionKey: false },
);

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
