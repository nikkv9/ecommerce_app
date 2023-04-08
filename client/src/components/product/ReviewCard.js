import { Avatar, Rating } from "@mui/material";
import React from "react";
import cls from "./ReviewCard.module.css";

const ReviewCard = ({ review }) => {
  return (
    <div className={cls.reviewCard}>
      <Avatar src="" />
      <p>{review.name}</p>
      <Rating
        precision={0.5}
        size="large"
        value={review.rating}
        readOnly={true}
      />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
