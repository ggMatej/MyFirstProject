import firebase from '@react-native-firebase/app';

import { Dispatch } from 'redux';
import { FirebaseCollection } from 'modules/firebase';

import { Project } from '..';

import { ProjectAction } from './actions';

export const addProject = (project: Project) => async (dispatch: Dispatch) => {
  firebase
    .firestore()
    .collection(FirebaseCollection.Projects)
    .add(project);
};

export const getProjects = () => async (dispatch: Dispatch) => {
  dispatch(ProjectAction.change());

  firebase
    .firestore()
    .collection(FirebaseCollection.Projects)
    .get()
    .then(querySnapshot => {
      const projects: Project[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any)
      }));

      dispatch(ProjectAction.getAll(projects));
    });
};
