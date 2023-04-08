import React from "react";
import { Link } from "react-router-dom";
import cls from "./CartItemCard.module.css";

const CartItemCard = ({ item, removeCartItem }) => {
  return (
    <div className={cls.cartItemCard}>
      <img src={item.img} alt="" />
      <div>
        <Link to={`/product/${item.id}`}>{item.title}</Link>
        <h3>{item.price} INR</h3>
        <p onClick={() => removeCartItem(item.pId)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
