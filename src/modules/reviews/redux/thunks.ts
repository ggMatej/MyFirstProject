import { Dispatch } from 'redux';
import firebase from '@react-native-firebase/app';
import { FirebaseCollection } from 'modules/firebase';

import { Review } from '..';

import { ReviewAction } from './actions';

// Tu imam problem jer klijent se doda bez id.a
export const addReview = (review: Review) => async (dispatch: Dispatch) => {
  firebase
    .firestore()
    .collection(FirebaseCollection.Reviews)
    .add(review);

  dispatch(ReviewAction.add(review));
};

export const getReviews = () => async (dispatch: Dispatch) => {
  // dispatch(ReviewAction.change());
  firebase
    .firestore()
    .collection(FirebaseCollection.Reviews)
    .get()
    .then(querySnapshot => {
      const reviews: Review[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Review)
      }));

      dispatch(ReviewAction.getAll(reviews));
    })
    .catch(err => {
      dispatch(ReviewAction.error(err));
    });
};
