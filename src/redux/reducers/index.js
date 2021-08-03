import { isEqual } from "lodash";
import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";

const reducers = (asyncReducers) => {
  return combineReducers({
    auth: (stateReducer, actions) => {
      const state = stateReducer ?? asyncReducers.auth;
      return auth(isEqual(state, {}) ? undefined : state, actions);
    },
    settings,
  });
};

export default reducers;
