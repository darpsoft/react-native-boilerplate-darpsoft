import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";

const reducers = (asyncReducers) =>
  combineReducers({
    auth,
    settings,
    ...asyncReducers,
  });

export default reducers;
