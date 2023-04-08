import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createReviewReducer,
  deleteProductReducer,
  deleteReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  updateProductReducer,
} from "./reducers/product-reducer";
import {
  allUsersReducer,
  forgotPassReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/user-reducer";
import { cartReducer } from "./reducers/cart-reducer";
import {
  allOrdersReducer,
  createOrderReducer,
  deleteOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  updateOrderReducer,
} from "./reducers/order-reducer";

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPass: forgotPassReducer,
  products: productsReducer,
  product: productReducer,
  createReview: createReviewReducer,
  cart: cartReducer,
  createOrder: createOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  allOrders: allOrdersReducer,
  deleteOrder: deleteOrderReducer,
  updateOrder: updateOrderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  deleteReview: deleteReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
