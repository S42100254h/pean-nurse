import axios from "axios";
import { fetchQuizzesAction, deleteQuizAction } from "./actions";
import { setNotificationAction } from "../notification/actions";

export const fetchQuizzes = () => {
  return async (dispatch) => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "quizzes";
    
    axios
      .get(apiEndpoint)
      .then((resp) => {
        dispatch(fetchQuizzesAction(resp.data));
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setNotificationAction({ variant: "error", message: "クイズ一覧の取得に失敗しました。" }));
        }, 400);
      });
  };
};
