import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const hideLoadingAction = actionCreator("HIDE_LOADING");
export const showLoadingAction = actionCreator<string>("SHOW_LOADING");
