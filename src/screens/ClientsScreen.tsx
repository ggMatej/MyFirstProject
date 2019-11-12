import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  NavigationTabScreenProps,
  NavigationBottomTabScreenComponent
} from 'react-navigation-tabs';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from 'react-navigation-stack';
import {
  NavigationScreenComponent,
  NavigationScreenProp
} from 'react-navigation';

import { firebaseService } from '../firebase/firebaseCfg';

export const ClientScreen: NavigationStackScreenComponent<NavigationStackScreenProps> = ({
  navigation
}) => {
  const user = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <Text>Welcome!{user.email}</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );

  function onLogout() {
    firebaseService.auth.signOut();
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
