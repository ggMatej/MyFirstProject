import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from 'modules/store';
import {
  logout,
  login,
  facebookLogin,
  AuthAction,
  setUser
} from 'modules/auth';
import { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth';

import { AppRoute } from '..';
import { validateEmail } from 'modules/common/index.';

export const LoginScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const user = useSelector((state: ApplicationState) => state.auth.user);
  const authError = useSelector((state: ApplicationState) => state.auth.error);
  const dispatch = useDispatch();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(setUser(user));
      navigation.navigate(AppRoute.Home);
    } else {
      navigation.navigate(AppRoute.Login);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          style={styles.input}
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.error}>{authError}</Text>
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
    dispatch(logout());
    navigation.navigate(AppRoute.Registration);
  }

  function onLogin() {
    if (!email || !password) {
      dispatch(AuthAction.authError('Empty email or password'));
    } else if (!validateEmail(email)) {
      dispatch(AuthAction.authError('Email bad!'));
    } else {
      dispatch(login(email, password));
    }
  }

  function onForgotPassword() {
    // TODO
  }

  function onFacebookLogin() {
    dispatch(facebookLogin());
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
