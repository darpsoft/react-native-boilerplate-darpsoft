import { createStore, applyMiddleware } from "redux";
import reduxSaga from "redux-saga";

import reducers from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = reduxSaga();

const reduxStorage = (injectReducer = {}) => {
  return {
    ...createStore(reducers(injectReducer), applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run(rootSaga),
  };
};

export default reduxStorage;
