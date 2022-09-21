import { createAction, props } from '@ngrx/store';

export const SET_FILTERS = createAction(
    '[Filters] Set Filters',
    props<{      
      active?: boolean,
      date?:  Date,
      food?: boolean,
      drinks?: boolean,
      events?: boolean,
      happyHour?: boolean,
      brunch?: boolean,
      kids?: boolean,
      outdoor?: boolean,
      radius?: number }>()
  );
  