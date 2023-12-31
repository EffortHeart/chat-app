import { TOGGLE_TAB } from "./tabType";

export const toggleTab = (index ) => ({
    type: TOGGLE_TAB,
    payload: index,
  });
