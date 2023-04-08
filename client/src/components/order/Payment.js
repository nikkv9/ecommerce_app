import { Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Header from "../layout/Header";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import cls from "./Payment.module.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearErrors, createOrder } from "../../redux/actions/order-action";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.createOrder);

  const navigate = useNavigate();

  const orderData = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/payment/process",
        { amount: Math.round(orderInfo.totalPrice * 100) },
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        console.log(result);
        payBtn.current.disabled = false;

        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          orderData.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(orderData));

          navigate("/payment/success");
        } else {
          alert("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert(error);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Payment" />
      <Header />
      <CheckoutSteps activeStepp={2} />

      <div className={cls.payment}>
        <form className={cls.form} onSubmit={paymentHandler}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className={cls.paymentInput} />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className={cls.paymentInput} />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className={cls.paymentInput} />
          </div>
          <div className={cls.paymentBtn}>
            <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Payment;
