import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from 'modules/auth';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { AppRoute } from '..';

export const SettingsScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setParams({ onLogout });
  }, []);
  return (
    <View style={styles.container}>
      <Text>This is settings screen!</Text>
    </View>
  );
  function onLogout() {
    dispatch(logout());
    navigation.navigate(AppRoute.Login);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
