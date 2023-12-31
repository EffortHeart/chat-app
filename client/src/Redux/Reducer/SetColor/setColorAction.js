import { set_color } from "./setColorType";

export const toggleColor = (color) => ({
    type: set_color,
    payload: color,
  });