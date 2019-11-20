import firebase from 'firebase';
import { AccessToken, LoginManager, LoginResult } from 'react-native-fbsdk';
import { Dispatch } from 'redux';

import { firebaseService } from '../../../firebase/firebaseCfg';

import { AuthAction } from './authActions';

export const logout = () => async (dispatch: Dispatch) => {
  dispatch(AuthAction.loading());
  firebaseService.auth.signOut();
  dispatch(AuthAction.logout());
};

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  dispatch(AuthAction.loading());
  firebaseService.auth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(AuthAction.loginSuccess(user.user));
    })
    .catch(error => {
      dispatch(AuthAction.loginError(error.message));
    });
};

export const register = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  dispatch(AuthAction.loading());
  firebaseService.auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      firebaseService.database
        .collection('profiles')
        .doc(user.user.uid)
        .set({
          email: user.user.email,
          uid: user.user.uid
        })
        .catch(error => {
          dispatch(AuthAction.loginError(error.message));
        });
      dispatch(AuthAction.loginSuccess(user.user));
    })
    .catch(error => {
      dispatch(AuthAction.loginError(error.message));
    });
};

export const facebookLogin = () => (dispatch: Dispatch) => {
  dispatch(AuthAction.loading());
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    async (result: LoginResult) => {
      if (result.isCancelled) {
        dispatch(AuthAction.loginError('Login with Facebook canceled!'));
        return;
      }
      if (result.declinedPermissions && result.declinedPermissions.length > 0) {
        dispatch(AuthAction.loginError("You don't have permissions!"));
        return;
      }

      AccessToken.getCurrentAccessToken().then(async (token: AccessToken) => {
        const credidental = firebase.auth.FacebookAuthProvider.credential(
          token
        );
        firebase
          .auth()
          .signInWithCredential(credidental)
          .then(user => {
            firebaseService.database
              .collection('profiles')
              .doc(user.user.uid)
              .set({
                email: user.user.email,
                uid: user.user.uid
              })
              .catch(error => {
                dispatch(AuthAction.loginError(error.message));
              });
          });
      });
    },
    (error: any) => {
      dispatch(AuthAction.loginError(error.message));
    }
  );
};
