import { Dispatch } from 'redux';

import { firebaseService } from '../../../firebase/firebaseCfg';
import { Project } from '../../../model/Project';

import { ProjectAction } from './projectActions';

export const addProject = (project: Project, id: string) => async (
  dispatch: Dispatch
) => {
  dispatch(ProjectAction.change());

  firebaseService.database
    .collection('clients')
    .doc(id)
    .collection('projects')
    .add(Object.assign({}, project))

    .then(doc => {
      dispatch(ProjectAction.add(project));
    });
};

export const getProjects = (id: string) => async (dispatch: Dispatch) => {
  dispatch(ProjectAction.change());
  firebaseService.database
    .collection('clients')
    .doc(id)
    .collection('projects')
    .get()
    .then(querySnapshot => {
      const projects: Project[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any)
      }));

      dispatch(ProjectAction.getAll(projects));
    });
};
