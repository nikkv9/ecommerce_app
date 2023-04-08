import React, { useEffect, useState } from "react";
import cls from "../order/ConfirmOrder.module.css";
import classes from "./Admin.module.css";
import clss from "../order/OrderDetails.module.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Leftbar from "./Leftbar";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../redux/actions/order-action";
import Loader from "../loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const { order, error, fetching } = useSelector((state) => state.orderDetails);
  const { error: updateError, updated } = useSelector(
    (state) => state.updateOrder
  );

  const params = useParams();

  const [status, setStatus] = useState("");

  const updateOrderStatus = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("orderStatus", status);

    dispatch(updateOrder(params.id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (updated) {
      alert("Order Updated Successfully");
      dispatch({ type: "UPDATE_ORDER_RESET" });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id, updated, updateError]);

  return (
    <>
      <MetaData title="process order" />
      <div className={classes.admin}>
        <Leftbar />
        {fetching ? (
          <Loader />
        ) : (
          <div className={classes.container}>
            <h1>ORDER PROCESS</h1>
            <div className={cls.confirmOrder}>
              <div className={cls.left}>
                <div className={cls.confirmShippingArea}>
                  <Typography>Shipping Info</Typography>
                  <div className={clss.shipping}>
                    <div>
                      <p>Name:</p>
                      <p>{order && order.user && order.user.name}</p>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <p>
                        {order &&
                          order.shippingInfo &&
                          order.shippingInfo.phoneNo}
                      </p>
                    </div>
                    <div>
                      <p>Address:</p>
                      <p>
                        {order &&
                          order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </p>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className={clss.payment}>
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? clss.greenColor
                            : clss.redColor
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
                  <div className={clss.order}>
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? clss.greenColor
                            : clss.redColor
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={cls.confirmCartItems}>
                  <Typography>Your Cart Items:</Typography>
                  <div className={cls.confirmCartItemsContainer}>
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.id}>
                          <img src={item.img} alt="Product" />
                          <Link to={`/product/${item.id}`}>
                            {item.title}
                          </Link>{" "}
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
                <div
                  className={cls.orderSummary}
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <Typography>Process Order</Typography>
                  <form className={clss.form} onSubmit={updateOrderStatus}>
                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option>Order Status</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        fetching ? true : false || status === "" ? true : false
                      }
                      className={clss.btn}
                    >
                      Update
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProcessOrder;
