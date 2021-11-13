import axios from "axios";
import { useSelector } from "react-redux";
import { fetchQuizzesAction, deleteQuizAction } from "./actions";
import { getQuizzes } from "./selectors";
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

export const deleteQuiz = (id) => {
  const selector = useSelector((state) => state);
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = process.env.REACT_APP_API_URL + "quizzes/" + id;

      axios
        .get(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          const prevQuizzes = getQuizzes(selector);
          const nextQuizzes = prevQuizzes.filter((quiz) => quiz.id !== id);
          dispatch(deleteQuizAction(nextQuizzes));
          dispatch(push("/quiz/list"));
        });
    }
  };
};
