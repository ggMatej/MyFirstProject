import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Provider, useSelector, useDispatch } from 'react-redux';

import { AuthAction } from '../redux/auth/authActions';
import { AppRoute } from '../const/appRoutes';
import { firebaseService } from '../firebase/firebaseCfg';

export const RegistrationScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
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
      <Text style={styles.error}>{errorMessage}</Text>
      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button color="black" title="Register" onPress={onRegister} />
        </View>
      </View>
    </View>
  );

  function onRegister() {
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
            setErrorMessage(error.message);
          });
        dispatch(AuthAction.loginAction(user.user));
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
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
  error: {
    color: 'red',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  }
});
