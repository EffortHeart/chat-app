import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducer/rootReducers";

// redux middleware
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const Store = createStore(rootReducer, {
  
}, applyMiddleware(...middlewares));

export default Store;
