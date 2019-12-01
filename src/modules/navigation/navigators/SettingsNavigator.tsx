import { createStackNavigator } from 'react-navigation-stack';
import { AppColor } from 'modules/design';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

import { AppRoute } from '../const/app-routes';
import { SettingsScreen } from '../screens/SettingsScreen';

export const SettingsNavigator = createStackNavigator(
  {
    [AppRoute.Settings]: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => {
        const logout = navigation.getParam('onLogout');
        return {
          headerTitle: 'Settings',
          headerRight: (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity onPress={logout}>
                <Icon
                  style={{ marginRight: 10 }}
                  size={25}
                  name="power-off"
                  color={AppColor.LightPrimary}
                />
              </TouchableOpacity>
            </View>
          )
        };
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: AppColor.DarkPrimary
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: AppColor.White
      },
      headerTintColor: AppColor.White
    }
  }
);
