import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/app-routes';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';

export const AuthenticationNavigator = createStackNavigator(
  {
    [AppRoute.Login]: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login'
      }
    },
    [AppRoute.Registration]: {
      screen: RegistrationScreen,
      navigationOptions: {
        title: 'Register'
      }
    }
  },
  {
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
