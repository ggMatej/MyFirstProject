import firebase from 'firebase';
import { AccessToken, LoginManager, LoginResult } from 'react-native-fbsdk';
import { Dispatch } from 'redux';

import { firebaseService } from '../../../firebase/firebaseCfg';

import { AuthAction } from './authActions';

export function logout(dispatch: Dispatch<any>) {
  firebaseService.auth.signOut();
  dispatch(AuthAction.logOutAction());
}

export function login(email: string, password: string, dispatch: Dispatch) {
  firebaseService.auth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(AuthAction.loginAction(user.user));
    })
    .catch(error => {
      dispatch(AuthAction.loginFailedAction(error.message));
    });
}

export function register(email: string, password: string, dispatch: Dispatch) {
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
          dispatch(AuthAction.loginFailedAction(error.message));
        });
      dispatch(AuthAction.loginAction(user.user));
    })
    .catch(error => {
      dispatch(AuthAction.loginFailedAction(error.message));
    });
}

export function facebookLogin(dispatch: Dispatch) {
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    async (result: LoginResult) => {
      if (result.isCancelled) {
        dispatch(
          AuthAction.loginFailedAction(
            ('Login with Facebook canceled!' as unknown) as firebase.auth.AuthError
          )
        );
        return;
      }
      if (result.declinedPermissions && result.declinedPermissions.length > 0) {
        dispatch(
          AuthAction.loginFailedAction(
            ("You don't have permissions!" as unknown) as firebase.auth.AuthError
          )
        );
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
                dispatch(AuthAction.loginFailedAction(error));
              });
          });
      });
    },
    (error: any) => {
      dispatch(AuthAction.loginFailedAction(error));
    }
  );
}
