import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectedRouter, routerMiddleware } from "connected-react-router";

import { UsersReducer } from "../users/reducers";

export const createStore = (history) => {
  return reduxCreateStore(
    combineReducers({
      router: connectedRouter(history),
      users: UsersReducer
    }),
    applyMiddleware(
      routerMiddleware(history)
    )
  );
};
