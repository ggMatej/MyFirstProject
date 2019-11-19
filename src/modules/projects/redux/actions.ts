import { createAction, ActionUnion } from 'modules/store';

import { Project } from '..';

import { ProjectType } from './types';

export const ProjectAction = {
  add: (project: Project) => createAction(ProjectType.Add, { project }),

  getAll: (projects: Project[]) =>
    createAction(ProjectType.GetAll, { projects }),

  change: () => createAction(ProjectType.Change)
};

export type ProjectAction = ActionUnion<typeof ProjectAction>;
