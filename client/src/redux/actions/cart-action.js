import axios from "axios";

// add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/product/${id}`);

  dispatch({
    type: "ADD_TO_CART",
    payload: {
      pId: data._id,
      title: data.title,
      price: data.price,
      img: data.img,
      stock: data.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// remove from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: "SAVE_SHIPPING_INFO",
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
