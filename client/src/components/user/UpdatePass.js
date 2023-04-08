import React, { useEffect, useState } from "react";
import cls from "./UpdatePass.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePass } from "../../redux/actions/user-action";
import Loader from "../loader/Loader";
import Header from "../layout/Header";

const UpdatePass = () => {
  const { updated, error, fetching } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const updatePassHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPass);
    myForm.set("newPassword", newPass);
    myForm.set("confirmPassword", confirmPass);

    dispatch(updatePass(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (updated) {
      alert("password changed!");
      navigate("/profile");
      dispatch({
        type: "UPDATE_PASSWORD_RESET",
      });
    }
  }, [dispatch, error, updated, navigate]);
  return (
    <>
      <Header />
      <div className={cls.updatePass}>
        <div className={cls.container}>
          <h2>Change Password</h2>
          <form className={`${cls.form} ${cls.updateForm}`}>
            <input
              type="password"
              placeholder="Old Password"
              required
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <button type="submit" onClick={updatePassHandler}>
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePass;
