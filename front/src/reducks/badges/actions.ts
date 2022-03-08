import actionCreatorFactory from "typescript-fsa";
import { Badge } from "../../types/entity/badge";

const actionCreator = actionCreatorFactory();

export const fetchBadgesAction = actionCreator<Badge[]>("FETCH_BADGES");
export const deleteBadgeAction = actionCreator<Badge[]>("DELETE_BADGE");
