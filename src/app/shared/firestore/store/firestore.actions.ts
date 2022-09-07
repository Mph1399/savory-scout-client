import { createAction, props } from '@ngrx/store';

export const GET_LOCATIONS = createAction(
    '[Locations] Get Locations',
    props<{ lat: string, lng: string }>()
  );