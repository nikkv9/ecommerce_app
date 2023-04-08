import React from "react";
import cls from "./ProductCard.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <div className={cls.details}>
      <img src={product.img.url} alt="" />
      <p>{product.title}</p>
      <div className={cls.rating}>
        <Rating
          precision={0.5}
          size="medium"
          value={product.ratings}
          readOnly={true}
          className={cls.ratingCompo}
        />
        <p>({product.numOfReviews} reviews)</p>
      </div>
      <p>{product.price} INR</p>
      <div className={cls.icons}>
        <Link to={`/product/${product._id}`}>
          <SearchIcon className={cls.icon} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
