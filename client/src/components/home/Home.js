import React, { useEffect } from "react";
import cls from "./Home.module.css";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import ProductCard from "../product/ProductCard";
import Slider from "../layout/Slider";
import { getProducts } from "../../redux/actions/product-action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { fetching, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert(error);
    }
    dispatch(getProducts());

    // if you are not using extra arrow function in action file of redux then you have to use
    // dispatch(getProducts)
  }, [error, dispatch]);
  return (
    <>
      {fetching ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Slider />

          <div className={cls.product} id="products-sec">
            <h1>ORDER YOUR FAVOURITE PRODUCTS</h1>
            <div className={cls.container}>
              {products.map((p) => {
                return <ProductCard key={p._id} product={p} />;
              })}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
