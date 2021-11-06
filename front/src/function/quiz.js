import axios from "axios";
import { hideLoadingAction, showLoadingAction } from "../reducks/loading/actions";
import { setNotificationAction } from "../reducks/notification/actions";
import { push } from "connected-react-router";

export const createQuiz = (quiz, choice1, select1, choice2, select2, choice3, select3, choice4, select4 ) => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const headers = { "access-token": auth_token, client: client, uid: uid };
      const quizApiEndpoint = process.env.REACT_APP_API_URL + "quizzes";
      const quizBody = { title: quiz };

      axios
        .post(quizApiEndpoint, quizBody, { headers: headers })
        .then((resp) => {
          const newQuizId = resp.data.id;
          console.log(newQuizId);
          const choiceApiEndpoint = process.env.REACT_APP_API_URL + "choices";
          
          const choiceBodyList =  [
            { choice: { choice: choice1, is_right: select1, quiz_id: newQuizId } },
            { choice: { choice: choice2, is_right: select2, quiz_id: newQuizId } },
            { choice: { choice: choice3, is_right: select3, quiz_id: newQuizId } },
            { choice: { choice: choice4, is_right: select4, quiz_id: newQuizId } },
          ];

          for ( let i = 0; i < choiceBodyList.length; i++) {
            axios
              .post(choiceApiEndpoint, choiceBodyList[i], { headers: headers })
              .then(() => {
                dispatch(showLoadingAction("Create quiz..."));
                dispatch(push("/quiz/create"));

                setTimeout(() => {
                  dispatch(hideLoadingAction());
                  dispatch(setNotificationAction({ variant: "success", message: "選択肢の作成に成功しました。" }));
                }, 1000);
              })
              .catch(() => {
                const deleteQuizApiEndpoint = process.env.REACT_APP_API_URL + "quizzes/" + newQuizId;
                axios
                  .delete(deleteQuizApiEndpoint, { headers: headers })
                  .then(() => {
                    setTimeout(() => {
                      dispatch(setNotificationAction({ variant: "error", message: "選択肢の作成に失敗しました。ロールバックします。" }));
                    }, 400);
                  })
                  .catch(() => {
                    setTimeout(() => {
                      dispatch(setNotificationAction({ variant: "error", message: "誤ったクイズが作成された可能性があります。管理者へ連絡してください。" }));
                    }, 400);
                  });
              });
          }
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "問題の作成に失敗しました。" }));
          }, 400);
        });
    }
  };
};
