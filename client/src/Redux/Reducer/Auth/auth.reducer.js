// action Type

import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  USER_VERIFICATION,
  VERIFY_TOKEN,
  ERROR,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CLEAR_AUTH_STORE,
} from "./auth.type";

const intialState = {};

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };

    case SIGN_OUT:
      return {
        ...state,
      };

    case USER_VERIFICATION:
      return {
        ...state,
        ...action.payload,
      };

    case VERIFY_TOKEN:
      return {
        ...state,
        ...action.payload,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        ...action.payload,
      };

    case RESET_PASSWORD:
      return {
        ...state,
        ...action.payload,
      };

    case CLEAR_AUTH_STORE:
      return {
       
        ...action.payload

      };
    case ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
