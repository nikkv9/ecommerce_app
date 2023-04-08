import React from "react";
import { Link } from "react-router-dom";
import cls from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={cls.notFound}>
      <h1>PAGE NOT FOUND</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
