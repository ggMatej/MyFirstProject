import { AuthState } from '../modules/auth/redux/authReducer';
import { ClientState } from '../modules/client/redux/clientReducer';

export interface ApplicationState {
  client: ClientState;
  auth: AuthState;
}
