import actionCreatorFactory from "typescript-fsa";
import { Admin } from "../../types/entity/admin";

const actionCreator = actionCreatorFactory();

export const adminSignInAction = actionCreator<Admin>("ADMIN_SIGN_IN");
export const adminSignOutAction = actionCreator("ADMIN_SIGN_OUT");
