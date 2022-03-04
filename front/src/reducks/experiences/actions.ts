import actionCreatorFactory from "typescript-fsa";
import { Experience } from "../../types/entity/experience";

const actionCreator = actionCreatorFactory();

export const fetchExperiencesAction = actionCreator<Experience[]>("FETCH_EXPERIENCES");
export const deleteExperienceAction = actionCreator<Experience[]>("DELETE_EXPERIENCE");
