import { Dispatch } from 'redux';
import firebase from '@react-native-firebase/app';
import { FirebaseCollection } from 'modules/firebase';

import { Client } from '..';

import { ClientAction } from './actions';

// Tu imam problem jer klijent se doda bez id.a
export const addClient = (client: Client) => async (dispatch: Dispatch) => {
  dispatch(ClientAction.change());

  firebase
    .firestore()
    .collection(FirebaseCollection.Clients)
    .add(client);

  dispatch(ClientAction.add(client));
};

export const getClients = () => async (dispatch: Dispatch) => {
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
