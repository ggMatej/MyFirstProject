import { ClientState } from 'modules/clients';
import { AuthState } from 'modules/auth';
import { ProjectState } from 'modules/projects';
import { ReviewState } from 'modules/reviews';

export interface ApplicationState {
  client: ClientState;
  auth: AuthState;
  project: ProjectState;
  review: ReviewState;
}
