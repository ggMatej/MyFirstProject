import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ListRenderItemInfo
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Project } from 'modules/projects';
import { ApplicationState } from 'modules/store';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews, Review, ReviewItem } from 'modules/reviews';

import { AppRoute } from '../const/app-routes';
import { AppColor } from 'modules/design';

export const ProjectDetailsScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const project: Project = navigation.getParam('project');

  const dispatch = useDispatch();

  const reviewsSelector = (state: ApplicationState) => state.review.reviews;

  const projectReviewsSelector = createSelector(reviewsSelector, reviews =>
    reviews.filter(review => project.id === review.projectId)
  );

  const projectReviews = useSelector(projectReviewsSelector);

  useEffect(() => {
    dispatch(getReviews());
    navigation.setParams({ onMakeReview });
  }, []);

  if (!projectReviews.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{project.title}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 20 }}>Description: </Text>
          <Text style={{ fontStyle: 'italic' }}>{project.description}</Text>
        </View>
        <Text style={{ margin: 10, fontSize: 20 }}>Project reviews:</Text>
        <View style={styles.noProjects}>
          <Text style={styles.text}>This project has no reviews!</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.title}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={{ fontSize: 20 }}>Description: </Text>
        <Text style={{ fontStyle: 'italic' }}>{project.description}</Text>
      </View>
      <Text style={{ margin: 10, fontSize: 20 }}>Project reviews:</Text>
      <FlatList
        data={projectReviews}
        renderItem={renderListItem}
        keyExtractor={renderKey}
      />
    </View>
  );

  function onMakeReview() {
    navigation.navigate(AppRoute.Reviews, { project });
  }

  function renderKey(review: Review) {
    return review.id;
  }

  function renderListItem(item: ListRenderItemInfo<Review>) {
    return <ReviewItem onPress={onReviewSelected} review={item.item} />;
  }

  function onReviewSelected(review: Review) {
    navigation.navigate(AppRoute.ReviewDetails, { review });
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.White,
    justifyContent: 'flex-start'
  },
  title: {
    alignSelf: 'center',
    color: AppColor.PrimaryText,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10
  },
  text: {
    color: AppColor.PrimaryText,
    fontSize: 15,
    alignSelf: 'center',
    fontStyle: 'italic'
  },
  noProjects: {
    flex: 2,
    justifyContent: 'center'
  },
  descriptionContainer: {
    flex: 1,
    margin: 10
  }
});
