import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Review } from 'modules/reviews';
import { AppColor } from 'modules/design';

export const ReviewDetailsScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const review: Review = navigation.getParam('review');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{review.title}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={{ fontStyle: 'italic' }}>{review.body}</Text>
      </View>
    </View>
  );
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
