/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import Artist from '../models/artist.js';
import Product from '../models/product.js';

// @desc   Create a Artist
// @route  POST /api/artists/
// @access Private/Admin
const createArtist = asyncHandler(async (req, res) => {
  // 작가 등록 시, 작품 하나 필수 등록
  const { artist, product } = req.body;
  const newArtist = await Artist.create(artist);
  if (newArtist) {
    await Product.create({
      ...product,
      artist: { id: newArtist._id },
    });
    res.status(201).json({
      code: newArtist.code,
      name: newArtist.name,
      aka: newArtist.aka,
      record: newArtist.record,
      joinAt: newArtist.joinAt,
      countOfWorks: newArtist.countOfWorks,
    });
  }
});

// @desc   Fetch all Artists
// @route  GET /api/artists/
// @access Public
const getArtists = asyncHandler(async (req, res) => {
  const artists = await Artist.find({}, { likes: 0 });
  res.json(artists);
});

// @desc    Update a Artist
// @route   PATCH /api/artists/:id
// @access  Private/Admin
const updateArtist = asyncHandler(async (req, res) => {
  const updatedArtist = await Artist.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );
  res.json({
    code: updatedArtist.code,
    name: updatedArtist.name,
    aka: updatedArtist.aka,
    record: updatedArtist.record,
    joinAt: updatedArtist.joinAt,
    countOfWorks: updatedArtist.countOfWorks,
  });
});

// @desc    activate or inactivate a Artist
// @route   PATCH /api/artists/
// @access  Private/Admin
const inActivateArtist = asyncHandler(async (req, res) => {
  const { artistId, isActive } = req.body;

  if (isActive === undefined) {
    res.status(400).json({ message: 'true? or false?' });
    return;
  }

  const updatedArtist = await Artist.findByIdAndUpdate(
    artistId,
    { isActive },
    {
      new: true,
    },
  );

  if (updatedArtist.isActive === true) {
    res.json({ message: '해당 작가 비활성화 해제' });
  } else if (updatedArtist.isActive === false) {
    res.json({ message: '해당 작가 비활성화 완료' });
  }
});

// @desc   Fetch single Artist
// @route  GET /api/artists/:id
// @access Public & private
const getArtistById = asyncHandler(async (req, res) => {
  const artistDetail = await Artist.findById(req.params.id, {
    code: 1,
    name: 1,
    aka: 1,
    record: 1,
    likes: 1,
  });

  if (!artistDetail) {
    res.status(404).json({ message: '해당 작가가 존재하지 않습니다' });
    return;
  }
  const products = await Product.find(
    { artist: req.params.id },
    { image: 1, inStock: 1 },
  ).sort({ updatedAt: -1 });

  res.json({ artistDetail, products });
});

// @desc   Zzim or unZzim the artist
// @route  PATCH /api/artists/zzim
// @access Private
const zzimArtist = asyncHandler(async (req, res) => {
  // 찜 해체 시에는 id가 배열로 올 수 있다. (선택삭제)
  const { artistId, zzim } = req.body;
  if (zzim === undefined) {
    res.status(404).json({ message: 'true? or false?' });
    return;
  }
  if (zzim === true) {
    await Artist.findByIdAndUpdate(
      artistId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true, upsert: true },
    ); // likes 배열에 유저 고유 아이디 넣기

    res.json({ message: '해당 작가 찜 완료' });
    return;
  }
  if (zzim === false) {
    await Artist.updateMany(
      { _id: { $in: artistId } },
      {
        $pull: { likes: req.user._id },
      },
      { multi: true },
    ); // likes 배열에 유저 고유 아이디 제거

    res.json({ message: '해당 작가 찜 해제' });
  }
});

// @desc   Fetch artists in zzimlist
// @route  GET /api/artists/zzim
// @access Private
const getZzimArtists = asyncHandler(async (req, res) => {
  const artists = await Artist.find(
    { likes: req.user._id },
    {
      name: 1,
      aka: 1,
      thumbnail: 1,
      countOfWorks: 1,
    },
  );
  res.json(artists);
});

export {
  createArtist,
  updateArtist,
  inActivateArtist,
  getArtists,
  getArtistById,
  zzimArtist,
  getZzimArtists,
};
