import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { AdminsReducer } from "../admin/reducers";
import { CategoriesReducer } from "../categories/reducers";
import { LoadingReducer } from "../loading/reducers";
import { NotificationReducer } from "../notification/reducers";
import { QuizzesReducer } from "../quizzes/reducers";
import { UsersReducer } from "../user/reducers";
import { History } from "history";

export const createStore = (history: History) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      admins: AdminsReducer,
      categories: CategoriesReducer,
      loading: LoadingReducer,
      notification: NotificationReducer,
      quizzes: QuizzesReducer,
      user: UsersReducer
    }),
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      ))
  );
};
