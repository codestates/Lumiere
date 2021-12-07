/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import Product from '../models/product.js';

// @desc    Create new order
// @route   POST /api/orders/
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems } = req.body;
  if (orderItems && !orderItems.length) {
    res.status(400).json({ message: '주문하실 상품을 추가해주세요' });
    return;
  }
  const itemsId = orderItems.map((item) => item.product);

  // 주문 생선 전, 해당 상품들 재고 파악
  const purchasable = await Product.find({
    _id: { $in: itemsId },
    inStock: true,
  });

  if (purchasable.length !== itemsId.length) {
    res
      .status(400)
      .json({ message: '주문하실 상품 중 품절된 상품이 존재합니다' });
    return;
  }
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
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
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
      deliver: 1,
      ordererInfo: 1,
    },
  )
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

// @desc    Update order status
// @route   GET /api/orders/:id
// @access  Private
const updateOrderStatus = asyncHandler(async (req, res) => {
  // 취소 및 반품
  // 주문 진행단계 변경
  const { status, inStock } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404).json({ message: '해당 주문내역이 존재하지 않습니다' });
    return;
  }

  // if (req.user.isAdmin === true) {
  //   switch (status) {
  //     case 3:
  //       alert('비교하려는 값보다 작습니다.');
  //       break;
  //     case 4:
  //       alert('비교하려는 값과 일치합니다.');
  //       break;
  //     case 5:
  //       alert('비교하려는 값보다 큽니다.');
  //       break;
  //     default:
  //       res.status(404).json({ message: '해당 주문내역이 존재하지 않습니다' });
  //   }
  // }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  createOrder,
  updateOrderStatus,
  getOrderById,
  getLatestOrder,
  getMyOrders,
  getOrders,
};
