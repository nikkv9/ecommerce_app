import React, { useEffect } from "react";
import Header from "../layout/Header";
import MetaData from "../layout/MetaData";
import cls from "./MyOrders.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getMyOrders } from "../../redux/actions/order-action";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import Loader from "../loader/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { fetching, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? cls.greenColor
          : cls.redColor;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.map((i) => i.quantity),
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getMyOrders());
  }, [dispatch, error]);
  return (
    <>
      <Header />
      <MetaData title={`${user.name} - Orders`} />
      {fetching ? (
        <Loader />
      ) : (
        <div className={cls.myOrders}>
          <Typography>{user.name}'s Orders</Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className={cls.dataGrid}
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default MyOrders;
