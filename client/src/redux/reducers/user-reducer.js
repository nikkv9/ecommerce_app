export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "SIGNUP_REQUEST":
    case "PERSIST_REQUEST":
    case "CONTACT_REQUEST":
      return {
        fetching: true,
        authenticated: false,
      };

    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
    case "PERSIST_SUCCESS":
      return {
        ...state,
        fetching: false,
        authenticated: true,
        user: action.payload,
      };

    case "LOGIN_FAIL":
    case "SIGNUP_FAIL":
      return {
        ...state,
        fetching: false,
        authenticated: false,
        user: null,
        error: action.payload,
      };

    case "PERSIST_FAIL":
      return {
        fetching: false,
        authenticated: false,
        user: null,
      };

    case "CONTACT_SUCCESS":
      return {
        fetching: false,
        order: action.payload,
      };

    case "CONTACT_FAIL":
      return {
        fetching: false,
        error: action.payload,
      };

    case "LOGOUT_SUCCESS":
      return {
        fetching: false,
        user: null,
        authenticated: false,
      };

    case "LOGOUT_FAIL":
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

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_REQUEST":
    case "UPDATE_PASSWORD_REQUEST":
    case "UPDATE_USER_REQUEST":
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        fetching: true,
      };

    case "UPDATE_PROFILE_SUCCESS":
    case "UPDATE_PASSWORD_SUCCESS":
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        fetching: false,
        updated: action.payload,
      };

    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        fetching: false,
        deleted: action.payload,
        message: action.payload,
      };

    case "UPDATE_PROFILE_FAIL":
    case "UPDATE_PASSWORD_FAIL":
    case "UPDATE_USER_FAIL":
    case "DELETE_USER_FAIL":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case "UPDATE_PROFILE_RESET":
    case "UPDATE_PASSWORD_RESET":
    case "UPDATE_USER_RESET":
      return {
        ...state,
        updated: false,
      };

    case "DELETE_USER_RESET":
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

export const forgotPassReducer = (state = {}, action) => {
  switch (action.type) {
    case "FORGOT_PASSWORD_REQUEST":
    case "RESET_PASSWORD_REQUEST":
      return {
        ...state,
        fetching: true,
        error: null,
      };

    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        fetching: false,
        msg: action.payload,
      };

    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        fetching: false,
        success: action.payload,
      };

    case "FORGOT_PASSWORD_FAIL":
    case "RESET_PASSWORD_FAIL":
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

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "ALL_USERS_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "ALL_USERS_SUCCESS":
      return {
        ...state,
        fetching: false,
        users: action.payload,
      };

    case "ALL_USERS_FAIL":
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

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return {
        ...state,
        fetching: true,
      };
    case "USER_DETAILS_SUCCESS":
      return {
        ...state,
        fetching: false,
        user: action.payload,
      };

    case "USER_DETAILS_FAIL":
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
