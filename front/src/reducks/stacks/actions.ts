import actionCreatorFactory from "typescript-fsa";
import { Stack } from "../../types/entity/stack";

const actionCreator = actionCreatorFactory();

export const fetchStacksAction = actionCreator<Stack[]>("FETCH_STACKS");
