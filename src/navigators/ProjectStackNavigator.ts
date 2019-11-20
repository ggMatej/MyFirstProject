import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/appRoutes';
import { ProjectsScreen, AddProjectScreen } from '../screens';

export const ProjectStackNavigator = createStackNavigator(
  {
    Projects: ProjectsScreen
  },
  {}
);
