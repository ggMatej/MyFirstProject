import { Review } from '..';

import { ReviewAction } from './actions';
import { ReviewType } from './types';

export interface ReviewState {
  isChanging: boolean;
  reviews: Review[];
  error?: string;
}

const INITIAL_STATE: ReviewState = {
  isChanging: false,
  reviews: [],
  error: undefined
};

export const reviewReducer = (
  state: ReviewState = INITIAL_STATE,
  action: ReviewAction
) => {
  switch (action.type) {
    case ReviewType.Change:
      return {
        ...state,
        isChanging: true
      };
    case ReviewType.Add:
      return {
        ...state,
        reviews: [...state.reviews, action.payload.review]
      };
    case ReviewType.GetAll:
      return {
        ...state,
        isChanging: false,
        reviews: action.payload.reviews
      };
    case ReviewType.Error:
      return {
        ...state,
        isChanging: false,
        error: action.payload.error
      };
    default:
      return state || INITIAL_STATE;
  }
};
