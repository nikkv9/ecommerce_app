import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cls from "./Admin.module.css";
import { Link } from "react-router-dom";
import { getAdminProducts } from "../../redux/actions/product-action";
import Leftbar from "./Leftbar";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getAllOrders } from "../../redux/actions/order-action";
import { getAllUsers } from "../../redux/actions/user-action";
Chart.register(...registerables);

const Admin = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
      <div className={cls.admin}>
        <MetaData title="Dashboard-Admin" />
        <Leftbar />
        <div className={cls.container}>
          <Typography component="h1">Dashboard</Typography>

          <div className={cls.summary}>
            <div className={cls.subSummary1}>
              <p>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className={cls.subSummary2}>
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className={cls.lineChart}>
            <Line data={lineState}></Line>
          </div>

          <div className={cls.doughnutChart}>
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
