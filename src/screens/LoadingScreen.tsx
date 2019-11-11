import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { FirebaseAuth } from '../firebase/firebaseCfg';
import { AppRoute } from '../const/app-routes';

export const LoadingScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  useEffect(() => {
    FirebaseAuth.onAuthStateChanged(user => {
      navigation.navigate(user ? AppRoute.Home : AppRoute.Auth);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
