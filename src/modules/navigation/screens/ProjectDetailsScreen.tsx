import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Project } from 'modules/projects';
import { ApplicationState } from 'modules/store';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews, Review, ReviewItem } from 'modules/reviews';

import { AppRoute } from '../const/app-routes';

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
  const isChanging = useSelector(
    (state: ApplicationState) => state.review.isChanging
  );

  useEffect(() => {
    dispatch(getReviews());
  }, []);

  if (isChanging) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{project.title}</Text>
        <Text>{project.description}</Text>
        <Text>Project reviews:</Text>
        <FlatList
          data={projectReviews}
          renderItem={renderListItem}
          keyExtractor={renderKey}
        />
        <View style={styles.button}>
          <Button color="black" title="Make review" onPress={onMakeReview} />
        </View>
      </View>
    );
  }

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
    flexDirection: 'column',
    backgroundColor: '#d9d9d9',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  button: {
    margin: 5
  },
  buttonView: {
    width: '40%',
    margin: 5
  },
  inputView: {
    width: '70%',
    margin: 10
  },
  text: {
    color: 'black',
    margin: 5
  },
  error: {
    color: 'red',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#cccccc',
    padding: 5,
    marginVertical: 5,
    width: 300
  },
  title: {
    fontSize: 25
  }
});
