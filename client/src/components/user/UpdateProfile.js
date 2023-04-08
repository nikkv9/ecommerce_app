import React, { useEffect, useState } from "react";
import cls from "./UpdateProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  persistUser,
  updateProfile,
} from "../../redux/actions/user-action";
import Loader from "../loader/Loader";
import Header from "../layout/Header";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { updated, error, fetching } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    "https://cdn.pixabay.com/photo/2014/09/18/22/42/letters-451484_960_720.jpg"
  );

  const updateDataChange = (e) => {
    const reader = new FileReader();
    console.log(reader);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    };
  };

  const updateProfileHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
      // setAvatar(user.avatar.url);
    }
    if (updated) {
      alert("profile updated");
      dispatch(persistUser());
      navigate("/profile");
      dispatch({
        type: "UPDATE_PROFILE_RESET",
      });
    }
  }, [dispatch, error, updated, user, navigate]);
  return (
    <>
      {fetching ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={cls.updateProfile}>
            <div className={cls.container}>
              <h2>Update Profile</h2>
              <form
                className={`${cls.form} ${cls.updateForm}`}
                encType="multipart/form-data"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={cls.avatar}>
                  <img src={avatarPreview} alt="" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateDataChange}
                  />
                </div>
                <button type="submit" onClick={updateProfileHandler}>
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
