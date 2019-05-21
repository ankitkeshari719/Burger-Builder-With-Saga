import * as actionTypes from "../actionTypes/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./authSaga";
import { initIngredientsSaga } from "./burgerSaga";
import { takeEvery } from "redux-saga/effects";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}

export function* watchBurger() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}
