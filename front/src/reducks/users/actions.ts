import actionCreatorFactory from "typescript-fsa";
import { User } from "../../types/entity/user";

const actionCreator = actionCreatorFactory();

export const fetchUsersAction = actionCreator<User[]>("FETCH_USERS");
export const deleteUserAction = actionCreator<User[]>("DELETE_USERS");
