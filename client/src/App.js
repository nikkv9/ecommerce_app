import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import Home from "./components/home/Home";
import LoginSignup from "./components/user/LoginSignup";
import Products from "./components/product/Products";
import Product from "./components/product/Product";
import { persistUser } from "./redux/actions/user-action";
import UpdatePass from "./components/user/UpdatePass";
import ForgotPass from "./components/user/ForgotPass";
import ResetPass from "./components/user/ResetPass";
import Cart from "./components/cart/Cart";
import Shipping from "./components/order/Shipping";
import ConfirmOrder from "./components/order/ConfirmOrder";
import axios from "axios";
import Payment from "./components/order/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SuccessOrder from "./components/order/SuccessOrder";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import Admin from "./components/admin/Admin";
import ProductList from "./components/admin/ProductList";
import UpdateProduct from "./components/admin/UpdateProduct";
import CreateProduct from "./components/admin/CreateProduct";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import NotFound from "./components/layout/NotFound";
import AuthRoute from "./components/route/AuthRoute";

const App = () => {
  const { authenticated, user, fetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [stripePK, setStripePK] = useState("");

  const getStripePKHandler = async () => {
    const { data } = await axios.get("/stripe-pk");
    setStripePK(data.stripePK);
  };

  useEffect(() => {
    dispatch(persistUser());
    getStripePKHandler();
  }, []);

  // hiding for inspect element in browser
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <div className="app">
      <Routes>
        {/* !authenticated route  */}
        {<Route path="/" element={<Home />} />}
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/password/forgot" element={<ForgotPass />} />
        <Route path="/reset-pass/:token" element={<ResetPass />} />

        {/* authenticated route  */}

        {fetching === false && (
          <Route element={<AuthRoute isAuth={authenticated} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePass />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/payment/success" element={<SuccessOrder />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            {stripePK && (
              <Route
                exact
                path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripePK)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
          </Route>
        )}

        {/* admin authenticated route  */}
        {fetching === false && (
          <Route
            element={
              <AuthRoute
                isAuth={authenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/create-product" element={<CreateProduct />} />
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/user/:id" element={<UpdateUser />} />
            <Route path="/admin/reviews" element={<ProductReviews />} />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
