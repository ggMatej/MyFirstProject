import { Dispatch } from 'redux';
import firebase from 'firebase';
import { FirebaseCollection } from 'modules/firebase';

import { Client } from '..';

import { ClientAction } from './actions';

export const addClient = (client: Client) => (dispatch: Dispatch) => {
  firebase
    .firestore()
    .collection(FirebaseCollection.Clients)
    .add(client);
};

export const getClients = () => (dispatch: Dispatch) => {
  dispatch(ClientAction.change());
  firebase
    .firestore()
    .collection(FirebaseCollection.Clients)
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
