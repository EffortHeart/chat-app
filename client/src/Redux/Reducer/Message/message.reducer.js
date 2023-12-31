import {} from "./message.action";
import {
  CLEAR_ALL_MESSAGE,
  GET_ALL_MESSAGE,
  SEND_MESSAGE,
  SHOW_NETWORK_ERROR,
  SHOW_TOOGLE_LOADING,
  UPDATE_GET_ALL_MESSAGE,
} from "./message.type";
const initialState = {
  allMessages: [],
  createdMessage: {},
  isLoading: false,
  sNetworkError: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MESSAGE:
      return {
        ...state,
        allMessages: action.payload,

      };

    case SEND_MESSAGE:
      return {
        ...state,
        createdMessage: action.payload,

      };

    case UPDATE_GET_ALL_MESSAGE:
      return {
        ...state,
        allMessages: [...state.allMessages, action.payload],

      };

    case CLEAR_ALL_MESSAGE:
      return {
        ...state,
        allMessages: [],
      };

    case SHOW_TOOGLE_LOADING:
      return{
        ...state,
        isLoading: action.payload
      }
      case SHOW_NETWORK_ERROR:
      return{
        ...state,
        isNetworkError: action.payload
      }

    default:
      return {
        ...state,
      };
  }
};

export default messageReducer;
