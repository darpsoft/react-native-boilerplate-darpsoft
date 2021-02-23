import { LOGIN_SUCCESS, UPDATE_REDUX_AUTH_SUCCESS } from "../constants";

export const initialState = {
  tokenUser: null,
  dataUser: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case UPDATE_REDUX_AUTH_SUCCESS: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
export default auth;
