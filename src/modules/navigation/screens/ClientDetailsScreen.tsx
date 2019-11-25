import React, { useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Client } from 'modules/clients';
import { Project, getProjects, ProjectItem } from 'modules/projects';
import { ApplicationState } from 'modules/store';
import { createSelector } from 'reselect';

import { AppRoute } from '../const/app-routes';

export const ClientDetailsScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const client: Client = navigation.getParam('client');

  const dispatch = useDispatch();

  const projectSelector = (state: ApplicationState) => state.project.projects;

  const clientProjectsSelector = createSelector(projectSelector, project =>
    project.filter(project => project.clientId === client.id)
  );

  const clientProjects = useSelector(clientProjectsSelector);

  // const clientProjects = projects.filter(
  //   project => project.clientId === client.id
  // );

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  if (!clientProjects.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Projects with {client.name}:</Text>
        <Text>This client has no projects!</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Projects with {client.name}:</Text>
        <FlatList
          data={clientProjects}
          renderItem={renderListItem}
          keyExtractor={renderKey}
        />
      </View>
    );
  }

  function renderListItem(item: ListRenderItemInfo<Project>) {
    return <ProjectItem project={item.item} onPress={onProjectSelected} />;
  }

  function renderKey(project: Project) {
    return project.id;
  }

  function onProjectSelected(project: Project) {
    navigation.navigate(AppRoute.ProjectDetails, { project });
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
