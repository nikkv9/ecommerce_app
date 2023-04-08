import React from "react";
import Header from "../layout/Header";
import cls from "./Cart.module.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../redux/actions/cart-action";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const incQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    stock > quantity && dispatch(addItemsToCart(id, newQty));
  };

  const decQty = (id, quantity) => {
    const newQty = quantity - 1;
    quantity > 1 && dispatch(addItemsToCart(id, newQty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  return (
    <>
      <Header />

      {cartItems.length === 0 ? (
        <div className={cls.emptyCart}>
          <RemoveShoppingCartIcon sx={{ fontSize: "5rem", color: "red" }} />
          <h2>No Product in Cart !</h2>
        </div>
      ) : (
        <div className={cls.cart}>
          <div className={cls.header}>
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartItems.map((i) => {
            return (
              <div className={cls.container} key={i.pId}>
                <CartItemCard item={i} removeCartItem={removeFromCartHandler} />
                <div className={cls.cartInput}>
                  <button onClick={() => decQty(i.pId, i.quantity)}>-</button>
                  <input type="number" readOnly value={i.quantity} />
                  <button onClick={() => incQty(i.pId, i.quantity, i.stock)}>
                    +
                  </button>
                </div>
                <p className={cls.subtotal}>{`₹${i.price * i.quantity}`}</p>
              </div>
            );
          })}

          <div className={cls.grossTotal}>
            <div className={cls.grossTotalBox}>
              <p>Gross Total</p>
              <p>
                {cartItems.reduce(
                  (eachElem, item) => eachElem + item.quantity * item.price,
                  0
                )}
                &nbsp;<b>INR</b>
              </p>
            </div>
            <div className={cls.checkoutBtn}>
              <button onClick={() => navigate("/shipping")}>
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
