import initialState from "../../../reducks/store/initialState";
import { QuizzesReducer } from "../../../reducks/quizzes/reducers";
import {
  fetchQuizzesAction,
  deleteQuizAction,
} from "../../../reducks/quizzes/actions";

describe("QuizzesReducerのテスト", () => {
  const init = initialState.quizzes;

  it("action.type === FETCH_QUIZZES", () => {
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
    const newState = QuizzesReducer(init, action);

    expect(newState.list).toStrictEqual([
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
    ]);
  });

  it("action.type === DELETE_QUIZ", () => {
    const init = {
      list: [
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
      ],
    };
    const dummy = [
      {
        id: 1,
        title: "neko",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ];
    const action = deleteQuizAction(dummy);
    const newState = QuizzesReducer(init, action);

    expect(newState.list).toStrictEqual([
      {
        id: 1,
        title: "neko",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ]);
  });
});
