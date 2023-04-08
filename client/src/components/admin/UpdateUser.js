import React, { useEffect, useState } from "react";
import cls from "./CreateProduct.module.css";
import classes from "./Admin.module.css";
import MetaData from "../layout/MetaData";
import Leftbar from "./Leftbar";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../redux/actions/user-action";
import Loader from "../loader/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { fetching, error, user } = useSelector((state) => state.userDetails);
  const {
    fetching: updateFetching,
    error: updateError,
    updated,
  } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const updateUserHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(params.id, myForm));
  };
  useEffect(() => {
    if (user && user._id !== params.id) {
      dispatch(getUserDetails(params.id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }

    if (updated) {
      navigate("/admin/users");
      dispatch({ type: "UPDATE_USER_RESET" });
    }
  }, [dispatch, error, navigate, updated, updateError, user, params.id]);

  return (
    <>
      <MetaData title="edit user" />
      <div className={classes.admin}>
        <Leftbar />
        {fetching ? (
          <Loader />
        ) : (
          <div className={cls.container}>
            <h1>UPDATE USER ROLE</h1>
            <form className={cls.form} onSubmit={updateUserHandler}>
              <div>
                <PersonIcon />
                <input type="text" placeholder="Name" required value={name} />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="" disabled>
                    Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={
                  updateFetching ? true : false || role === "" ? true : false
                }
                className={cls.btn}
              >
                Update
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateUser;
