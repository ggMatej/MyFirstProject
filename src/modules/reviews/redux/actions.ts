import { ActionUnion, createAction } from 'modules/store';

import { Review } from '..';

import { ReviewType } from './types';

export const ReviewAction = {
  change: () => createAction(ReviewType.Change),

  add: (review: Review) => createAction(ReviewType.Add, { review }),

  getAll: (reviews: Review[]) => createAction(ReviewType.GetAll, { reviews }),

  error: (error: string) => createAction(ReviewType.Error, { error })
};

export type ReviewAction = ActionUnion<typeof ReviewAction>;
