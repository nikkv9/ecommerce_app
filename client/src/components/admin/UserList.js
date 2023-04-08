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
  deleteUser,
  getAllUsers,
} from "../../redux/actions/user-action";

const UserList = () => {
  const dispatch = useDispatch();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    deleted,
    message,
  } = useSelector((state) => state.profile);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 200,
      flex: 0.5,
      headerClassName: cls.gridColumnHeader,
    },

    {
      field: "name",
      headerName: "User Name",
      minWidth: 200,
      flex: 0.5,
      headerClassName: cls.gridColumnHeader,
    },
    {
      field: "email",
      headerName: "User Email",
      minWidth: 200,
      flex: 0.5,
      headerClassName: cls.gridColumnHeader,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.3,
      headerClassName: cls.gridColumnHeader,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
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
              <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>

              <Button
                onClick={() =>
                  deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((u) => {
      rows.push({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
      });
    });

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert(message);
      dispatch({ type: "DELETE_USER_RESET" });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, deleted, message]);
  return (
    <>
      <div className={classes.admin}>
        <Leftbar />
        <div className={classes.container}>
          <h1>ALL USERS</h1>

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

export default UserList;
