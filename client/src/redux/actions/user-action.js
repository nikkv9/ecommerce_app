import axios from "axios";

// login
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/login", { email, password }, config);
    // console.log(data);

    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (error) {
    // console.log(error);
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data.msg });
  }
};

// register
export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "SIGNUP_REQUEST" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post("/signup", userData, config);

    dispatch({ type: "SIGNUP_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "SIGNUP_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// logout
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/logout");

    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.msg });
  }
};

// persist user data
export const persistUser = () => async (dispatch) => {
  try {
    dispatch({ type: "PERSIST_REQUEST" });

    const { data } = await axios.get("/profile");
    // console.log(data);

    dispatch({ type: "PERSIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PERSIST_FAIL", payload: error.response.data.msg });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PROFILE_REQUEST" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put("/update-profile", userData, config);

    dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.response.data.msg,
    });
  }
};
// Update Password
export const updatePass = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PASSWORD_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put("/update-pass", passwords, config);

    dispatch({ type: "UPDATE_PASSWORD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "UPDATE_PASSWORD_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// forgot password
export const forgotPass = (email) => async (dispatch) => {
  try {
    dispatch({ type: "FORGOT_PASSWORD_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/forgot-pass", email, config);

    dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "FORGOT_PASSWORD_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// reset password
export const resetPass = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: "RESET_PASSWORD_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/reset-pass/${token}`, passwords, config);
    console.log(data);

    dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "RESET_PASSWORD_FAIL", payload: error.response.data.msg });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_USERS_REQUEST" });
    const { data } = await axios.get(`/users`);

    dispatch({ type: "ALL_USERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ALL_USERS_FAIL", payload: error.response.data.msg });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "USER_DETAILS_REQUEST" });
    const { data } = await axios.get(`/user/${id}`);

    dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_DETAILS_FAIL", payload: error.response.data.msg });
  }
};

// Update User role
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/update-user-role/${id}`,
      userData,
      config
    );

    dispatch({ type: "UPDATE_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_USER_REQUEST" });

    const { data } = await axios.delete(`/delete-user-profile/${id}`);

    dispatch({ type: "DELETE_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_USER_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};

// contact us
// export const contactUs = (opt) => async (dispatch) => {
//   try {
//     dispatch({ type: "CONTACT_REQUEST" });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post("/contact-us", opt, config);
//     console.log(data);
//     dispatch({ type: "CONTACT_SUCCESS", payload: data });
//   } catch (error) {
//     dispatch({ type: "CONTACT_FAIL", payload: error.res.ponse.data.msg });
//   }
// };
