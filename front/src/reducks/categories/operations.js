import axios from "axios";
import { fetchCategoriesAction, deleteCategoryAction } from "./actions";
import { setNotificationAction } from "../notification/actions";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";

export const fetchCategories = () => {
  return async (dispatch) => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "categories";
    
    axios
      .get(apiEndpoint)
      .then((resp) => {
        dispatch(fetchCategoriesAction(resp.data));
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setNotificationAction({ variant: "error", message: "カテゴリー一覧の取得に失敗しました。" }));
        }, 400);
      });
  };
};
