import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from 'react-navigation-stack';
import { Provider, useSelector, useDispatch } from 'react-redux';

import { firebaseService } from '../firebase/firebaseCfg';
import { AuthAction } from '../modules/auth/redux/authActions';
import { logout } from '../modules/auth/redux/authThunks';

export const ClientScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );

  function onLogout() {
    logout(dispatch);
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
