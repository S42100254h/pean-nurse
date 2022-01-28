import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const NotificationReducer = reducerWithInitialState(
  initialState.notification
)
  .case(Actions.closeNotificationAction, (state) => ({
    ...state,
    isOpen: false,
  }))
  .case(Actions.setNotificationAction, (state, payload) => ({
    ...state,
    isOpen: true,
    variant: payload.variant,
    message: payload.message,
  }));
