import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/error-handler.js";
import { contactMail, resetPassMail } from "../utils/send-email.js";

// SIGNUP USER
export const signupUser = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
    });

    const { name, email, password } = req.body;

    const hashPass = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name,
      email: email,
      password: hashPass,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    // GENERATE TOKEN
    const accessToken = user.genToken();

    // STORE TOKEN IN COOKIE
    res.cookie("jwtoken", accessToken, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).send({ user, accessToken });
  } catch (error) {
    return next(error);
  }
};

// LOGIN USER
export const loginUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const inputPassword = req.body.password;

    if (!email || !inputPassword) {
      return next(new ErrorHandler("Please enter all fields", 400));
    }

    let userExist = await User.findOne({ email: email });
    if (!userExist) {
      return next(new ErrorHandler("Invalid email or password!", 401));
    }
    const userPassword = await userExist.comparePassword(inputPassword);

    if (!userPassword) {
      return next(new ErrorHandler("Invalid email or password!!", 401));
    }
    // GENERATE TOKEN
    const accessToken = userExist.genToken();

    // STORE TOKEN IN COOKIE
    res.cookie("jwtoken", accessToken, {
      // for 10 seconds
      // expires: new Date(Date.now() + 10 * 1000),
      // for 3 days
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    //   HIDING PASSWORD
    const { password, ...userlog } = userExist._doc;
    res.status(200).send({ ...userlog, accessToken });
  } catch (error) {
    return next(error);
  }
};

// LOGOUT USER
export const logout = async (req, res, next) => {
  res.clearCookie("jwtoken");
  res.status(200).send("user logged out!");
};

// FORGOT PASSWORD
export const forgotPass = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  // get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // for deploying
  // const resetPassUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/reset-pass/${resetToken}`;

  // if you change your url then you have to some changes in mail-msg that can help code to run better
  // for testing
  const resetPassUrl = `${process.env.CLIENT_URL}/reset-pass/${resetToken}`;

  const mailMsg = `<h1> Your reset password token is :- </h1> 
     <p> ${resetPassUrl} </p>
   <p> If you have not requested this email then please ignore it! </p>`;
  try {
    await resetPassMail({
      email: user.email,
      subject: `Password recovery mail from ecommerce app`,
      html: mailMsg,
    });
    res.status(200).send(`email send to ${user.email} successfully!`);
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(error);
  }
};

// RESET PASSWORD
export const resetPass = async (req, res, next) => {
  try {
    // creating token hash
    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHandler(
          "reset password token is invalid or has been expired!",
          400
        )
      );
    }
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match!", 400));
    }

    const hashPass = await bcrypt.hash(req.body.password, 12);

    user.password = hashPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// DELETE YOUR PROFILE
export const deleteProfile = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) {
      return next(new ErrorHandler("user is not deleted!", 400));
    }
    res.status(200).send("user is deleted!");
  } catch (error) {
    return next(error);
  }
};

// GET YOUR DETAILS
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorHandler("user is not found!", 404));
    }
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// UPDATE YOUR PASSWORD
export const updatePass = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword.length <= 3) {
      return next(
        new ErrorHandler("password should be greater than 3 charactes!", 400)
      );
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
    const hashPass = await bcrypt.hash(req.body.newPassword, 12);

    user.password = hashPass;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// UPDATE YOUR PROFILE
export const updateProfile = async (req, res, next) => {
  try {
    let { name, email, avatar } = req.body;
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    if (req.body.avatar) {
      const user = await User.findById(req.user._id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
      });

      avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        avatar,
      },
      newUserData,
      {
        new: true,
      }
    );
    if (!user) {
      return next(new ErrorHandler("user profile is not updated!", 400));
    }
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// GET A USER (ADMIN)
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("user is not found!", 404));
    }
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// GET ALL USERS (ADMIN)
export const getAllUsers = async (req, res, next) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find().select("-password");
    if (!users) {
      return next(new ErrorHandler("users are not found!", 404));
    }
    res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
};

// UPDATE USER ROLE (ADMIN)
export const updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        role: req.body.role,
      },
      {
        new: true,
      }
    );
    if (!user) {
      return next(new ErrorHandler("user role is not updated!", 400));
    }

    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

// DELETE USER PROFILE (ADMIN)
export const deleteUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new ErrorHandler("user is not deleted!", 400));
    }
    const userPic = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(userPic);
    res.status(200).send("user is deleted!");
  } catch (error) {
    return next(error);
  }
};

// contact us
export const contactUs = async (req, res, next) => {
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return next(new ErrorHandler("Please enter all fields", 400));
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }

    await contactMail({ name, email, msg });
    res.status(200).send("Your message sent successfully!");
  } catch (error) {
    return next(error);
  }
};
