import { put, takeLatest, select, all, call } from "redux-saga/effects";
import { showMessageError } from "@utils/request";

import { showLoader, hideLoader, loginSuccess } from "@redux/actions/auth";
import { LOGIN_START, REGISTER_START, UPDATE_REDUX_AUTH_START } from "@redux/constants";
import { database } from "@database";

export function* Login() {
  const storage = yield select((state) => state);
  try {
    yield put(showLoader());
    yield all([put(hideLoader())]);
  } catch (err) {
    yield put(hideLoader());
    yield showMessageError(err);
  }
}

export function* Register() {
  const storage = yield select((state) => state);
  try {
    yield put(showLoader());
    yield all([put(hideLoader())]);
  } catch (err) {
    yield put(hideLoader());
    yield showMessageError(err);
  }
}

export function* UpdateReduxAuth({ payload: { resolve, reject } }) {
  const auth = yield database.auth.get("object");
  try {
    // Save data in old reducer
    yield Object.keys(auth).length > 0 && put(loginSuccess(auth));
    yield resolve("Se obtuvieron los datos con éxito");
  } catch (err) {
    yield reject(err);
    yield showMessageError(err);
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_START, Login);
  yield takeLatest(REGISTER_START, Register);
  yield takeLatest(UPDATE_REDUX_AUTH_START, UpdateReduxAuth);
}
