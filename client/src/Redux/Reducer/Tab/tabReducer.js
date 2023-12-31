import { TOGGLE_TAB } from "./tabType";

const initialstate = 3

const tabReducer = (state = initialstate, action) => {
  switch (action.type) {
    case TOGGLE_TAB:
      return state = action.payload;

    default:
      return state;
  }
};

export default tabReducer;
