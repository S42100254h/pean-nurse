import {
  CLOSE_NOTIFICATION,
  SET_NOTIFICATION,
  closeNotificationAction,
  setNotificationAction,
} from "../../../reducks/notification/actions"; 

describe("actions.jsのテスト", () => {
  it("closeNotificationActionのテスト", () => {
    const action = closeNotificationAction();

    expect(action).toStrictEqual(
      {
        type: CLOSE_NOTIFICATION
      }
    );
  });

  it("setNotificationActionのテスト", () => {
    const dummy = { variant: "success", message: "test" };
    const action = setNotificationAction(dummy);

    expect(action).toStrictEqual(
      {
        type: SET_NOTIFICATION,
        payload: dummy,
      }
    );
  });
});
