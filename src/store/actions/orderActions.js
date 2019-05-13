import * as actionTypes from "../actionTypes/actionTypes";
import axios from "../../axios";

function purchaseBurgerBegin() {
  return {
    type: actionTypes.PURCHASE_BURGER_BEGIN
  };
}

function purchaseBurgerSuccess(id, orderData) {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: { orderId: id, orderData: orderData }
  };
}

function purchaseBurgerFailed(error) {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    payload: { error }
  };
}

function fetchOrdersBegin() {
  return {
    type: actionTypes.FETCH_ORDERS_BEGIN
  };
}

function fectchOrdersSuccess(orders) {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: {orders: orders}
  };
}

function fetchOrdersFailed(error) {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: { error }
  };
}

/**
 * Action to post order Data to server
 * @return
 */
export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerBegin());
    axios
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

/**
 * Action to fetch orders Data to server
 * @return
 */
export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersBegin());
    axios
      .get("/orders.json")
      .then(response => {
        dispatch(fectchOrdersSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchOrdersFailed(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};
