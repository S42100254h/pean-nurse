import initialState from "../../../reducks/store/initialState";
import { NotificationReducer } from "../../../reducks/notification/reducers";
import { closeNotificationAction, setNotificationAction } from "../../../reducks/notification/actions";

describe ("NotificationReducerのテスト", () => {
  const init = initialState.notification;

  it ("action.type === CLOSE_NOTIFICATIONのときのテスト", () => {
    const action = closeNotificationAction();
    const newState = NotificationReducer(init, action);

    expect(newState.isOpen).toStrictEqual(false);
    expect(newState.variant).toStrictEqual("success");
    expect(newState.message).toStrictEqual("");
  });
  
  it ("action.type === SET_NOTIFICATIONのときのテスト", () => {
    type Notification = {
      variant: "success" | "error";
      message: string | undefined;
    };

    const dummy: Notification = { variant: "success", message: "test" };
    const action = setNotificationAction(dummy);
    const newState = NotificationReducer(init, action);
    
    expect(newState.isOpen).toStrictEqual(true);
    expect(newState.variant).toStrictEqual(dummy.variant);
    expect(newState.message).toStrictEqual(dummy.message);
  });
});
