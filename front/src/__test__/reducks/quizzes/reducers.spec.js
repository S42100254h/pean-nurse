import initialState from "../../../reducks/store/initialState";
import { QuizzesReducer } from "../../../reducks/quizzes/reducers";
import { fetchQuizzesAction, deleteQuizAction } from "../../../reducks/quizzes/actions";

describe("QuizzesReducerのテスト", () => {
  const init = initialState.quizzes;
  
  it("action.type === FETCH_QUIZZES", () => {
    const dummy = [{ id: 1, title: "neko" }, { id: 2, title: "cat"} ];
    const action = fetchQuizzesAction(dummy);
    const newState = QuizzesReducer(init, action);

    expect(newState.list).toStrictEqual(
      [
        { id: 1, title: "neko" },
        { id: 2, title: "cat" },
      ]
    );
  });
  
  it("action.type === DELETE_QUIZ", () => {
    const init = [{ id: 1, title: "neko" }, { id: 2, title: "cat"} ];
    const dummy = [{ id: 1, title: "neko" }];
    const action = deleteQuizAction(dummy);
    const newState = QuizzesReducer(init, action);

    expect(newState.list).toStrictEqual(
      [
        { id: 1, title: "neko" }
      ]
    );
  });
});
