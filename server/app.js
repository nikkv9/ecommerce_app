import express from "express";
import "dotenv/config";

// app config
const app = express();
const port = process.env.PORT || 5000;

// database connection
import connectDB from "./config/db.js";
connectDB();

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import cloudinary from "cloudinary";

import userRoute from "./routes/user-route.js";
import productRoute from "./routes/product-route.js";
import orderRoute from "./routes/order-route.js";
import paymentRoute from "./routes/payment-route.js";
import errorMdlwr from "./middlewares/error-mdlwr.js";

// middlewares
app.use(express.json()); //it takes json file for testing api routes
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(userRoute);
app.use(productRoute);
app.use(orderRoute);
app.use(paymentRoute);

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// listen
app.listen(port, (req, res) => {
  console.log(`server is running at ${port}`);
});

// error handling middleware
app.use(errorMdlwr);
