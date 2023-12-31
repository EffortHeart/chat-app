import axios from "axios";
import {
  FETCH_CHATS,
  FETCH_USER,
  FETCH_USER_CLEAR,
  // SELECT_CHAT,
  SHOW_USER_LOADING,
} from "./chat.type";
const SERVER_ACCESS_BASE_URL = process.env.REACT_APP_SERVER_ACCESS_BASE_URL;

export const loadingUserAction = (state) => {
  return {
    type: SHOW_USER_LOADING,
    payload: state,
  };
};

// fetching all the chats for a particaular user
export const fetchChats = () => async (dispatch) => {
  try {
    const chats = await axios({
      method: "GET",
      url: `${SERVER_ACCESS_BASE_URL}/api/chat`,
    });
    // console.log(chats.data);

    return dispatch({ type: FETCH_CHATS, payload: chats.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

// fetching user for creating new one to one chat and group chat
export const fetchUser = (Search) => async (dispatch) => {
  try {
    dispatch(loadingUserAction(true));
    const newUser = await axios({
      method: "GET",
      url: `${SERVER_ACCESS_BASE_URL}/api/user?search=${Search}`,
    });

    // console.log(...newUser.data);
    dispatch(loadingUserAction(false));
    return dispatch({ type: FETCH_USER, payload: newUser.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

// clear the fetching user
export const fetchUserClear = () => async (dispatch) => {
  try {
    return dispatch({ type: FETCH_USER_CLEAR, payload: "" });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

// creating new one to one chat
export const createChat = (userId) => async (dispatch) => {
  try {
    const newCreatedChat = await axios({
      method: "POST",
      url: `${SERVER_ACCESS_BASE_URL}/api/chat`,
      data: { userId },
    });
    return dispatch({ type: "CREATE_CHAT", payload: newCreatedChat.data });
    // axios.defaults.headers.common["Authorization"] = `Bearer ${User.data.token}`
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

// creating new group chat
export const createGroupChat = (groupInfo) => async (dispatch) => {
  try {
    // console.log({ ...groupInfo });

    const newCreatedGroupChat = await axios({
      method: "POST",
      url: `${SERVER_ACCESS_BASE_URL}/api/chat/group`,
      data: { ...groupInfo },
    });

    return dispatch({
      type: "CREAT_GROUP_CHAT",
      payload: newCreatedGroupChat.data,
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

// Remove user from group
export const removeUserFromGroup = (data) => async (dispatch) => {
  try {
    // console.log({ ...groupInfo });

    const removedUser = await axios({
      method: "PUT",
      url: `${SERVER_ACCESS_BASE_URL}/api/chat/groupremove`,
      data: { ...data },
    });

    return dispatch({
      type: "REMOVE_USER_FROM_GROUP",
      payload: removedUser.data,
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

// selected chat

export const selectChatAction = (item) => async (dispatch) => {
  try {
    return dispatch({
      type: "SELECT_CHAT",
      payload: item,
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
// clear selected chat

export const clearSelectChatAction = () => async (dispatch) => {
  try {
    return dispatch({
      type: "CLEAR_SELECT_CHAT",
      payload: {},
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

// export const clearUser = () => async (dispatch) => {
//   try {
//     return dispatch({ type: CLEAR_USER, payload: {} });
//   } catch (error) {
//     return dispatch({ type: "ERROR", payload: error });
//   }
// };



