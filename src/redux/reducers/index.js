import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";

const reducers = combineReducers({
  auth,
  settings,
});

export default reducers;
