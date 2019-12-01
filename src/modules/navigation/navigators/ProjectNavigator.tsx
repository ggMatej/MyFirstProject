import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import { AppColor } from 'modules/design';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AppRoute } from '../const/app-routes';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { AddProjectScreen } from '../screens/AddProjectScreen';
import { ProjectDetailsScreen } from '../screens/ProjectDetailsScreen';
import { ReviewScreen } from '../screens/AddReviewScreen';
import { ReviewDetailsScreen } from '../screens/ReviewDetailsScreen';

export const ProjectNavigator = createStackNavigator(
  {
    [AppRoute.Projects]: {
      screen: ProjectsScreen,
      navigationOptions: ({ navigation }) => {
        const addProject = navigation.getParam('onAddProject');
        return {
          headerTitle: 'Projects',
          headerRight: (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity onPress={addProject}>
                <Icon
                  style={{ marginRight: 10 }}
                  size={25}
                  name="plus"
                  color={AppColor.LightPrimary}
                />
              </TouchableOpacity>
            </View>
          )
        };
      }
    },
    [AppRoute.AddProject]: {
      screen: AddProjectScreen,
      navigationOptions: {
        headerTitle: 'Add project'
      }
    },
    [AppRoute.ProjectDetails]: {
      screen: ProjectDetailsScreen,
      navigationOptions: ({ navigation }) => {
        const addReview = navigation.getParam('onMakeReview');

        return {
          headerTitle: 'Project details',
          headerRight: (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity onPress={addReview}>
                <Icon
                  style={{ marginRight: 10 }}
                  size={25}
                  name="plus"
                  color={AppColor.LightPrimary}
                />
              </TouchableOpacity>
            </View>
          )
        };
      }
    },
    [AppRoute.Reviews]: {
      screen: ReviewScreen,
      navigationOptions: {
        headerTitle: 'Review'
      }
    },
    [AppRoute.ReviewDetails]: {
      screen: ReviewDetailsScreen,
      navigationOptions: {
        headerTitle: 'Review details'
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
