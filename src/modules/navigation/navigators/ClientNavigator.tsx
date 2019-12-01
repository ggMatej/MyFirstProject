import { createStackNavigator } from 'react-navigation-stack';
import { AppColor } from 'modules/design';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';

import { AppRoute } from '../const/app-routes';
import { ClientScreen } from '../screens/ClientsScreen';
import { AddClientScreen } from '../screens/AddClientScreen';
import { ClientDetailsScreen } from '../screens/ClientDetailsScreen';

export const ClientNavigator = createStackNavigator(
  {
    [AppRoute.Clients]: {
      screen: ClientScreen,
      navigationOptions: ({ navigation }) => {
        const addClient = navigation.getParam('addClient');
        return {
          headerTitle: 'Clients',
          headerRight: (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity onPress={addClient}>
                <Icon
                  style={{ marginRight: 10 }}
                  size={25}
                  name="user-plus"
                  color={AppColor.LightPrimary}
                />
              </TouchableOpacity>
            </View>
          )
        };
      }
    },
    [AppRoute.AddClient]: {
      screen: AddClientScreen,
      navigationOptions: {
        headerTitle: 'Add client'
      }
    },
    [AppRoute.ClientDetails]: {
      screen: ClientDetailsScreen,
      navigationOptions: {
        headerTitle: 'Client details'
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
