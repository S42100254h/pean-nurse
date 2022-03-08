import axios from "axios";
import { fetchBadgesAction, deleteBadgeAction } from "./actions";
import { setNotificationAction } from "../notification/actions";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { Dispatch } from "redux";
import { Badge } from "../../types/entity/badge";

export const fetchBadges = () => {
  return async (dispatch: Dispatch) => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "badges";

    axios
      .get(apiEndpoint)
      .then((resp) => {
        dispatch(fetchBadgesAction(resp.data));
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(
            setNotificationAction({
              variant: "error",
              message: "バッジ一覧の取得に失敗しました。",
            }),
          );
        }, 400);
      });
  };
};

export const deleteBadge = (id: string | number) => {
  return async (dispatch: Dispatch, getBadges: Function) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const apiEndpoint = process.env.REACT_APP_API_URL + "badges/" + id;

      axios
        .delete(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          const prevBadges: Badge[] = getBadges().categories.list;
          const nextBadges: Badge[] = prevBadges.filter((badge) => badge.id !== id);
          dispatch(deleteBadgeAction(nextBadges));
          dispatch(showLoadingAction("Delete badge..."));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(
              setNotificationAction({
                variant: "success",
                message: "バッジを削除しました。",
              }),
            );
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(
              setNotificationAction({
                variant: "error",
                message: "バッジの削除に失敗しました。",
              }),
            );
          }, 400);
        });
    }
  };
};
