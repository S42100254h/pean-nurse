import actionCreatorFactory from "typescript-fsa";
import { Badges } from "../../types/entity/badges";

const actionCreator = actionCreatorFactory();

export const fetchBadgesAction = actionCreator<Badges>("FETCH_BADGES");
export const deleteBadgeAction = actionCreator<Badges>("DELETE_BADGE");
