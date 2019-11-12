import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/appRoutes';
import { LoginScreen, RegistrationScreen } from '../screens';

export const AuthenticationNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login'
      }
    },
    Registration: {
      screen: RegistrationScreen,
      navigationOptions: {
        title: 'Register'
      }
    }
  },
  {
    initialRouteName: AppRoute.Login,
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
