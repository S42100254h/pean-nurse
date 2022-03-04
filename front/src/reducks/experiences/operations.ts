import axios from "axios";
import { fetchExperiencesAction, deleteExperienceAction } from "./actions";
import { setNotificationAction } from "../notification/actions";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { Dispatch } from "redux";
import { Experience } from "../../types/entity/experience";

export const fetchExperiences = () => {
  return async (dispatch: Dispatch) => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "experiences";

    axios
      .get(apiEndpoint)
      .then((resp) => {
        dispatch(fetchExperiencesAction(resp.data));
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(
            setNotificationAction({
              variant: "error",
              message: "経験値一覧の取得に失敗しました。",
            }),
          );
        }, 400);
      });
  };
};

export const deleteExperience = (id: string | number) => {
  return async (dispatch: Dispatch, getExperiences: Function) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const apiEndpoint = process.env.REACT_APP_API_URL + "experiences/" + id;

      axios
        .delete(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          const prevExperiences: Experience[] = getExperiences().experiences.list;
          const nextExperiences: Experience[] = prevExperiences.filter((experience) => experience.id !== id);
          dispatch(deleteExperienceAction(nextExperiences));
          dispatch(showLoadingAction("Delete experience..."));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(
              setNotificationAction({
                variant: "success",
                message: "経験値を削除しました。",
              }),
            );
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(
              setNotificationAction({
                variant: "error",
                message: "経験値の削除に失敗しました。",
              }),
            );
          }, 400);
        });
    }
  };
};
