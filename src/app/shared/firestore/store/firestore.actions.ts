import { createAction, props } from '@ngrx/store';
import { Location } from '../../models/location.model';

export const GET_LOCATIONS_BY_COORDS = createAction(
    '[Locations] Get Locations',
    props<{ lat: number, lng: number }>()
  );

export const GET_LOCATIONS_BY_COORDS_ANONYMOUS = createAction(
    '[Locations] Get Locations Anonymous',
    props<{ lat: number, lng: number }>()
  );

  export const GET_LOCATIONS_FROM_SEARCHBAR = createAction(
    '[Locations] Get Locations From Searchbar',
    props<{ input: string }>()
  );

  export const GET_LOCATION_BY_PLACE_ID = createAction(
    '[Locations] Get Location By Place ID',
    props<{ place_id: string }>()
  );

  export const GET_LOCATION_BY_PLACE_ID_ANONYMOUS = createAction(
    '[Locations] Get Location By Place ID Anonymous',
    props<{ place_id: string }>()
  );

  export const SET_LOCATIONS = createAction(
    '[Locations] Set Locations',
    props<{ locations: Location[] }>()
  );

  export const NO_LOCATIONS = createAction(
    '[Locations] No Locations',
    props<{ locations: Location[] }>()
  );