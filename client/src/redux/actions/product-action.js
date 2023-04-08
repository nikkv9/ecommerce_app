import axios from "axios";

// get all products
export const getProducts =
  (keyword = "", currPage = 1, price = [0, 30000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALL_PRODUCTS_REQUEST" });

      let link = `/products?keyword=${keyword}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/products?keyword=${keyword}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);
      // console.log(data);

      dispatch({
        type: "ALL_PRODUCTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ALL_PRODUCTS_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

// get single products
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REQUEST" });

    const { data } = await axios.get(`/product/${id}`);

    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// Get All Products For Admin
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_PRODUCTS_REQUEST" });

    const { data } = await axios.get("/admin/products");

    dispatch({
      type: "ADMIN_PRODUCTS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ADMIN_PRODUCTS_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// create product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_PRODUCT_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post("/create-product", productData, config);

    dispatch({
      type: "NEW_PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "NEW_PRODUCT_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_PRODUCT_REQUEST" });

    const { data } = await axios.delete(`/product/${id}`);

    dispatch({
      type: "DELETE_PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_PRODUCT_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/product/${id}`, productData, config);

    dispatch({
      type: "UPDATE_PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PRODUCT_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// create review
export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_REVIEW_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put("/review", reviewData, config);

    dispatch({
      type: "CREATE_REVIEW_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_REVIEW_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (pId) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_REVIEW_REQUEST" });

    const { data } = await axios.get(`/reviews?productId=${pId}`);

    dispatch({
      type: "ALL_REVIEW_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ALL_REVIEW_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_REVIEW_REQUEST" });

    const { data } = await axios.delete(
      `/review?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: "DELETE_REVIEW_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_REVIEW_FAIL",
      payload: error.response.data.msg,
    });
  }
};

// clearing errors
export const clearErrors = async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
