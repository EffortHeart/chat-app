import { set_color } from "./setColorType";
import { colors } from "../../../config.js/data";

const initialstate = {
   themeColor: JSON.parse(localStorage.getItem("set_color")) || colors[0].color
}

 const setColorReducer = (state = initialstate, action) =>{
    switch (action.type) {
        case set_color:
            state.themeColor = action.payload;
            const mode = localStorage.setItem("set_color", JSON.stringify(state.themeColor))
         return {
            ...state,
            ...mode
         }
          default:
          return state;
      }


}

export default setColorReducer;