import Order from "../models/order-model.js";
import Product from "../models/product-model.js";
import ErrorHandler from "../utils/error-handler.js";

// CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      userId: req.user._id,
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
    });
    res.status(200).send(order);
  } catch (error) {
    return next(error);
  }
};

// GET YOUR ALL ORDERS
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
      return next(new ErrorHandler("orders are not found!", 404));
    }
    res.status(200).send(orders);
  } catch (error) {
    return next(error);
  }
};

// GET SINGLE ORDER
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!order) {
      return next(new ErrorHandler("order is not found!", 404));
    }
    res.status(200).send(order);
  } catch (error) {
    return next(error);
  }
};

// GET ALL ORDERS (ADMIN)
export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return next(new ErrorHandler("orders are not found!", 404));
    }

    let totalAmt = 0;
    orders.forEach((order) => {
      totalAmt += order.totalPrice;
    });
    res.status(200).send({ orders, totalAmt });
  } catch (error) {
    return next(error);
  }
};

// UPDATE ORDER
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save();
}

export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("order is not found!", 404));
    }
    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delivered this order", 400)
      );
    }

    if (req.body.orderStatus === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.pId, o.quantity);
      });
    }
    order.orderStatus = req.body.orderStatus;

    if (req.body.orderStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save();

    res.status(200).send(order);
  } catch (error) {
    return next(error);
  }
};

// DELETE ORDER (ADMIN)
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return next(new ErrorHandler("order is not found!", 404));
    }
    res.status(200).send("order is deleted!");
  } catch (error) {
    return next(error);
  }
};
