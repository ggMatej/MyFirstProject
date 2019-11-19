import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '~/modules/store';
import { addProject, Project } from '~/modules/projects';

import { AppRoute } from '..';

export const AddProjectScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const clients = useSelector(
    (state: ApplicationState) => state.client.clients
  );

  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          value={title}
          placeholder="Project title"
          style={styles.input}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          value={description}
          placeholder="Project description"
          onChangeText={setDescription}
        />
      </View>
      <Text style={styles.error}>{clients.length}</Text>
      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button color="black" title="Add project" onPress={onAddProject} />
        </View>
      </View>
    </View>
  );

  function onAddProject() {
    dispatch(addProject(new Project(title, description)));
    navigation.navigate(AppRoute.Clients);
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
