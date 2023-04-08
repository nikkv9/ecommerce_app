import express from "express";
import {
  contactUs,
  deleteProfile,
  deleteUserProfile,
  forgotPass,
  getAllUsers,
  getProfile,
  getUser,
  loginUser,
  logout,
  resetPass,
  signupUser,
  updatePass,
  updateProfile,
  updateUserRole,
} from "../controllers/user-ctrl.js";
import { authRole, authToken } from "../middlewares/auth.js";
const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/profile", authToken, getProfile);

router.get("/logout", logout);

router.post("/forgot-pass", forgotPass);

router.put("/reset-pass/:token", resetPass);

router.put("/update-pass", authToken, updatePass);

router.put("/update-profile", authToken, updateProfile);

router.delete("/delete-profile", authToken, deleteProfile);

router.post("/contact-us", authToken, contactUs);

router.get("/user/:id", authToken, authRole("admin"), getUser);

router.get("/users", authToken, authRole("admin"), getAllUsers);

router.put(
  "/update-user-role/:id",
  authToken,
  authRole("admin"),
  updateUserRole
);

router.delete(
  "/delete-user-profile/:id",
  authToken,
  authRole("admin"),
  deleteUserProfile
);

export default router;
