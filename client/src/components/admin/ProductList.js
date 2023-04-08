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
  deleteProduct,
  getAdminProducts,
} from "../../redux/actions/product-action";

const ProductList = () => {
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, deleted } = useSelector(
    (state) => state.deleteProduct
  );

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 200,
      flex: 0.5,
      headerClassName: cls.gridColumnHeader,
    },

    {
      field: "title",
      headerName: "Product Name",
      minWidth: 350,
      flex: 1,
      headerClassName: cls.gridColumnHeader,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      headerClassName: cls.gridColumnHeader,
    },

    {
      field: "price",
      headerName: "Price",
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
              <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>

              <Button
                onClick={() =>
                  deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        title: item.title,
      });
    });

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert("Product Deleted Successfully");
      dispatch({ type: "DELETE_PRODUCT_RESET" });
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, deleteError, deleted]);
  return (
    <>
      <div className={classes.admin}>
        <Leftbar />
        <div className={classes.container}>
          <h1>ALL PRODUCTS</h1>

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

export default ProductList;
