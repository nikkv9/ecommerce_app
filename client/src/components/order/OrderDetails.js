import React, { useEffect } from "react";
import { clearErrors, getOrderDetails } from "../../redux/actions/order-action";
import cls from "./OrderDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader";
import Metadata from "../layout/MetaData";
import Header from "../layout/Header";
import { Typography } from "@mui/material";

const OrderDetails = () => {
  const { order, error, fetching } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id]);
  return (
    <>
      {fetching ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Order-Details" />
          <Header />
          <div className={cls.orderDetails}>
            <div className={cls.container}>
              <h1>Order #{order && order._id}</h1>
              <Typography>Shipping Info</Typography>
              <div className={cls.shipping}>
                <div>
                  <p>Name:</p>
                  <p>{order.user && order.user.name}</p>
                </div>
                <div>
                  <p>Phone:</p>
                  <p>{order.shippingInfo && order.shippingInfo.phoneNo}</p>
                </div>
                <div>
                  <p>Address:</p>
                  <p>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </p>
                </div>
              </div>

              <Typography>Payment</Typography>
              <div className={cls.payment}>
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? cls.greenColor
                        : cls.redColor
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <p>{order.totalPrice && order.totalPrice}</p>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className={cls.order}>
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? cls.greenColor
                        : cls.redColor
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>

              <Typography>Order Items:</Typography>
              <div className={cls.orderItem}>
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.pId}>
                      <img src={item.img} alt="Product" />
                      <Link to={`/product/${item.pId}`}>{item.title}</Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
