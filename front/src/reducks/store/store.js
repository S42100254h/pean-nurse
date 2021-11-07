import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { AdminsReducer } from "../admins/reducers";
import { LoadingReducer } from "../loading/reducers";
import { NotificationReducer } from "../notification/reducers";
import { QuizzesReducer } from "../quizzes/reducers";
import { UsersReducer } from "../users/reducers";

export const createStore = (history) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      admins: AdminsReducer,
      loading: LoadingReducer,
      notification: NotificationReducer,
      quizzes: QuizzesReducer,
      users: UsersReducer
    }),
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      ))
  );
};
