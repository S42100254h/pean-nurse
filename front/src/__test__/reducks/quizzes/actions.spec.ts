import {
  fetchQuizzesAction,
  deleteQuizAction,
} from "../../../reducks/quizzes/actions";

describe("actions.tsのテスト", () => {
  it("fetchQuizzesActionのテスト", () => {
    const dummy = [
      {
        id: 1,
        title: "neko",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
      {
        id: 2,
        title: "cat",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ];
    const action = fetchQuizzesAction(dummy);

    expect(action).toStrictEqual({
      type: "FETCH_QUIZZES",
      payload: dummy,
    });
  });

  it("deleteQuizActionのテスト", () => {
    const dummy = [
      {
        id: 1,
        title: "neko",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ];
    const action = deleteQuizAction(dummy);

    expect(action).toStrictEqual({
      type: "DELETE_QUIZ",
      payload: dummy,
    });
  });
});
