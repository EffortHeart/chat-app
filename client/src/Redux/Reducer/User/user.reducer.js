import { SELF, CLEAR_USER, UPDATE_PROFILE, INVITE_FRIENDS } from "./user.type";

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELF:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_USER:
      return {
        user: {},
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case INVITE_FRIENDS:
      return {
        ...state,
        InvitingStatus: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
