import actionCreatorFactory from "typescript-fsa";
import { Notification } from "../../types/entity/notification";

const actionCreator = actionCreatorFactory();

export const closeNotificationAction = actionCreator("CLOSE_NOTIFICATION");
export const setNotificationAction = actionCreator<Partial<Notification>>("SET_NOTIFICATION");
