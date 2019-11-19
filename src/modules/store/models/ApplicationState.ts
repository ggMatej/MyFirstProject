import { ClientState } from 'modules/clients';
import { AuthState } from 'modules/auth';
import { ProjectState } from 'modules/projects';

export interface ApplicationState {
  client: ClientState;
  auth: AuthState;
  project: ProjectState;
}
