import Product from "../models/product-model.js";
import ApiFeatures from "../utils/api-features.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/error-handler.js";

// CREATE PRODUCT
export const createProduct = async (req, res, next) => {
  const { title, price, desc, category, stock, img } = req.body;
  try {
    const myCloud = await cloudinary.v2.uploader.upload(img, {
      folder: "products",
    });

    const product = await Product.create({
      userId: req.user._id,
      title,
      price,
      desc,
      category,
      stock,
      img: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    res.status(200).send({ product, myCloud });
  } catch (error) {
    return next(error);
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updateProduct) {
      return next(new ErrorHandler("product is not updated!", 400));
    }
    res.status(200).send(updatedProduct);
  } catch (error) {
    return next(error);
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res, next) => {
  try {
    // add delete image from cloudinary after delete code will be here

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return next(new ErrorHandler("product is not deleted!", 400));
    }
    res.status(200).send("product is deleted!");
  } catch (error) {
    return next(error);
  }
};

// GET A PRODUCT
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
};

//   // GET ALL PRODUCTS
export const getAllProducts = async (req, res, next) => {
  try {
    const productPerPage = 6;
    const totalProduct = await Product.countDocuments();
    const features = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
    // .pagination(productPerPage);

    let products = await features.query;
    let filteredProductsCount = products.length;

    features.pagination(productPerPage);

    // .clone() bcuz query was already executed!
    products = await features.query.clone();

    if (!products) {
      return next(new ErrorHandler("products are not found!", 404));
    }
    res
      .status(200)
      .json({ products, totalProduct, productPerPage, filteredProductsCount });
  } catch (error) {
    return next(error);
  }
};

// GET ALL PRODUCTS (ADMIN)
export const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      return next(new ErrorHandler("products are not found!", 404));
    }
    res.status(200).send(products);
  } catch (error) {
    return next(error);
  }
};

// CREATE AND UPDATE THE REVIEW
export const createAndUpdateReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      userId: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.userId.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.userId.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let sum = 0;

    product.reviews.forEach((rev) => {
      sum += rev.rating;
    });

    // ratings = average
    product.ratings = sum / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
};

// GET ALL REVIEWS
export const getAllReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).send(product.reviews);
  } catch (error) {
    return next(error);
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let sum = 0;

    reviews.forEach((rev) => {
      sum += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = sum / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
      }
    );

    res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
};
