import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/app-routes';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { AddProjectScreen } from '../screens/AddProjectScreen';

export const ProjectNavigator = createStackNavigator({
  [AppRoute.Projects]: ProjectsScreen,
  [AppRoute.AddProject]: AddProjectScreen
  // Add project details here
});
