import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';

import { addClient } from '../modules/user/redux/userThunks';
import { Client } from '../model/Client';

export const AddClientScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

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
          value={name}
          placeholder="name"
          onChangeText={setName}
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button color="black" title="Add client" onPress={onAddClient} />
        </View>
      </View>
    </View>
  );

  function onAddClient() {
    if (email === '' || name === '') {
      setError('Empty field(s)');
    } else {
      addClient(new Client(name, email), dispatch);
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
