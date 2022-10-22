import { createAction, props } from '@ngrx/store';

export const SPINNER_START = createAction(
  '[Spinner] Spinner Start', 
  (prop: string = 'loading') => ({ prop })
);

export const SPINNER_END = createAction(
  '[Spinner] Spinner End'
);

