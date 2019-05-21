import * as actionTypes from "../actionTypes/actionTypes";
import { takeEvery, all , takeLatest} from "redux-saga/effects";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./authSaga";
import { initIngredientsSaga } from "./burgerSaga";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./orderSaga";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  ]);
}

export function* watchBurger() {
  yield all([takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)]);
}

export function* watchOrder() {
  yield all([
    takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
  ]);
}
