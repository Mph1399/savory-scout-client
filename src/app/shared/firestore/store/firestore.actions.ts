import { createAction, props } from '@ngrx/store';
import { Location } from '../../models/location.model';

export const GET_LOCATIONS_BY_COORDS = createAction(
    '[Locations] Get Locations',
    props<{ lat: number, lng: number }>()
  );
  export const SET_LOCATIONS = createAction(
    '[Locations] Set Locations',
    props<{ locations: [Location] }>()
  );