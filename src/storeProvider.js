import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { BurgerReducer, OrderReducer, AuthReducer } from "./store";

const rootReducer = combineReducers({
  burgerReducr: BurgerReducer,
  orderReducr: OrderReducer,
  authReducr: AuthReducer
});

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
