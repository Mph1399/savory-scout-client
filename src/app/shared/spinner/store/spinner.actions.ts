import { createAction, props } from '@ngrx/store';

export const SPINNER_START = createAction(
  '[Spinner] Spinner Start', 
  props<{ message: string }>()
);

export const SPINNER_END = createAction(
  '[Spinner] Spinner End'
);

// props<{ place_id: string }>()
//  (prop: string = 'loading') => ({ prop })
