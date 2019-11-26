import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/app-routes';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { AddProjectScreen } from '../screens/AddProjectScreen';
import { ProjectDetailsScreen } from '../screens/ProjectDetailsScreen';
import { ReviewScreen } from '../screens/ReviewScreen';
import { ReviewDetailsScreen } from '../screens/ReviewDetailsScreen';

export const ProjectNavigator = createStackNavigator({
  [AppRoute.Projects]: ProjectsScreen,
  [AppRoute.AddProject]: AddProjectScreen,
  [AppRoute.ProjectDetails]: ProjectDetailsScreen,
  [AppRoute.Reviews]: ReviewScreen,
  [AppRoute.ReviewDetails]: ReviewDetailsScreen
});
