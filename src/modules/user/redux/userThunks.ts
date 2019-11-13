import { Dispatch } from 'redux';

import { firebaseService } from '../../../firebase/firebaseCfg';
import { Client } from '../../../model/Client';

import { UserAction } from './userActions';

export function addClient(client: Client, dispatch: Dispatch) {
  firebaseService.database
    .collection('clients')
    .add(Object.assign({}, client))

    .then(doc => {
      dispatch(UserAction.addClientAction(client));
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

      dispatch(UserAction.getClientsAction(clients));
    });
}
