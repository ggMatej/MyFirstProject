import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppColor } from 'modules/design';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AppRoute } from '../const/app-routes';

import { ClientNavigator } from './ClientNavigator';
import { ProjectNavigator } from './ProjectNavigator';
import { SettingsNavigator } from './SettingsNavigator';

export const BottomTabNavigator = createBottomTabNavigator(
  {
    [AppRoute.Clients]: {
      screen: ClientNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="users" size={25} color={tintColor} />
        )
      }
    },
    [AppRoute.Projects]: {
      screen: ProjectNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list-alt" size={25} color={tintColor} />
        )
      }
    },
    [AppRoute.Settings]: {
      screen: SettingsNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="cog" size={25} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: AppColor.DarkPrimary,
      inactiveTintColor: AppColor.LightPrimary,
      showLabel: false,
      style: {
        backgroundColor: AppColor.White,
        borderTopWidth: 2,
        borderTopColor: AppColor.LightPrimary
      }
    }
  }
);
