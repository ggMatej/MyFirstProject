import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, ListRenderItemInfo } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { useIsFocused, useFocusEffect } from 'react-navigation-hooks';

import { getProjects } from '../modules/projects/redux/projectThunks';
import { Client } from '../model/Client';
import { ApplicationState } from '../modules/store/models/ApplicationState';
import { Project } from '../model/Project';
import { ProjectItem } from '../modules/projects/components/projectItem';

export const ClientProjectsScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const client: Client = navigation.getParam('client');

  const clients = useSelector(
    (state: ApplicationState) => state.client.clients
  );

  const projects = useSelector(
    (state: ApplicationState) => state.project.projects
  );

  useEffect(() => {
    dispatch(getProjects(client.id));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects with {client.name}:</Text>
      <FlatList
        data={projects}
        renderItem={renderListItem}
        keyExtractor={renderKey}
      />
      <Text>{clients.length}</Text>
    </View>
  );
  function renderListItem(item: ListRenderItemInfo<Project>) {
    return <ProjectItem project={item.item} onPress={onProjectPress} />;
  }

  function renderKey(project: Project) {
    return project.id;
  }

  function onProjectPress(project: Project) {
    alert(project.title);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d9d9d9',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  },
  item: {
    backgroundColor: '#cccccc',
    padding: 5,
    marginVertical: 5,
    width: 300
  },
  title: {
    fontSize: 25
  }
});
