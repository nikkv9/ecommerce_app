import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "USER",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please Enter product Name"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Please Enter product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter product Price"],
      maxLength: [8, "Price cannot exceed 8 characters"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    img: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter product Stock"],
      maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.ObjectId,
          ref: "USER",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const Product = mongoose.model("PRODUCT", productSchema);

export default Product;
