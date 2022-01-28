import axios from "axios";
import { fetchQuizzesAction, deleteQuizAction } from "./actions";
import { setNotificationAction } from "../notification/actions";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { Dispatch } from "redux";
import { Quiz } from "../../types/entity/quiz";

export const fetchQuizzes = () => {
  return async (dispatch: Dispatch) => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "quizzes";

    axios
      .get(apiEndpoint)
      .then((resp) => {
        dispatch(fetchQuizzesAction(resp.data));
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(
            setNotificationAction({
              variant: "error",
              message: "クイズ一覧の取得に失敗しました。",
            })
          );
        }, 400);
      });
  };
};

export const deleteQuiz = (id: string | number) => {
  return async (dispatch: Dispatch, getQuizzes: Function) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const apiEndpoint = process.env.REACT_APP_API_URL + "quizzes/" + id;

      axios
        .delete(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          const prevQuizzes = getQuizzes().quizzes.list;
          const nextQuizzes = prevQuizzes.filter(
            (quiz: Quiz) => quiz.id !== Number(id)
          );
          dispatch(deleteQuizAction(nextQuizzes));
          dispatch(showLoadingAction("Delete quiz..."));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(
              setNotificationAction({
                variant: "success",
                message: "クイズを削除しました。",
              })
            );
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(
              setNotificationAction({
                variant: "error",
                message: "クイズの削除に失敗しました。",
              })
            );
          }, 400);
        });
    }
  };
};
