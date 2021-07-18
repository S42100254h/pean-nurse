import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { LoadingReducer } from "../loading/reducers";
import { NotificationReducer } from "../notification/reducers";
import { UsersReducer } from "../users/reducers";

export const createStore = (history) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      loading: LoadingReducer,
      notification: NotificationReducer,
      users: UsersReducer
    }),
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      ))
  );
};
