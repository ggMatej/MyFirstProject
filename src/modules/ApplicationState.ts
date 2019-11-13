import { UserState } from '../modules/user/redux/userReducer';
import { AuthState } from '../modules/auth/redux/authReducer';

export interface ApplicationState {
  user: UserState;
  auth: AuthState;
}
