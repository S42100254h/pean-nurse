import {
  FETCH_QUIZZES,
  DELETE_QUIZ,
  fetchQuizzesAction,
  deleteQuizAction,
} from "../../../reducks/quizzes/actions";

describe("actions.jsのテスト", () => {
  it("fetchQuizzesActionのテスト", () => {
    const dummy = [{ id: 1, title: "neko"}, { id: 2, title: "cat" }];
    const action = fetchQuizzesAction(dummy);

    expect(action).toStrictEqual(
      {
        type: FETCH_QUIZZES,
        payload: dummy,
      }
    );
  });
  
  it("deleteQuizActionのテスト", () => {
    const dummy = { id: 1, title: "neko" };
    const action = deleteQuizAction(dummy);

    expect(action).toStrictEqual(
      {
        type: DELETE_QUIZ,
        payload: dummy,
      }
    );
  });
});
