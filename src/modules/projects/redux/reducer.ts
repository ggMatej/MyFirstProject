import { Project } from '..';

import { ProjectType } from './types';
import { ProjectAction } from './actions';

export interface ProjectState {
  projects: Project[];
  isChanging: boolean;
}

const INITIAL_STATE: ProjectState = {
  projects: [],
  isChanging: false
};

export const projectReducer = (
  state = INITIAL_STATE,
  action: ProjectAction
) => {
  switch (action.type) {
    case ProjectType.Add:
      return {
        ...state,
        projects: [...state.projects, action.payload.project],
        isChanging: false
      };
    case ProjectType.GetAll:
      return {
        ...state,
        projects: action.payload.projects,
        isChanging: false
      };
    case ProjectType.Change:
      return {
        ...state,
        isChanging: true
      };
    default:
      return state || INITIAL_STATE;
  }
};
