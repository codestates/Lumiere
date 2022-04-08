/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Product from '../models/product.js';
import Artist from '../models/artist.js';
import isAuthorized from '../utils/isAuthorized.js';

const { ObjectId } = mongoose.Types;

// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    artist,
    artCode,
    title,
    image,
    theme,
    price,
    info: { details, size, canvas, createdAt },
  } = req.body;

  if (
    artist &&
    artCode &&
    title &&
    theme &&
    price &&
    image &&
    details &&
    size &&
    canvas &&
    createdAt
  ) {
    await Artist.updateOne({ _id: artist }, { $inc: { countOfWorks: 1 } });
    const product = await Product.create({
      artist,
      artCode,
      title,
      image,
      theme,
      price,
      info: { details, size, canvas, createdAt },
    });
    res.status(201).json(product);
  } else {
    res.status(400).json({ message: '상품 정보를 모두 입력해주세요' });
  }
});

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  // 관리자 권한일 때와 분기 나눠 주기
  const { pageNumber, isAdmin } = req.query;
  const page = Number(pageNumber) || 1;

  let pageSize;
  let count;
  let products;

  if (isAdmin === 'true') {
    req.user = isAuthorized(req);
    if (req.user) {
      // 토큰이 유효할 경우
      if (req.user.isAdmin === true) {
        // 관리자인 경우
        pageSize = 10;
        count = await Product.countDocuments({});
        products = await Product.find({})
          .populate('artist', ['name', 'aka', 'code', 'record'])
          .sort({ _id: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec();

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
        return;
      }
    }
  }

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            title: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            'info.details': {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            'artist.name': {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            'artist.aka': {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
        ],
      }
    : {};

  const { theme, sizeMin, sizeMax, priceMin, priceMax } = req.query;

  let filter = '';

  if (theme) {
    filter = { theme };
  } else if (sizeMin && sizeMax) {
    filter = {
      'info.canvas': { $gte: Number(sizeMin), $lte: Number(sizeMax) },
    };
  } else if (priceMin && priceMax) {
    filter = { price: { $gte: Number(priceMin), $lte: Number(priceMax) } };
  } else if (priceMin) {
    filter = { price: { $gte: Number(priceMin) } };
  }

  pageSize = 28;

  products = await Product.aggregate([
    { $match: { inStock: true } },
    {
      $lookup: {
        from: 'artists',
        localField: 'artist',
        foreignField: '_id',
        as: 'artist',
      },
    },
    { $unwind: '$artist' },
    { $match: { ...keyword } },
    { $match: { ...filter } },
    {
      $project: {
        artCode: 0,
        theme: 0,
        inStock: 0,
        'info.details': 0,
        'info.createdAt': 0,
        'artist.code': 0,
        'artist.record': 0,
        'artist.thumbnail': 0,
        'artist.likes': 0,
        'artist.countOfWorks': 0,
        'artist.isActive': 0,
        'artist.joinAt': 0,
      },
    },
    { $sort: { _id: -1 } },
    { $skip: pageSize * (page - 1) },
    { $limit: pageSize },
  ]);

  if (!products.length) {
    res.json({
      products,
      page,
      pages: 1,
    });
    return;
  }

  count = await Product.aggregate([
    { $match: { inStock: true } },
    {
      $lookup: {
        from: 'artists',
        localField: 'artist',
        foreignField: '_id',
        as: 'artist',
      },
    },
    { $match: { ...keyword } },
    { $match: { ...filter } },
    { $count: 'of_products' },
  ]);

  res.json({
    products,
    page,
    pages: Math.ceil(count[0].of_products / pageSize),
  });
});

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  // 재고 있을 시 상품 삭제 가능

  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    inStock: true,
  });

  if (product) {
    res.json({ message: `해당 상품이 삭제되었습니다` });
  } else {
    res.status(400).json({ message: '해당 상품은 삭제할 수 없습니다' });
  }
});

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const productDetail = await Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } }, // 조회수 올리기!!
    {
      projection: {
        views: 0,
        updatedAt: 0,
      },
      new: true,
    },
  ).populate('artist', ['name', 'code', 'aka', 'record']);

  if (!productDetail) {
    res.status(404).json({ message: '해당 상품이 존재하지 않습니다' });
    return;
  }

  const productsByArtist = await Product.aggregate([
    { $match: { artist: productDetail.artist._id } },
    { $sample: { size: 4 } },
    { $project: { image: 1 } },
  ]);

  const productsByRandom = await Product.aggregate([
    { $match: { artist: { $ne: productDetail.artist._id } } },
    { $sample: { size: 8 } },
    { $project: { image: 1 } },
  ]);

  res.json({ productDetail, productsByArtist, productsByRandom });
});

// @desc   Fetch latest products
// @route  GET /api/products/latest
// @access Public
const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}, { image: 1 })
    .limit(5)
    .sort({ _id: -1 });

  if (products) res.json(products);
  else res.status(404).json({ message: '상품이 존재하지 않습니다' });
});

// @desc   Check stock of cartItems
// @route  GET /api/products/cart-items
// @access Public
const getCartItems = asyncHandler(async (req, res) => {
  // 장바구니 상품 재고 확인 차 요청
  const { productId } = req.query;

  const products = await Product.find(
    { _id: { $in: productId } },
    {
      title: 1,
      image: 1,
      'info.size': 1,
      'info.canvas': 1,
      price: 1,
      inStock: 1,
    },
  ).populate('artist', ['name']);

  res.json(products);
});

// @desc   Fetch cartItems totalprice
// @route  GET /api/products/total-price
// @access Private
const getTotalPrice = asyncHandler(async (req, res) => {
  // 결제로 넘어갈 시 총 상품 금액
  let { productId } = req.query;

  if (!Array.isArray(productId)) productId = [new ObjectId(productId)];
  else productId = productId.map((id) => new ObjectId(id));

  const totalPrice = await Product.aggregate([
    {
      $match: { _id: { $in: productId } },
    },
    {
      $group: {
        _id: '결제 예정 총 금액',
        totalPrice: { $sum: '$price' },
      },
    },
  ]);
  totalPrice[0].totalPrice = (totalPrice[0].totalPrice + 10000) / 1000;
  res.json(totalPrice[0]);
});

// @desc   Zzim or unZzim the product
// @route  PATCH /api/products/zzim
// @access Private
const zzimProduct = asyncHandler(async (req, res) => {
  // 찜 해체 시에는 id가 배열로 올 수 있다. (선택삭제)
  const { productId, zzim } = req.body;

  if (zzim === undefined) {
    res.status(404).json({ message: 'true? or false?' });
    return;
  }

  if (zzim === true) {
    await Product.updateOne(
      { _id: productId },
      {
        $addToSet: { likes: req.user.id },
      },
      { upsert: true },
    ); // likes 배열에 유저 고유 아이디 넣기
    res.json({ message: '해당 상품 찜 완료' });
    return;
  }
  if (zzim === false) {
    await Product.updateMany(
      { _id: { $in: productId } },
      {
        $pull: { likes: req.user.id },
      },
      { multi: true },
    );
    res.json({ message: '해당 상품 찜 해제' });
  }
});

// @desc   Fetch products in zzimlist
// @route  GET /api/products/zzim
// @access Private
const getZzimProducts = asyncHandler(async (req, res) => {
  const products = await Product.find(
    { likes: req.user.id },
    {
      title: 1,
      image: 1,
      'info.size': 1,
      'info.canvas': 1,
      price: 1,
      inStock: 1,
    },
  )
    .populate('artist', ['name'])
    .exec();

  res.json(products);
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getLatestProducts,
  zzimProduct,
  getZzimProducts,
  getCartItems,
  getTotalPrice,
};
