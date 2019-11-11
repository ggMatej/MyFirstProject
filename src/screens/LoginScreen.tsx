import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { AccessToken, LoginManager, LoginResult } from 'react-native-fbsdk';
import firebase from 'firebase';
import { Provider, useSelector, useDispatch } from 'react-redux';

import { FirebaseAuth, FirebaseDatabase } from '../firebase/firebaseCfg';
import { AppRoute } from '../const/app-routes';
import { loginAction, loginFailedAction } from '../redux/auth';

export const LoginScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMessage] = useState('');

  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          keyboardType="email-address"
          value={email}
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button color="black" title="Login" onPress={onLogin} />
        </View>
        <View style={styles.button}>
          <Button
            color="black"
            title="Facebook login"
            onPress={onFacebookLogin}
          />
        </View>
      </View>
      <Text style={styles.text} onPress={onForgotPassword}>
        Forgot password?
      </Text>
      <Text style={styles.text} onPress={onRegister}>
        Don't have an account?{' '}
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>
          Register!
        </Text>
      </Text>
    </View>
  );

  function onRegister() {
    navigation.navigate(AppRoute.Registration);
  }

  function onLogin() {
    FirebaseAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(loginAction(user.user));
      })
      .catch(error => {
        dispatch(loginFailedAction(error));
      });
  }

  function onForgotPassword() {
    // TODO
  }

  function onFacebookLogin() {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async (result: LoginResult) => {
        if (result.isCancelled) {
          setErrorMessage('Action is cancelled!');
          navigation.navigate(AppRoute.Auth);
          return;
        }
        if (
          result.declinedPermissions &&
          result.declinedPermissions.length > 0
        ) {
          setErrorMessage('Permissions are not ok!');
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
              FirebaseDatabase.collection('profiles')
                .doc(user.user.uid)
                .set({
                  email: user.user.email,
                  uid: user.user.uid
                })
                .catch(error => {
                  setErrorMessage(error.message);
                });
            });
        });
      },
      (error: any) => {
        setErrorMessage(error);
      }
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#cccccc',
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 5,
    textAlign: 'center'
  },
  button: {
    margin: 5
  },
  buttonView: {
    width: '40%',
    margin: 5
  },
  inputView: {
    width: '70%',
    margin: 10
  },
  text: {
    color: 'black',
    margin: 5
  },
  error: {
    color: 'red',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  }
});
