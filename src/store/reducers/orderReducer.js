import * as actionTypes from "../actionTypes/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  error: false,
  purchased: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.actionTypes) {
    case actionTypes.PURCHASE_BURGER_BEGIN:
      return {
        ...state,
        loading: true,
        error: false
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.payload.orderData,
        id: action.payload.orderId
      };
      return {
        ...state,
        loading: false,
        error: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionTypes.FETCH_ORDERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: false
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      const fetchedOrders = [];
      for (let key in action.payload.orders) {
        fetchedOrders.push({ ...action.payload.orders[key], id: key });
      }
      return {
        ...state,
        loading: true,
        error: false
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    default:
      return state;
  }
};

export default orderReducer;
