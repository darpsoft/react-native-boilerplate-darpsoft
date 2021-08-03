const { useReducer } = require("react");

export const reducer = (state, action) => {
  switch (typeof action) {
    case "function":
      return { ...state, ...action(state) };
    default:
      return { ...state, ...action };
  }
};

export const useReducerCustom = (initialState) => {
  return useReducer(reducer, initialState);
};
