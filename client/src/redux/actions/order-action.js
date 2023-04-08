import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/create-order", order, config);
    console.log(data);

    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "CREATE_ORDER_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// get my orders
export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "MY_ORDERS_REQUEST" });

    const { data } = await axios.get("/orders");

    dispatch({ type: "MY_ORDERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "MY_ORDERS_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_DETAILS_REQUEST" });

    const { data } = await axios.get(`/order/${id}`);

    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_ORDERS_REQUEST" });

    const { data } = await axios.get("/user-orders");

    dispatch({ type: "ALL_ORDERS_SUCCESS", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "ALL_ORDERS_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ORDER_REQUEST" });

    const { data } = await axios.delete(`/order/${id}`);

    dispatch({ type: "DELETE_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_ORDER_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ORDER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/order/${id}`, order, config);

    dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "UPDATE_ORDER_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
