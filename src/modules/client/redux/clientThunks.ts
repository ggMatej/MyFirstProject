import { Dispatch } from 'redux';

import { firebaseService } from '../../../firebase/firebaseCfg';
import { Client } from '../../../model/Client';

import { ClientAction } from './clientActions';

export function addClient(client: Client, dispatch: Dispatch) {
  firebaseService.database
    .collection('clients')
    .add(Object.assign({}, client))

    .then(doc => {
      dispatch(ClientAction.addClientAction(client));
    });
}

export function getClients(dispatch: Dispatch) {
  firebaseService.database
    .collection('clients')
    .get()
    .then(querySnapshot => {
      const clients: Client[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any)
      }));

      dispatch(ClientAction.getClientsAction(clients));
    });
}
