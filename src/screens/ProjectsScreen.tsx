import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ProjectsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>This is projects screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
