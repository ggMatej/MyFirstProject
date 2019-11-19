import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Dispatch } from 'redux';
import { firebaseService } from '~/modules/firebase';
import firebase from 'firebase';

import { AuthAction } from './actions';

export const logout = () => async (dispatch: Dispatch) => {
  dispatch(AuthAction.change());
  firebaseService.auth.signOut();
  dispatch(AuthAction.logout());
};

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  dispatch(AuthAction.change());
  firebaseService.auth
    .signInWithEmailAndPassword(email, password)
    .then(credential => {
      if (!credential.user) {
        return;
      }

      dispatch(AuthAction.authSuccess(credential.user));
    })
    .catch(error => {
      dispatch(AuthAction.authError(error.message));
    });
};

export const register = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  dispatch(AuthAction.change());
  firebaseService.auth
    .createUserWithEmailAndPassword(email, password)
    .then(credential => {
      if (!credential.user) {
        return;
      }

      dispatch(AuthAction.authSuccess(credential.user));
    })
    .catch(error => {
      dispatch(AuthAction.authError(error.message));
    });
};

export const facebookLogin = () => (dispatch: Dispatch) => {
  dispatch(AuthAction.change());
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    async result => {
      if (result.isCancelled) {
        return dispatch(AuthAction.authError('Login with Facebook canceled!'));
      }

      if (result.declinedPermissions && !!result.declinedPermissions.length) {
        return dispatch(AuthAction.authError("You don't have permissions!"));
      }

      AccessToken.getCurrentAccessToken().then(async token => {
        if (!token) {
          return;
        }

        const credidental = firebase.auth.FacebookAuthProvider.credential(
          token.accessToken
        );

        firebase
          .auth()
          .signInWithCredential(credidental)
          .then(credential => {
            if (!credential.user) {
              return;
            }

            dispatch(AuthAction.authSuccess(credential.user));
          });
      });
    },
    error => {
      dispatch(AuthAction.authError(error.message));
    }
  );
};
