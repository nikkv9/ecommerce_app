import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import cls from "./Profile.module.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <MetaData title={`${user.name}'s profile`} />
      <Header />
      <div className={cls.profile}>
        <div className={cls.left}>
          <h1>My Profile</h1>
          <img src={user.avatar.url} alt={user.name} />
          <Link to="/profile/update">Edit Profile</Link>
        </div>
        <div className={cls.right}>
          <div>
            <h3>Name</h3>
            <p>{user.name}</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>
          <div>
            <h3>Joined On</h3>
            <p>{user.createdAt.substr(0, 10)}</p>
          </div>
          <div>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
