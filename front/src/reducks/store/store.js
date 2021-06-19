import {
  createStore as reduxCreateStore,
  combineReducers,
} from "redux";

import { UsersReducer } from "../users/reducers";

export const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      users: UsersReducer
    })
  );
};
