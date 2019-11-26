import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Project } from 'modules/projects';

import { AppRoute } from '../const/app-routes';

export const ProjectDetailsScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const project: Project = navigation.getParam('project');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.title}</Text>
      <Text>{project.description}</Text>
      <View style={styles.button}>
        <Button color="black" title="Make review" onPress={onMakeReview} />
      </View>
    </View>
  );
  function onMakeReview() {
    navigation.navigate(AppRoute.ReviewScreen, { project });
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
