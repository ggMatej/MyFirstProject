import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'modules/store';
import { addProject, Project, getProjects } from 'modules/projects';

import { AppRoute } from '..';

export const AddProjectScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const clients = useSelector(
    (state: ApplicationState) => state.client.clients
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState(clients[0].id);
  const [error, setError] = useState('');

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
      <Text style={styles.error}>{error}</Text>
      <Picker
        selectedValue={clientId}
        style={{ height: 50, width: 100 }}
        onValueChange={setClientId}
      >
        {clients.map((item, index) => {
          return <Picker.Item label={item.name} value={item.id} key={index} />;
        })}
      </Picker>
      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button color="black" title="Add project" onPress={onAddProject} />
        </View>
      </View>
    </View>
  );

  function onAddProject() {
    if (!title || !description) {
      setError('Title or description empty!');
      return;
    }
    dispatch(addProject(new Project(title, description, clientId)));
    dispatch(getProjects());
    navigation.navigate(AppRoute.Projects);
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
