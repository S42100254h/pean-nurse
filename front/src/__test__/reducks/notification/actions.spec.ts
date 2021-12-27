import {
  closeNotificationAction,
  setNotificationAction,
} from "../../../reducks/notification/actions"; 

describe ("actions.tsのテスト", () => {
  it ("closeNotificationActionのテスト", () => {
    const action = closeNotificationAction();

    expect(action).toStrictEqual(
      {
        type: "CLOSE_NOTIFICATION",
        payload: undefined,
      }
    );
  });

  it ("setNotificationActionのテスト", () => {
    type Notification = {
      variant: "success" | "error";
      message: string | undefined;
    };

    const dummy: Notification = { variant: "success", message: "test" };
    const action = setNotificationAction(dummy);

    expect(action).toStrictEqual(
      {
        type: "SET_NOTIFICATION",
        payload: dummy,
      }
    );
  });
});
