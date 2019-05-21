import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  BurgerReducer,
  OrderReducer,
  AuthReducer,
  watchAuth,
  watchBurger
} from "./store";

const rootReducer = combineReducers({
  burgerReducr: BurgerReducer,
  orderReducr: OrderReducer,
  authReducr: AuthReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurger);
