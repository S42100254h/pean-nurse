import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { AdminsReducer } from "../admin/reducers";
import { BadgeReducer } from "../badge/reducers";
import { BadgesReducer } from "../badges/reducers";
import { CategoriesReducer } from "../categories/reducers";
import { ExperiencesReducer } from "../experiences/reducers";
import { LoadingReducer } from "../loading/reducers";
import { NotificationReducer } from "../notification/reducers";
import { QuizzesReducer } from "../quizzes/reducers";
import { StacksReducer } from "../stacks/reducers";
import { UserReducer } from "../user/reducers";
import { UsersReducer } from "../users/reducers";
import { History } from "history";

export const createStore = (history: History) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      admin: AdminsReducer,
      badge: BadgeReducer,
      badges: BadgesReducer,
      categories: CategoriesReducer,
      experiences: ExperiencesReducer,
      loading: LoadingReducer,
      notification: NotificationReducer,
      quizzes: QuizzesReducer,
      stacks: StacksReducer,
      user: UserReducer,
      users: UsersReducer,
    }),
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)),
  );
};
