export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
      return {
        ...state,
        fetching: true,
      };

    case "CREATE_ORDER_SUCCESS":
      return {
        fetching: false,
        order: action.payload,
      };

    case "CREATE_ORDER_FAIL":
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

// get your orders
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "MY_ORDERS_REQUEST":
      return {
        fetching: true,
      };

    case "MY_ORDERS_SUCCESS":
      return {
        fetching: false,
        orders: action.payload,
      };

    case "MY_ORDERS_FAIL":
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

// get order details
export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST":
      return {
        fetching: true,
      };

    case "ORDER_DETAILS_SUCCESS":
      return {
        fetching: false,
        order: action.payload,
      };

    case "ORDER_DETAILS_FAIL":
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

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ALL_ORDERS_REQUEST":
      return {
        fetching: true,
      };

    case "ALL_ORDERS_SUCCESS":
      return {
        fetching: false,
        orders: action.payload,
      };

    case "ALL_ORDERS_FAIL":
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

export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_ORDER_REQUEST":
      return {
        ...state,
        fetching: true,
      };

    case "DELETE_ORDER_SUCCESS":
      return {
        ...state,
        fetching: false,
        deleted: action.payload,
      };

    case "DELETE_ORDER_FAIL":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    case "DELETE_ORDER_RESET":
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

export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_REQUEST":
      return {
        ...state,
        fetching: true,
      };

    case "UPDATE_ORDER_SUCCESS":
      return {
        ...state,
        fetching: false,
        updated: action.payload,
      };

    case "UPDATE_ORDER_FAIL":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case "UPDATE_ORDER_RESET":
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
