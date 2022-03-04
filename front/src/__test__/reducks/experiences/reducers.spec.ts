import initialState from "../../../reducks/store/initialState";
import { ExperiencesReducer } from "../../../reducks/experiences/reducers";
import { fetchExperiencesAction, deleteExperienceAction } from "../../../reducks/experiences/actions";

describe("ExperiencesReducerのテスト", () => {
  const init = initialState.experiences;

  it("action.type === FETCH_EXPERIENCES", () => {
    const dummy = [
      {
        id: 1,
        level: 2,
        experience: 100,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
      {
        id: 2,
        level: 3,
        experience: 180,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ];
    const action = fetchExperiencesAction(dummy);
    const newState = ExperiencesReducer(init, action);

    expect(newState.list).toStrictEqual([
      {
        id: 1,
        level: 2,
        experience: 100,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
      {
        id: 2,
        level: 3,
        experience: 180,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ]);
  });

  it("action.type === DELETE_EXPERIENCE", () => {
    const dummy = [
      {
        id: 1,
        level: 2,
        experience: 100,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
      {
        id: 2,
        level: 3,
        experience: 180,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ];
    const action = deleteExperienceAction(dummy);
    const newState = ExperiencesReducer(init, action);

    expect(newState.list).toStrictEqual([
      {
        id: 1,
        level: 2,
        experience: 100,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
      {
        id: 2,
        level: 3,
        experience: 180,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ]);
  });
});
