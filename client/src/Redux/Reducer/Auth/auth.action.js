import axios from "axios";
// import dotenv from "dotenv";
// action type

import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  USER_VERIFICATION,
  VERIFY_TOKEN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CLEAR_AUTH_STORE,
} from "./auth.type";

const SERVER_ACCESS_BASE_URL = process.env.REACT_APP_SERVER_ACCESS_BASE_URL;

// Sign IN

export const signIn = (userData) => async (dispatch) => {
  try {
    // console.log(SERVER_ACCESS_BASE_URL);
    const User = await axios({
      method: "POST",
      url: `${SERVER_ACCESS_BASE_URL}/api/user/login/`,
      data: { ...userData },
    });
    // console.log(User);

    localStorage.setItem(
      "ETalkUser",
      JSON.stringify({ token: User.data.token })
    );
    // window.location.reload();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${User.data.token}`;

    return dispatch({ type: SIGN_IN, payload: User.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error.response.data });
  }
};

// Sign UP

export const signUp = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      url: `${SERVER_ACCESS_BASE_URL}/api/user`,
      data: { ...userData },
    });

    localStorage.setItem(
      "ETalkUser",
      JSON.stringify({ token: User.data.token })
    );
    // window.location.reload();

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${User.data.token}`;

    return dispatch({ type: SIGN_UP, payload: User.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error.response.data });
  }
};

// user VErication

export const userVerification = (data) => async (dispatch) => {
  try {
    // console.log(data.email);
    const verificationLink = await axios({
      method: "POST",
      url: `${SERVER_ACCESS_BASE_URL}/api/user/resend/verificationlink`,
      data: { ...data },
    });

    return dispatch({
      type: USER_VERIFICATION,
      payload: verificationLink.data,
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

// verify email link
export const verifyEmailLink = (token) => async (dispatch) => {
  try {
    const verificationStatus = await axios({
      method: "PUT",
      url: `${SERVER_ACCESS_BASE_URL}/api/user/verify`,
      data: { token },
    });
    return dispatch({ type: VERIFY_TOKEN, payload: verificationStatus.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error.response.data });
  }
};

// Forgot password
export const forgotPassword = (data) => async (dispatch) => {
  try {
    // console.log(data.email);
    const forgotPasswordStatus = await axios({
      method: "POST",
      url: `${SERVER_ACCESS_BASE_URL}/api/user/forgotpassword`,
      data: { ...data },
    });

    return dispatch({
      type: FORGOT_PASSWORD,
      payload: forgotPasswordStatus.data,
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error.response.data });
  }
};

// Reset password
export const resetPassword = (userData) => async (dispatch) => {
  try {
    // const { token, password } = userData;
    // console.log(data.email);
    // const data = {
    //   token: token,
    //   password: password,
    // };
    const resetPasswordStatus = await axios({
      method: "POST",
      url: `${SERVER_ACCESS_BASE_URL}/api/user/resetpassword`,
      data: userData,
    });

    return dispatch({
      type: RESET_PASSWORD,
      payload: resetPasswordStatus.data,
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error.response.data });
  }
};

// clar auth store
export const clearAuthStore = () => async (dispatch) => {
  try {
    return dispatch({ type: CLEAR_AUTH_STORE, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

//   SIGN out

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("ETalkUser");

    window.location.reload();

    return dispatch({ type: SIGN_OUT, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
