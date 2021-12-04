/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Product from '../models/product.js';

// @desc   Create a product
// @route  POST /api/products/
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @desc   Fetch all products
// @route  GET /api/products/
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find(
    {},
    {
      image: 1,
      title: 1,
      artist: 1,
      info: 1,
      price: 1,
      count: 1,
    },
  )
    .populate('artist', ['name', 'aka', 'code'])
    .exec();
  res.json(products);
});

// @desc   Fetch filtered products
// @route  GET /api/products/filter
// @access Public
// const getProductsByFilter = asyncHandler(async (req, res) => {
//   const products = await Product.find(req.params, {
//     image: 1,
//     title: 1,
//     artist: 1,
//     info: 1,
//     price: 1,
//     count: 1,
//   })
//     .populate('artist', ['name', 'aka', 'code'])
//     .exec();
//   res.json(products);
// });

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
  const productDetail = await Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { count: 1 } }, // 조회수 올리기!!
    {
      projection: {
        user: 0,
        likes: 0,
        count: 0,
        updatedAt: 0,
      },
      new: true,
    },
  ).populate('artist', ['name', 'code', 'aka', 'record']);
  // console.log(productDetail);

  const productsByArtist = await Product.aggregate([
    { $match: { artist: productDetail.artist._id } },
    { $sample: { size: 4 } },
    { $project: { image: 1 } },
  ]);
  // console.log(productsByArtist);
  const productsByRandom = await Product.aggregate([
    { $match: { artist: { $ne: productDetail.artist._id } } },
    { $sample: { size: 8 } },
    { $project: { image: 1 } },
  ]);
  // console.log(productsByRandom);
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    // 로그인 유저 찜 유무
    try {
      // eslint-disable-next-line prefer-destructuring
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
    let boolean;
    const exist = await Product.findOne({ likes: req.user._id });
    // eslint-disable-next-line no-unused-expressions
    exist ? (boolean = true) : (boolean = false);
    res.json({
      productDetail,
      productsByArtist,
      productsByRandom,
      like: boolean,
    });
  } else res.json({ productDetail, productsByArtist, productsByRandom });
});

// @desc   Fetch latest products
// @route  GET /api/products/latest
// @access Public
const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}, { image: 1 })
    .limit(6)
    .sort({ updatedAt: -1 });

  if (products) res.json(products);
  else {
    res.status(404).json({ message: '상품이 존재하지 않습니다' });
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
