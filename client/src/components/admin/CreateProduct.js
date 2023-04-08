import React, { useEffect, useState } from "react";
import cls from "./CreateProduct.module.css";
import classes from "./Admin.module.css";
import MetaData from "../layout/MetaData";
import Leftbar from "./Leftbar";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "../../redux/actions/product-action";
import { useNavigate } from "react-router-dom";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { fetching, error, success } = useSelector((state) => state.newProduct);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Speakers",
    "Clothing",
    "Camera",
    "Mobile",
  ];

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const createProductHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("price", price);
    myForm.set("desc", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("img", image);

    dispatch(createProduct(myForm));
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Product Created Successfully");
      navigate("/admin");
      dispatch({ type: "NEW_PRODUCT_RESET" });
    }
  }, [dispatch, error, navigate, success]);

  return (
    <>
      <MetaData title="add-product" />
      <div className={classes.admin}>
        <Leftbar />
        <div className={cls.container}>
          <h1>ADD NEW PRODUCT</h1>
          <form
            className={cls.form}
            encType="multipart/form-data"
            onSubmit={createProductHandler}
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
                rows="2"
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
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
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
                onChange={handleImage}
              />
            </div>

            <Button
              type="submit"
              disabled={fetching ? true : false}
              className={cls.btn}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
