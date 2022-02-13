import axios from "axios";
import { hideLoadingAction, showLoadingAction } from "../reducks/loading/actions";
import { setNotificationAction } from "../reducks/notification/actions";
import { push } from "connected-react-router";
import { Dispatch } from "redux";

type Choice = {
  id?: number;
  choice: string;
  is_right: string;
};

export const createQuiz = (quiz: string, categoryIds: number[], choices: Choice[], commentary: string) => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const headers = { "access-token": auth_token, client: client, uid: uid };
      const apiEndpoint = process.env.REACT_APP_API_URL + "quizzes";

      const body = {
        quiz: { title: quiz },
        category_ids: categoryIds,
        choices: choices,
        commentary: { text: commentary },
      };

      axios
        .post(apiEndpoint, body, { headers: headers })
        .then(() => {
          dispatch(showLoadingAction("Create quiz..."));
          dispatch(push("/quiz/create"));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(
              setNotificationAction({
                variant: "success",
                message: "クイズの作成に成功しました。",
              }),
            );
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(
              setNotificationAction({
                variant: "error",
                message: "クイズの作成に失敗しました。",
              }),
            );
          }, 400);
        });
    }
  };
};

export const editQuiz = (quiz: string, choices: Choice[], commentary: string, id: string) => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const headers = { "access-token": auth_token, client: client, uid: uid };
      const apiEndpoint = process.env.REACT_APP_API_URL + "quizzes/" + id;
      const body = { quiz: { title: quiz }, choices: choices, commentary: { text: commentary } };

      axios
        .patch(apiEndpoint, body, { headers: headers })
        .then(() => {
          dispatch(showLoadingAction("Update quiz..."));
          dispatch(push("/quiz/detail/" + id));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(
              setNotificationAction({
                variant: "success",
                message: "クイズの更新に成功しました。",
              }),
            );
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(
              setNotificationAction({
                variant: "error",
                message: "クイズの更新に失敗しました。",
              }),
            );
          }, 400);
        });
    }
  };
};
