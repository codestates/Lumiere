import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Artist',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    artCode: {
      // 작품 코드
      type: String,
      unique: true,
      required: true,
    },
    title: {
      // 작품명
      type: String,
      trim: true,
      required: true,
    },
    image: {
      // 이미지
      type: String,
      required: true,
    },
    theme: {
      // 테마 [인물, 풍경, 정물, 동물, 상상, 추상]
      type: String,
      required: true,
    },
    info: {
      // 작품 정보(유형, 사이즈, 제작년도)
      details: {
        type: String,
        required: true,
      },
      size: {
        // 52x73cm
        type: String,
        required: true,
      },
      canvas: {
        // 20
        type: Number,
        required: true,
      },
      createdAt: {
        // 제작년도
        type: String,
        required: true,
      },
    },
    price: {
      // 금액
      type: Number,
      required: true,
      default: 0,
    },
    views: {
      // 조회수
      type: Number,
      required: true,
      default: 0,
    },
    inStock: {
      // 재고 (품절여부)
      type: Boolean,
      required: true,
      default: true,
    },
    updatedAt: {
      // 상품 등록일
      type: Date,
      required: true,
      default: () => Date.now() + 9 * 60 * 60 * 1000,
    },
  },
  { versionKey: false },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
