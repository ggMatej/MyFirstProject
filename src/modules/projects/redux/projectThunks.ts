import { Dispatch } from 'redux';
import { firestore } from 'firebase';

import { firebaseService } from '../../../firebase/firebaseCfg';
import { Project } from '../../../model/Project';

import { ProjectAction } from './projectActions';

export const addProject = (project: Project, clientId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(ProjectAction.change());
  firebaseService.database
    .collection('projects')
    .add(Object.assign({}, project))
    .then(doc => {
      dispatch(ProjectAction.add(project));
      firebaseService.database
        .collection('clients')
        .doc(clientId)
        .update({
          projects: firestore.FieldValue.arrayUnion(doc.id)
        });
    })
    .catch(error => console.log(error.message));
};

export const getProjects = () => async (dispatch: Dispatch) => {
  dispatch(ProjectAction.change());
  firebaseService.database
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
