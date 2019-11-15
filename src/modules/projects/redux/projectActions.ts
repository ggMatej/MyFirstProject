import { Project } from '../../../model/Project';
import { createAction } from '../../store/helpers/createAction';

import { ProjectType } from './projectType';

export const ProjectAction = {
  add: (project: Project) => createAction(ProjectType.AddProject, { project }),
  getAll: (projects: Project[]) =>
    createAction(ProjectType.GetAllClientProjects, { projects }),
  change: () => createAction(ProjectType.ChangeProject)
};

export type ProjectAction = ReturnType<
  typeof ProjectAction[keyof typeof ProjectAction]
>;
