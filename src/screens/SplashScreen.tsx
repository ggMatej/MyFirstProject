import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';

import {firebaseService} from '../firebase/firebaseCfg';
import {AppRoute} from '../const/appRoutes';

export const SplashScreen: React.FC<NavigationStackScreenProps> = ({
  navigation,
}) => {
  useEffect(() => {
    firebaseService.auth.onAuthStateChanged(user => {
      navigation.navigate(user ? AppRoute.HomeTab : AppRoute.Auth);
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
    alignItems: 'center',
  },
});
