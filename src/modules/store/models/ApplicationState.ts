import { AuthState } from '../../auth/redux/authReducer';
import { ClientState } from '../../client/redux/clientReducer';
import { ProjectState } from '../../projects/redux/projectReducer';

export interface ApplicationState {
  client: ClientState;
  auth: AuthState;
  project: ProjectState;
}
