// you can use initialState for each reducer
// const initialState = {
//   products: [],
// };

// all products
export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "ALL_PRODUCTS_REQUEST":
    case "ADMIN_PRODUCTS_REQUEST":
      return {
        fetching: true,
        products: [],
      };

    case "ALL_PRODUCTS_SUCCESS":
      return {
        fetching: false,
        products: action.payload.products,
        totalProduct: action.payload.totalProduct,
        productPerPage: action.payload.productPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case "ADMIN_PRODUCTS_SUCCESS":
      return {
        fetching: false,
        products: action.payload,
      };

    case "ALL_PRODUCTS_FAIL":
    case "ADMIN_PRODUCTS_FAIL":
      return {
        fetching: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// single product
export const productReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_REQUEST":
      return {
        fetching: true,
        ...state,
      };

    case "PRODUCT_SUCCESS":
      return {
        fetching: false,
        product: action.payload,
      };

    case "PRODUCT_FAIL":
      return {
        fetching: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// create new product (admin)
export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "NEW_PRODUCT_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "NEW_PRODUCT_SUCCESS":
      return {
        fetching: false,
        success: action.payload,
        product: action.payload,
      };
    case "NEW_PRODUCT_FAIL":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case "NEW_PRODUCT_RESET":
      return {
        ...state,
        success: false,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        fetching: false,
        deleted: action.payload,
      };

    case "DELETE_PRODUCT_FAIL":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case "DELETE_PRODUCT_RESET":
      return {
        ...state,
        deleted: false,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        fetching: false,
        updated: action.payload,
      };

    case "UPDATE_PRODUCT_FAIL":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case "UPDATE_PRODUCT_RESET":
      return {
        ...state,
        updated: false,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_REVIEW_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "CREATE_REVIEW_SUCCESS":
      return {
        fetching: false,
        success: action.payload,
      };
    case "CREATE_REVIEW_FAIL":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case "CREATE_REVIEW_RESET":
      return {
        ...state,
        success: false,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case "ALL_REVIEW_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "ALL_REVIEW_SUCCESS":
      return {
        fetching: false,
        reviews: action.payload,
      };
    case "ALL_REVIEW_FAIL":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_REVIEW_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "DELETE_REVIEW_SUCCESS":
      return {
        ...state,
        fetching: false,
        deleted: action.payload,
      };
    case "DELETE_REVIEW_FAIL":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case "DELETE_REVIEW_RESET":
      return {
        ...state,
        deleted: false,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
