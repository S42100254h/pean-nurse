import actionCreatorFactory from "typescript-fsa";
import { Stacks } from "../../types/entity/stacks";

const actionCreator = actionCreatorFactory();

export const fetchStacksAction = actionCreator<Stacks>("FETCH_STACKS");
