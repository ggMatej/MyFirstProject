import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Project } from '..';
import { AppColor } from 'modules/design';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  project: Project;
  onPress: (item: Project) => void;
}

export const ProjectItem: React.FC<Props> = ({ project, onPress }) => {
  const { title, description } = project;
  return (
    <TouchableOpacity style={styles.touchable} onPress={handleOnPress}>
      <View style={styles.container}>
        <Icon
          name="folder"
          color={AppColor.DarkPrimary}
          size={20}
          style={{ padding: 5 }}
        />
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
  function handleOnPress() {
    onPress(project);
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 5,
    color: AppColor.PrimaryText
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  touchable: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    borderBottomWidth: 3,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 0.5,
    borderColor: AppColor.LightPrimary,
    borderRadius: 10
  }
});
