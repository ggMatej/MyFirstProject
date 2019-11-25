import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'modules/store';
import { register, AuthAction } from 'modules/auth';
import { validateEmail } from 'modules/common/index.';

export const RegistrationScreen: React.FC<NavigationStackScreenProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector((state: ApplicationState) => state.auth.error);

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
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
      <Text style={styles.error}>{error}</Text>
      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button color="black" title="Register" onPress={onRegister} />
        </View>
      </View>
    </View>
  );

  function onRegister() {
    if (!email || !password) {
      dispatch(AuthAction.authError('Empty email or password'));
    } else if (!validateEmail(email)) {
      dispatch(AuthAction.authError('Email bad!'));
    } else {
      dispatch(register(email, password));
    }
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
