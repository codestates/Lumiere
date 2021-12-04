import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import Product from '../models/product.js';

// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find(
    {},
    {
      image: 1,
      title: 1,
      artist: 1,
      info: 1,
    },
  )
    .populate('artist', ['name', 'aka'])
    .exec();
  res.json(products);
});

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );
  res.json(updatedProduct);
});

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  // 조회수 올리기!!
  const productDetail = await Product.findById(req.params.id, {
    artCode: 1,
    title: 1,
    image: 1,
    info: 1,
    price: 1,
    inStock: 1,
  }).populate('artist', ['name']);

  if (!productDetail) {
    res.status(404).json({ message: '해당 상품이 존재하지 않습니다' });
  } else {
    const productsByArtist = await Product.find(
      {
        artist: productDetail.artist._id,
      },
      { image: 1 },
    ).limit(4);
    const productsByRandom = await Product.find({}, { image: 1 }).limit(8);

    if (req.query.userId) {
      // 로그인 유저라면 찜 유무도 알려주기
      let boolean;
      const exist = await Product.findOne({ likes: req.query.userId });

      exist ? (boolean = true) : (boolean = false);
      res.json({ productDetail, like: boolean });
    } else res.json({ productDetail });
  }
});

// @desc   Fetch latest products
// @route  GET /api/products/latest
// @access Public
const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}, { image: 1 })
    .limit(6)
    .sort({ updatedAt: 1 });

  if (products) res.json(products);
  else {
    res.status(404).json({ message: '상품이 존재하지 않습니다' });
  }
});

// @desc   Check stock
// @route  GET /api/products/stock
// @access Public
const getStock = asyncHandler(async (req, res) => {
  // query로 필요 상품 고유아이디가 배열로 들어와야 함.
  const { cartItemsId } = req.query;
  const order = await Product.find({ _id: { $in: cartItemsId } })
    .sort({
      $natural: -1,
    })
    .limit(1);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: '최근 주문 내역이 없습니다' });
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
// const createProductReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body

//   const product = await Product.findById(req.params.id)

//   if (product) {
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     )

//     if (alreadyReviewed) {
//       res.status(400)
//       throw new Error('Product already reviewed')
//     }

//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     }

//     product.reviews.push(review)

//     product.numReviews = product.reviews.length

//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length

//     await product.save()
//     res.status(201).json({ message: 'Review added' })
//   } else {
//     res.status(404)
//     throw new Error('Product not found')
//   }
// })

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
// const getTopProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({}).sort({ rating: -1 }).limit(3)

//   res.json(products)
// })

export {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
  getLatestProducts,
};
