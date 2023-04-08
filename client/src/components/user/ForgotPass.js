import React, { useEffect, useState } from "react";
import cls from "./ForgotPass.module.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPass, clearErrors } from "../../redux/actions/user-action";
import Header from "../layout/Header";

const ForgotPass = () => {
  const dispatch = useDispatch();

  const { error, msg } = useSelector((state) => state.forgotPass);

  const [email, setEmail] = useState("");

  const forgotPassHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPass(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (msg) {
      alert(msg);
    }
  }, [dispatch, error, msg]);
  return (
    <>
      <Header />
      <div className={cls.forgotPass}>
        <div className={cls.container}>
          <h2>Forgot Password</h2>
          <form className={`${cls.form} ${cls.forgotForm}`}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" onClick={forgotPassHandler}>
              SEND
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
