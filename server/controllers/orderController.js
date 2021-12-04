/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';

// @desc    Create new order
// @route   POST /api/orders/
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems } = req.body;
  if (orderItems && !orderItems.length) {
    res.status(400).json({ message: '주문하실 상품을 추가해주세요' });
  } else {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  }
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
  const order = await Order.findById({ user: req.user._id })
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

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
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
  addOrderItems,
  getOrderById,
  getLatestOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
