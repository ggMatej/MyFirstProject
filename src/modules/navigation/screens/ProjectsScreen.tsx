import React, { useEffect } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Project, ProjectItem } from 'modules/projects';
import { ApplicationState } from 'modules/store';
import { getProjects } from 'modules/projects';
import { AppColor } from 'modules/design';

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
    navigation.setParams({ onAddProject });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        renderItem={renderListItem}
        keyExtractor={renderKey}
      />
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
    backgroundColor: AppColor.White,
    alignItems: 'stretch'
  }
});
