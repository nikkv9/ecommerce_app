import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItemsToCart } from "../../redux/actions/cart-action";
import { createReview, getProduct } from "../../redux/actions/product-action";
import { clearErrors } from "../../redux/actions/product-action";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import cls from "./Product.module.css";
import ReviewCard from "./ReviewCard";

const Product = () => {
  // useParams() is used for get the params value after slash(/) in url
  const params = useParams();
  // console.log(params);

  const dispatch = useDispatch();
  const { product, fetching, error } = useSelector((state) => state.product);
  // console.log(product);
  const { success, error: reviewError } = useSelector(
    (state) => state.createReview
  );

  // product quantity
  const [quantity, setQuantity] = useState(1);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const quantityHandler = (type) => {
    if (type === "inc") {
      product.stock > quantity && setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    alert("item added to cart!");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const createReviewHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(createReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(params.id));

    if (reviewError) {
      alert(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert("Review Submitted Successfully");
      dispatch({ type: "CREATE_REVIEW_RESET" });
    }
  }, [dispatch, params.id, error, reviewError, success]);
  return (
    <>
      <Header />
      <div className={cls.product}>
        <h2>PRODUCT DETAILS</h2>
        <div className={cls.container}>
          <div className={cls.left}>
            <img src={product.img} alt="" />
          </div>

          <div className={cls.right}>
            <h1>{product.title}</h1>
            <p className={cls.price}>
              <b>{product.price}</b> INR
            </p>
            <div className={cls.add}>
              <button
                className={cls.decBtn}
                onClick={() => quantityHandler("dec")}
              >
                -
              </button>
              <input type="number" value={quantity} readOnly />
              <button
                className={cls.incBtn}
                onClick={() => quantityHandler("inc")}
              >
                +
              </button>
              <button
                className={cls.cartBtn}
                onClick={addToCartHandler}
                disabled={product.stock < 1 ? true : false}
              >
                ADD TO CART
              </button>
            </div>

            <p className={cls.stock}>
              Status:
              <b className={product.stock < 1 ? cls.redColor : cls.greenColor}>
                {product.stock < 1 ? "Out Of Stock" : "In Stock"}
              </b>
            </p>

            <div className={cls.desc}>
              Description : <p>{product.desc}</p>
            </div>

            <button className={cls.submitBtn} onClick={submitReviewToggle}>
              Submit Review
            </button>
          </div>
        </div>
      </div>

      <div className={cls.reviewContainer}>
        <h2>REVIEWS OF PRODUCT</h2>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle style={{ textAlign: "center" }}>
            Submit Review
          </DialogTitle>
          <DialogContent className={cls.dialogContent}>
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
            />

            <textarea
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={createReviewHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {product.reviews && product?.reviews[0] ? (
          <div className={cls.reviews}>
            {product.reviews?.map((r) => {
              console.log(r);
              return <ReviewCard key={r._id} review={r} />;
            })}
          </div>
        ) : (
          <p className={cls.noReviews}>No Reviews Yet</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Product;
