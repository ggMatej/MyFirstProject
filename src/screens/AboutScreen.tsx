import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppRoute } from '../const/app-routes';
export const AboutScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>This is about screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
