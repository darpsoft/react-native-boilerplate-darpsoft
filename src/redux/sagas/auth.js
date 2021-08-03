import { put, takeLatest, call } from "redux-saga/effects";
import request, { getOptionsWithToken, postOptions, showMessageError } from "@utils/request";

import { showLoader, hideLoader, loginSuccess } from "@redux/actions";
import { LOGIN_START, REGISTER_START, UPDATE_REDUX_AUTH_START } from "@redux/constants";
import { database } from "@database";
import Config from "react-native-config";

const filter = {
  where: {},
};

export function* Login({ payload }) {
  let url, options;
  try {
    yield put(showLoader());

    url = `${Config.URL_API}/users/login`;
    options = postOptions({ ...payload, celphone: parseInt(payload.celphone) });
    const requestToken = yield call(request, url, options);

    filter.where.celphone = parseInt(payload.celphone);
    url = `${Config.URL_API}/users?filter=${JSON.stringify(filter)}`;
    options = getOptionsWithToken(requestToken.token);
    const requestUser = yield call(request, url, options);

    yield put(loginSuccess({ tokenUser: requestToken.token, dataUser: requestUser[0] }));
  } catch (err) {
    yield showMessageError(err);
  } finally {
    yield put(hideLoader());
  }
}

export function* Register() {
  try {
    yield put(showLoader());
  } catch (err) {
    yield showMessageError(err);
  } finally {
    yield put(hideLoader());
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
