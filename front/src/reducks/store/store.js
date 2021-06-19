import {
  createStore as reduxCreateStore,
  combineReducers,
} from "redux";

import { UsersReducer } from "../users/reducers";

export default createStore = () => {
  return reduxCreateStore(
    combineReducers({
      users: UsersReducer
    })
  );
};
