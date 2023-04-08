import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import cls from "./SuccessOrder.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SuccessOrder = () => {
  return (
    <>
      <Header />
      <div className={cls.successOrder}>
        <div className={cls.container}>
          <CheckCircleIcon className={cls.successIcon} />
          <h2>Your Order has been Placed successfully !</h2>
          <Link to="/orders">View Orders</Link>
        </div>
      </div>
    </>
  );
};

export default SuccessOrder;
