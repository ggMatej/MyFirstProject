import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Provider, useSelector, useDispatch } from 'react-redux';

import { FirebaseAuth } from '../firebase/firebaseCfg';

export const HomeScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const user = useSelector(state => state.user);
  return (
    <View style={styles.container}>
      <Text>Welcome {user.email}</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );

  function onLogout() {
    FirebaseAuth.signOut();
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
