import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Review } from '..';

interface Props {
  review: Review;
  onPress: (item: Review) => void;
}

export const ReviewItem: React.FC<Props> = ({ review, onPress }) => {
  const { title } = review;

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  function handleOnPress() {
    onPress(review);
  }
};

const styles = StyleSheet.create({
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
