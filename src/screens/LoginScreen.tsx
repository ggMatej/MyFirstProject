import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';

import { AppRoute } from '../const/appRoutes';
import { login, logout } from '../modules/auth/redux/authThunks';
import { facebookLogin } from '../modules/auth/redux/authThunks';
import { ApplicationState } from '../modules/store/models/ApplicationState';

export const LoginScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authError = useSelector((state: ApplicationState) => state.auth.error);
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
    dispatch(login(email, password));
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
