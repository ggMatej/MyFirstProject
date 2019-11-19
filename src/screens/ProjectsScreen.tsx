import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ListRenderItemInfo
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ProjectItem } from '../modules/projects/components/projectItem';
import { Project } from '../model/Project';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../modules/projects/redux/projectThunks';
import { ApplicationState } from '../modules/store/models/ApplicationState';

export const ProjectsScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const projects = useSelector(
    (state: ApplicationState) => state.project.projects
  );
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All projects</Text>
      <FlatList
        data={projects}
        renderItem={renderListItem}
        keyExtractor={renderKey}
      />
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
