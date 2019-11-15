import { Dispatch } from 'redux';

import { firebaseService } from '../../../firebase/firebaseCfg';
import { Client } from '../../../model/Client';

import { ClientAction } from './clientActions';

export const addClient = (client: Client) => async (dispatch: Dispatch) => {
  firebaseService.database
    .collection('clients')
    .add(client)
    .then(() => {
      dispatch(ClientAction.add(client));
    });
};

export const getClients = () => async (dispatch: Dispatch) => {
  dispatch(ClientAction.change());
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
    .catch(err => dispatch(ClientAction.error(err)));
};
