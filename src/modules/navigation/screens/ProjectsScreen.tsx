import React, { useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Alert,
  Button
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Project, ProjectItem } from 'modules/projects';
import { ApplicationState } from 'modules/store';
import { getProjects } from 'modules/projects';
import { AppRoute } from '../const/app-routes';

export const ProjectsScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();

  const projects: Project[] = useSelector(
    (state: ApplicationState) => state.project.projects
  );

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        renderItem={renderListItem}
        keyExtractor={renderKey}
      />
      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button title="Add project" onPress={onAddProject} />
        </View>
      </View>
    </View>
  );

  function onAddProject() {
    navigation.navigate(AppRoute.AddProject);
  }

  function renderKey(project: Project) {
    return project.id;
  }

  function renderListItem(item: ListRenderItemInfo<Project>) {
    return <ProjectItem onPress={onProjectSelected} project={item.item} />;
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
    justifyContent: 'flex-end',
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
