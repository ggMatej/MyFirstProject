import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Project } from '..';

interface Props {
  project: Project;
  onPress: (item: Project) => void;
}

export const ProjectItem: React.FC<Props> = ({ project, onPress }) => {
  const { title, description } = project;
  return (
    <TouchableOpacity onPress={onPress.bind(null, project)}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
