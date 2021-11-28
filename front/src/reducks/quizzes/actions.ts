export const FETCH_QUIZZES = "FETCH_QUIZZES";
export const fetchQuizzesAction = (payload) => {
  return {
    type: "FETCH_QUIZZES",
    payload,
  };
};

export const DELETE_QUIZ = "DELETE_QUIZ";
export const deleteQuizAction = (payload) => {
  return {
    type: "DELETE_QUIZ",
    payload,
  };
};
