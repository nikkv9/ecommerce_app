import React from "react";
import cls from "./ConfirmOrder.module.css";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 100;

  const tax = subtotal * 0.05;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedPaymentHandler = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="confirm order" />
      <Header />
      <CheckoutSteps activeStepp={1} />
      <div className={cls.confirmOrder}>
        <div className={cls.left}>
          <div className={cls.confirmShippingArea}>
            <Typography>Shipping Info:</Typography>
            <div className={cls.confirmShippingAreaBox}>
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className={cls.confirmCartItems}>
            <Typography>Your Cart Items:</Typography>
            <div className={cls.confirmCartItemsContainer}>
              {cartItems &&
                cartItems.map((item) => (
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
        {/*  */}
        <div className={cls.right}>
          <div className={cls.orderSummary}>
            <Typography>Order Summery</Typography>
            <div className={cls.orderSummaryDetails}>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className={cls.orderSummaryTotal}>
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedPaymentHandler}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
