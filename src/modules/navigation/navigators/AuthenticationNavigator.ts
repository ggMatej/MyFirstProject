import { createStackNavigator } from 'react-navigation-stack';
import { AppColor } from 'modules/design';

import { AppRoute } from '../const/app-routes';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';

export const AuthenticationNavigator = createStackNavigator(
  {
    [AppRoute.Login]: {
      screen: LoginScreen,
      navigationOptions: {
        headerTitle: 'LOGIN'
      }
    },
    [AppRoute.Registration]: {
      screen: RegistrationScreen,
      navigationOptions: {
        headerTitle: 'REGISTRATION'
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: AppColor.White,
        borderBottomWidth: 2,
        borderBottomColor: AppColor.LightPrimary
      },
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerTintColor: AppColor.DarkPrimary
    }
  }
);
