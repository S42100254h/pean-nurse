export const CLOSE_NOTIFICATION = "CLOSE_NOTIFICATION";
export const closeNotificationAction = () => {
  return {
    type: "CLOSE_NOTIFICATION"
  };
};

export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const setNotificationAction = (payload) => {
  return {
    type: "SET_NOTIFICATION",
    payload,
  };
};
