import { UPLOAD_IMAGE } from "./profileImage.type";
const initialState = {
  profilePic: "",
};

const profileImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        profilePic: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default profileImageReducer;
