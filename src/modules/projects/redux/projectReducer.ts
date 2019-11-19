import { Project } from '../../../model/Project';

import { ProjectType } from './projectType';
import { ProjectAction } from './projectActions';

export interface ProjectState {
  projects?: Project[];
  isChanging: boolean;
}

const INITIAL_STATE: ProjectState = {
  projects: [],
  isChanging: false
};

// Reducer
export const projectReducer = (
  state = INITIAL_STATE,
  action: ProjectAction
) => {
  switch (action.type) {
    case ProjectType.AddProject:
      return {
        ...state,
        projects: [...state.projects, action.payload.project],
        isChanging: false
      };
    case ProjectType.GetAllProjects:
      return {
        ...state,
        projects: action.payload.projects,
        isChanging: false
      };
    case ProjectType.ChangeProject:
      return {
        ...state,
        isChanging: true
      };
    default:
      return INITIAL_STATE;
  }
};
