/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import Product from '../models/product.js';

// @desc    Create new order
// @route   POST /api/orders/
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  // 결제 후 주문 생성 단계
  const { orderItems } = req.body;

  if (orderItems && !orderItems.length) {
    res.status(400).json({ message: '주문하실 상품을 추가해주세요' });
    return;
  }
  const itemsId = orderItems.map((item) => item.product);

  // 주문 생성 전, 상품 재고 0으로 수정
  await Product.updateMany(
    {
      _id: { $in: itemsId },
    },
    { inStock: false },
    { multi: true },
  );
  // 주문 생성
  const newOrder = await Order.create({ user: req.user._id, ...req.body });
  res.status(201).json(newOrder);
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

// @desc    Get latest order of user
// @route   GET /api/orders/latest
// @access  Private
const getLatestOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne(
    { user: req.user._id },
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
    res.status(404).json({ message: '최근 주문 내역이 없습니다' });
  }
});

// @desc    Cancel the order
// @route   patch /api/orders/
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  // 취소 및 반품

  const { orderId, status } = req.body;
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404).json({ message: '해당 주문내역이 존재하지 않습니다' });
    return;
  }

  let message;
  if (status === 4) message = '해당 주문의 반품 요청이 완료되었습니다';
  else if (status === 5) {
    message = '해당 주문의 결제 취소가 완료되었습니다';
    const itemsId = order.orderItems.map((item) => item.product);

    await Product.updateMany(
      {
        _id: { $in: itemsId },
      },
      { inStock: true },
      { multi: true },
    );
  } else {
    res.status(400).json({ message: '진행 단계를 알 수 없습니다' });
    return;
  }
  const updatedAt = () => Date.now() + 9 * 60 * 60 * 1000;

  await Order.updateOne(
    { _id: orderId },
    { 'result.status': status, 'result.updatedAt': updatedAt() },
  );
  res.status(200).json({ message });
});

// @desc    Update order status
// @route   patch /api/orders/:id
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  // 주문 진행단계 변경
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    console.log(order);
    res.status(404).json({ message: '해당 주문내역이 존재하지 않습니다' });
    return;
  }
  let message;
  if (status === 1) message = '해당 주문이 발송 준비 중 단계로 변경되었습니다';
  else if (status === 2) message = '해당 주문이 배송 중 단계로 변경되었습니다';
  else if (status === 3)
    message = '해당 주문이 배송 완료 단계로 변경되었습니다';
  else {
    res.status(400).json({ message: '진행 단계를 알 수 없습니다' });
    return;
  }

  const updatedAt = () => Date.now() + 9 * 60 * 60 * 1000;

  await Order.updateOne(
    { _id: req.params.id },
    { 'result.status': status, 'result.updatedAt': updatedAt() },
  );
  res.status(200).json({ message });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Order.countDocuments({ user: req.user._id });
  const orders = await Order.find(
    { user: req.user._id },
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

  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get all orders
// @route   GET /api/orders/
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

export {
  createOrder,
  cancelOrder,
  updateOrderStatus,
  getOrderById,
  getLatestOrder,
  getMyOrders,
  getOrders,
};
