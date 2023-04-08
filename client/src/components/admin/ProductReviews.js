import React, { useEffect, useState } from "react";
import cls from "./ProductReviews.module.css";
import classes from "./Admin.module.css";
import { useSelector, useDispatch } from "react-redux";
import Leftbar from "./Leftbar";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../redux/actions/product-action";
import Star from "@mui/icons-material/Star";

const ProductReviews = () => {
  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.productReviews);

  const { error: deleteError, deleted } = useSelector(
    (state) => state.deleteReview
  );

  const [productId, setProductId] = useState("");

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 200,
      flex: 0.5,
      headerClassName: cls.gridColumnHeader,
    },

    {
      field: "user",
      headerName: "User Name",
      minWidth: 100,
      flex: 0.5,
      headerClassName: cls.gridColumnHeader,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 200,
      flex: 1,
      headerClassName: cls.gridColumnHeader,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      headerClassName: cls.gridColumnHeader,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? cls.greenColor
          : cls.redColor;
      },
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
              <Button
                onClick={() =>
                  deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  const deleteReviewHandler = (rId) => {
    dispatch(deleteReviews(rId, productId));
  };

  const searchReviewHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (deleted) {
      dispatch({ type: "DELETE_REVIEW_RESET" });
    }
  }, [dispatch, error, deleteError, deleted, productId]);
  return (
    <>
      <div className={classes.admin}>
        <Leftbar />
        <div className={classes.container}>
          <h1>SEARCH REVIEWS</h1>
          <form className={cls.form} onSubmit={searchReviewHandler}>
            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className={cls.dataGrid}
              autoHeight
            />
          ) : (
            <h1>No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
