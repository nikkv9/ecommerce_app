import React, { useEffect } from "react";
import cls from "./ProductList.module.css";
import classes from "./Admin.module.css";
import { useSelector, useDispatch } from "react-redux";
import Leftbar from "./Leftbar";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../redux/actions/order-action";

const OrderList = () => {
  const dispatch = useDispatch();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, deleted } = useSelector(
    (state) => state.deleteOrder
  );

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
      headerClassName: cls.gridColumnHeader,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      headerClassName: cls.gridColumnHeader,
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
      headerClassName: cls.gridColumnHeader,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      headerClassName: cls.gridColumnHeader,
    },

    {
      field: "actions",
      flex: 0.3,
      headerClassName: cls.gridColumnHeader,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div className={cls.action}>
              <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>

              <Button
                onClick={() =>
                  deleteOrderHandler(params.getValue(params.id, "id"))
                }
                style={{ color: "crimson" }}
              >
                <DeleteIcon />
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (deleted) {
      alert("Order Deleted Successfully");
      dispatch({ type: "DELETE_ORDER_RESET" });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, deleted]);
  return (
    <>
      <div className={classes.admin}>
        <Leftbar />
        <div className={classes.container}>
          <h1>ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className={cls.productListTable}
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default OrderList;
