import React, { useEffect, useState } from "react";
import cls from "./ResetPass.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPass } from "../../redux/actions/user-action";
import Loader from "../loader/Loader";
import Header from "../layout/Header";

const ResetPass = () => {
  const { success, error } = useSelector((state) => state.forgotPass);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();
  // console.log(params);

  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const resetPassHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", pass);
    myForm.set("confirmPassword", confirmPass);

    dispatch(resetPass(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("password reset successfully!");
      navigate("/login-signup");
    }
  }, [dispatch, error, success, navigate]);
  return (
    <>
      <Header />
      <div className={cls.resetPass}>
        <div className={cls.container}>
          <h2>Change Password</h2>
          <form className={`${cls.form} ${cls.resetForm}`}>
            <input
              type="password"
              placeholder="New Password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <button type="submit" onClick={resetPassHandler}>
              RESET
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
