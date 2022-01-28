import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const notificationSelector = (state: RootState) => state.notification;

export const getNotificationIsOpen = createSelector(
  [notificationSelector],
  (state) => state.isOpen
);

export const getNotificationVariant = createSelector(
  [notificationSelector],
  (state) => state.variant
);

export const getNotificationMessage = createSelector(
  [notificationSelector],
  (state) => state.message
);
