import { TOGGLE_DARKTHEME } from "./theme.type";

const initialstate ={ 
    darkThemeEnabled: JSON.parse(localStorage.getItem("TOGGLE_DARKTHEME")) || false,
}

const themeReducer = (state = initialstate, action) => {
    switch (action.type) {
        case TOGGLE_DARKTHEME:
          state.darkThemeEnabled = !state.darkThemeEnabled
          const mode = localStorage.setItem("TOGGLE_DARKTHEME", JSON.stringify(state.darkThemeEnabled))
          return { 
            ...state, 
            ...mode
          };
    
        default:
          return state;
      }
}

export default themeReducer;

