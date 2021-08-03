import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";

const reducers = (asyncReducers) => {
  return combineReducers({
    auth: (state, actions) => auth(asyncReducers.auth ?? state, actions),
    settings,
  });
};

export default reducers;
