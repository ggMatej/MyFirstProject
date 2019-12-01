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
import { AppColor } from 'modules/design';

import { AppRoute } from '../const/app-routes';

export const ClientDetailsScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const client: Client = navigation.getParam('client');

  const dispatch = useDispatch();

  const projectSelector = (state: ApplicationState) => state.project.projects;

  const clientProjectsSelector = createSelector(projectSelector, projects =>
    projects.filter(project => project.clientId === client.id)
  );

  const clientProjects = useSelector(clientProjectsSelector);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  if (!clientProjects.length) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Projects with {client.name}:</Text>
        </View>
        <View style={styles.noProjects}>
          <Text style={styles.text}>
            You have no projects with this client!
          </Text>
        </View>
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
    backgroundColor: AppColor.White,
    justifyContent: 'flex-start'
  },
  title: {
    color: AppColor.PrimaryText,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10
  },
  text: {
    color: AppColor.PrimaryText,
    fontSize: 15,
    alignSelf: 'center',
    fontStyle: 'italic'
  },
  noProjects: {
    flex: 2,
    justifyContent: 'center'
  }
});
