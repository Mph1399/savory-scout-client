import { createAction, props } from '@ngrx/store';
import { Location } from '../../models/location.model';

export const GET_LOCATIONS = createAction(
    '[Locations] Get Locations',
    props<{ lat: string, lng: string }>()
  );
  export const SET_LOCATIONS = createAction(
    '[Locations] Set Locations',
    props<{ locations: [Location] }>()
  );