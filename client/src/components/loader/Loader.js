import React from "react";
import cls from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={cls.loader}>
      <div className={cls.loading}></div>
    </div>
  );
};

export default Loader;
