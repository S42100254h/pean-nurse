import actionCreatorFactory from "typescript-fsa";
import { Badge } from "../../types/entity/badge";

const actionCreator = actionCreatorFactory();

export const createBadgeAction = actionCreator<Badge>("CREATE_BADGE");
