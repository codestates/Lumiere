/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import axios from 'axios';
import Order from '../models/order.js';
import Product from '../models/product.js';
import localTime from '../utils/localTime.js';

const { ObjectId } = mongoose.Types;

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  // 결제 전 주문 생성

  const { orderItems } = req.body;

  if (orderItems && !orderItems.length) {
    res.status(400).json({ message: '주문할 상품 목록이 없습니다' });
    return;
  }
  // 주문 생성
  req.body.totalPrice *= 1000;
  // console.log('진짜', req.body.totalPrice);
  // console.log(req.body);
  const newOrder = await Order.create({ user: req.user.id, ...req.body });
  // 상품 재고 0으로 수정
  const itemsId = orderItems.map((item) => item.product);
  await Product.updateMany(
    {
      _id: { $in: itemsId },
    },
    { inStock: false },
    { multi: true },
  );
  res.status(201).json({ message: '주문서 생성 성공', orderId: newOrder._id });
});

// @desc    Update the order to paid after IMPORT
// @route   PATCH /api/orders/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // 아임포트 결제 후 imp_uid 추가하기

  const { imp_uid } = req.body;

  // 아임포트 토큰 발급
  const getToken = await axios({
    url: 'https://api.iamport.kr/users/getToken',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      imp_key: process.env.IMPORT_KEY,
      imp_secret: process.env.IMPORT_SECRET,
    },
  });
  const { access_token } = getToken.data.response;

  // imp_uid로 아임포트 서버에서 결제 정보 조회
  const getPaymentData = await axios({
    url: `https://api.iamport.kr/payments/${imp_uid}`,
    method: 'get',
    headers: { Authorization: access_token },
  });
  const paymentData = getPaymentData.data.response;
  const { amount, status, merchant_uid } = paymentData;

  const order = await Order.findById(merchant_uid);
  const amountToBePaid = order.totalPrice / 1000;

  if (amount === amountToBePaid && status === 'paid') {
    // 주문서에 imp_uid, 진행단계, 결제시간, 업데이트시간 고치기
    await Order.updateOne(
      { _id: merchant_uid },
      {
        'result.imp_uid': imp_uid,
        'result.status': 0,
        'result.paidAt': localTime(),
        'result.updatedAt': localTime(),
      },
      { upsert: true },
    );
    res.json({ message: '결제 정보 저장 완료' });
  } else {
    // 결제된 금액이 결제 예정 금액과 다를 시, 취소 요청
    /* 아임포트 REST API로 결제환불 요청 */
    const getCancelData = await axios({
      url: 'https://api.iamport.kr/payments/cancel',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: access_token,
      },
      data: {
        imp_uid,
        merchant_uid,
        checksum: amount,
      },
    });
    // console.log('결제 취소 답변', getCancelData.data);
    if (getCancelData.data.code === 0) {
      // 상품 품절 원위치 및 주문 삭제
      const itemsId = order.orderItems.map((item) => item.product);
      await Product.updateMany(
        {
          _id: { $in: itemsId },
        },
        { inStock: true },
        { multi: true },
      );
      await Order.updateOne(
        { _id: merchant_uid },
        {
          'result.imp_uid': imp_uid,
          'result.status': 5,
          'result.paidAt': localTime(),
          'result.updatedAt': localTime(),
        },
      );
      res.status(400).json({
        message: '금액 불일치, 위조된 결제시도로 주문을 취소했습니다',
      });
    } else {
      res.status(400).json({
        message: `금액 불일치, 결제취소 실패 사유: ${getCancelData.data.message}`,
      });
    }
  }
});

// @desc    Cancel the order
// @route   DELETE /api/orders/:id
// @access  Private & Private/Admin
const cancelOrder = asyncHandler(async (req, res) => {
  // 주문 취소
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404).json({ message: '해당 주문내역이 존재하지 않습니다' });
    return;
  }
  const itemsId = order.orderItems.map((item) => item.product);
  const { result } = order;
  // 아임포트 결제 중 오류 시, 임시 주문서 삭제
  if (!result.imp_uid && result.status === -1) {
    await Product.updateMany(
      {
        _id: { $in: itemsId },
      },
      { inStock: true },
      { multi: true },
    );
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: '결제 오류로 임시 주문서를 삭제했습니다' });
    return;
  }
  if (result.status === 5) {
    res.status(400).json({ message: '이미 환불된 주문입니다.' });
    return;
  }
  if (result.status === 0 || result.status === 4) {
    // 결제완료, 반품 단계에서만 취소 가능 나머지 단계는 반품

    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        imp_key: process.env.IMPORT_KEY,
        imp_secret: process.env.IMPORT_SECRET,
      },
    });
    const { access_token } = getToken.data.response;

    /* 아임포트 REST API로 결제환불 요청 */
    const getCancelData = await axios({
      url: 'https://api.iamport.kr/payments/cancel',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: access_token,
      },
      data: {
        imp_uid: order.result.imp_uid,
        merchant_uid: order._id,
        checksum: order.totalPrice,
      },
    });
    // console.log('결제 취소 답변', getCancelData.data);

    if (getCancelData.data.code === 0) {
      await Product.updateMany(
        {
          _id: { $in: itemsId },
        },
        { inStock: true },
        { multi: true },
      );
      await Order.updateOne(
        { _id: req.params.id },
        { 'result.status': 5, 'result.updatedAt': localTime() },
      );
      res
        .status(200)
        .json({ message: '해당 주문의 결제 취소가 완료되었습니다' });
    } else {
      res
        .status(400)
        .json({ message: `결제취소 실패 사유: ${getCancelData.data.message}` });
    }
  } else {
    res.status(400).json({
      message: '현재 단계에서는 취소가 불가합니다. 반품으로 신청해주세요',
    });
  }
});

// @desc    Update order status
// @route   PATCH /api/orders/:id
// @access  Private & Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  // 주문 진행단계 변경
  const { status, isAdmin } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404).json({ message: '해당 주문내역이 존재하지 않습니다' });
    return;
  }

  const { result } = order;
  if (
    isAdmin === false &&
    status === 4 &&
    (result.status === 1 || result.status === 2 || result.status === 3)
  ) {
    await Order.updateOne(
      { _id: req.params.id },
      { 'result.status': status, 'result.updatedAt': localTime() },
    );
    res
      .status(200)
      .json({ message: '해당 주문의 반품 요청 단계로 변경되었습니다' });
    return;
  }

  let message;
  if (status === 1 && result.status === 0)
    message = '해당 주문이 발송 준비 중 단계로 변경되었습니다';
  else if (status === 2 && result.status === 1)
    message = '해당 주문이 배송 중 단계로 변경되었습니다';
  else if (status === 3 && result.status === 2)
    message = '해당 주문이 배송 완료 단계로 변경되었습니다';
  else if (
    status === 4 &&
    (result.status === 1 || result.status === 2 || result.status === 3)
  )
    message = '해당 주문의 반품 요청 단계로 변경되었습니다';
  else {
    res.status(400).json({ message: '변경실패, 진행 단계가 알맞지 않습니다' });
    return;
  }

  await Order.updateOne(
    { _id: req.params.id },
    { 'result.status': status, 'result.updatedAt': localTime() },
  );
  res.status(200).json({ message });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Order.countDocuments({});
  const orders = await Order.find(
    {},
    {
      deliveryInfo: 0,
      deliveryDetails: 0,
      ordererInfo: 0,
      shippingPrice: 0,
    },
  )
    .populate('user', [
      'general.email',
      'google.email',
      'naver.email',
      'kakao.email',
      'name',
    ])
    .sort({ _id: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .exec();
  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private & Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
  // 주문 상세 정보
  const order = await Order.findById(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: '해당 주문 내역이 없습니다' });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Order.countDocuments({ user: req.user.id });
  const orders = await Order.find(
    { user: req.user.id },
    {
      deliveryInfo: 0,
      deliveryDetails: 0,
      ordererInfo: 0,
      shippingPrice: 0,
    },
  )
    .sort({ _id: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .exec();

  const status = await Order.aggregate([
    { $match: { user: new ObjectId(req.user.id) } },
    {
      $facet: {
        paid: [{ $match: { 'result.status': 0 } }, { $count: 'paid' }],
        ready: [{ $match: { 'result.status': 1 } }, { $count: 'ready' }],
        coming: [{ $match: { 'result.status': 2 } }, { $count: 'coming' }],
        done: [{ $match: { 'result.status': 3 } }, { $count: 'done' }],
      },
    },
    {
      $project: {
        paid: { $arrayElemAt: ['$paid.paid', 0] },
        ready: { $arrayElemAt: ['$ready.ready', 0] },
        coming: { $arrayElemAt: ['$coming.coming', 0] },
        done: { $arrayElemAt: ['$done.done', 0] },
      },
    },
  ]);

  res.json({
    orders,
    status: status[0],
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Get latest order of user
// @route   GET /api/orders/latest
// @access  Private
const getLatestOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne(
    { user: req.user.id },
    {
      deliveryInfo: 1,
      deliveryDetails: 1,
      ordererInfo: 1,
    },
  )
    .sort({ $natural: -1 })
    .limit(1);

  if (order) {
    res.json(order);
  } else {
    res.json({});
  }
});

export {
  createOrder,
  updateOrderToPaid,
  cancelOrder,
  updateOrderStatus,
  getOrderById,
  getLatestOrder,
  getMyOrders,
  getOrders,
};
