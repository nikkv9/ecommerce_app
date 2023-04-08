import React, { useEffect, useState } from "react";
import cls from "./CreateProduct.module.css";
import classes from "./Admin.module.css";
import MetaData from "../layout/MetaData";
import Leftbar from "./Leftbar";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProduct,
  updateProduct,
} from "../../redux/actions/product-action";
import { useNavigate, useParams } from "react-router-dom";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { error, product } = useSelector((state) => state.product);

  const {
    fetching,
    error: updateError,
    updated,
  } = useSelector((state) => state.updateProduct);

  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState();

  const categories = [
    "Laptop",
    "Footwear",
    "Speakers",
    "Clothing",
    "Camera",
    "Mobile",
  ];

  const imageOnChange = (e) => {
    const reader = new FileReader();
    console.log(reader);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    };
  };

  const updateProductHandler = (e) => {
    e.preventDefault();
    console.log(e.target);

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("price", price);
    myForm.set("desc", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("img", image);

    dispatch(updateProduct(myForm));
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

    if (product && product._id !== params.id) {
      dispatch(getProduct(params.id));
    } else {
      setTitle(product.title);
      setDescription(product.desc);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setImage(product.image);
    }

    if (updated) {
      alert("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: "UPDATE_PRODUCT_RESET" });
    }
  }, [dispatch, error, navigate, updated, params.id, product, updateError]);

  return (
    <>
      <MetaData title="add-product" />
      <div className={classes.admin}>
        <Leftbar />
        <div className={cls.container}>
          <h1>EDIT PRODUCT DETAILS</h1>
          <form
            className={cls.form}
            encType="multipart/form-data"
            onSubmit={updateProductHandler}
          >
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Choose Category</option>
                {categories.map((catg) => (
                  <option key={catg} value={catg}>
                    {catg}
                  </option>
                ))}
              </select>
            </div>

            <div className={cls.imgDiv}>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={imageOnChange}
              />
            </div>

            <Button
              type="submit"
              disabled={fetching ? true : false}
              className={cls.btn}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
