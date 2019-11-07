import { createStackNavigator } from 'react-navigation-stack';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { AppRoute } from '../const/app-routes';

import { HomeTabNavigator } from './HomeTabNavigator';

export const HomeNavigator = createStackNavigator(
  {
    HomeTab: {
      screen: HomeTabNavigator,
      navigationOptions: {
        headerTitle: 'Welcome'
      }
    }
  },
  {
    initialRouteName: AppRoute.HomeTab,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTitleStyle: {
        color: 'white',
        fontWeight: 'bold'
      },
      headerLeft: null
    }
  }
);
