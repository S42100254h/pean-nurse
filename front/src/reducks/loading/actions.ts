export const HIDE_LOADING = "HIDE_LOADING";
export const hideLoadingAction = () => {
  return {
    type: "HIDE_LOADING",
  };
};

export const SHOW_LOADING = "SHOW_LOADING";
export const showLoadingAction= (payload = "loading...") => {
  return {
    type: "SHOW_LOADING",
    payload
  };
};
