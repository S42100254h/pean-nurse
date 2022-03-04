import { fetchExperiencesAction, deleteExperienceAction } from "../../../reducks/experiences/actions";

describe("ations.tsのテスト", () => {
  it("fetchExperiencesActionのテスト", () => {
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

    expect(action).toStrictEqual({
      type: "FETCH_EXPERIENCES",
      payload: dummy,
    });
  });

  it("deleteExperienceActionのテスト", () => {
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

    expect(action).toStrictEqual({
      type: "DELETE_EXPERIENCE",
      payload: dummy,
    });
  });
});
