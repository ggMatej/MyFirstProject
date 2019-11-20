import { Dispatch } from 'redux';

import { firebaseService } from '../../../firebase/firebaseCfg';
import { Client } from '../../../model/Client';
import { Project } from '../../../model/Project';

import { ClientAction } from './clientActions';

export const addClient = (client: Client) => async (dispatch: Dispatch) => {
  firebaseService.database
    .collection('clients')
    .add(Object.assign({}, client))
    .then(() => {
      dispatch(ClientAction.add(client));
    });
};

export const getClientProjects = (id: string[]) => async (
  dispatch: Dispatch
) => {
  const clientProjects: Project[] = [];
  firebaseService.database
    .collection('projects')
    .get()
    .then(snapshot => {
      const projects: Project[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Project)
      }));
      if (id.length !== 0) {
        id.forEach(projectId => {
          projects.forEach(project => {
            if (projectId === project.id) {
              clientProjects.push(project);
            }
          });
        });
      }

      dispatch(ClientAction.getClientProjects(clientProjects));
    });
};

export const getClients = () => (dispatch: Dispatch) => {
  firebaseService.database
    .collection('clients')
    .get()
    .then(querySnapshot => {
      const clients: Client[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Client)
      }));
      dispatch(ClientAction.getAll(clients));
    })
    .catch(err => {
      dispatch(ClientAction.error(err));
    });
};
