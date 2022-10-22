import { DisplayLocationsService } from './../../services/display-locations.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SpinnerActions from '../../spinner/store/spinner.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { FirestoreService } from '../firestore.service';
import * as FirestoreActions from './firestore.actions';
import { Location } from '../../models/location.model';
import { GoogleService } from '../../services/google.service';
import { QuerySnapshot } from 'firebase/firestore';

@Injectable()
export class FirestoreEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: FirestoreService,
    private store: Store,
    private displayLocationsService: DisplayLocationsService,
    private googleService: GoogleService
  ) //     private router: RouterEvent
  {}

  getLocationsByCoords$ = createEffect(() =>
      this.actions$.pipe(
        ofType(FirestoreActions.GET_LOCATIONS_BY_COORDS),
        switchMap((action) => {
          this.store.dispatch(SpinnerActions.SPINNER_START())
          return this.firestoreService
            .geoSearchLocations(action.lat, action.lng)
            .then((matchingDocs): Location[] => {
              return (matchingDocs as any[]).map((doc) => {
                return doc.data();
              });
            })
            .catch((err) => {
              console.log('Error : ', err);
              throw new Error('Valid token not returned');
            });
        }),
        map((locations) => {
          console.log('Locations :', locations);
          if(!locations){return FirestoreActions.NO_LOCATIONS}
          // make a deep copy of locations
          const locationsCopy = JSON.parse(JSON.stringify(locations))
          // The locations array is in Ascending order because Firestore wouldn't return in descending order. Reverse the array order to display the closest locations first.
          locationsCopy.reverse();
          const filteredLocations = this.displayLocationsService.filterLocationResults(locationsCopy as Location[]);
          console.log('filtered: ', filteredLocations)
          return FirestoreActions.SET_LOCATIONS({locations: filteredLocations as Location[]});
        })
      ),

  );






  getLocationsByCoordsAnonymous$ = createEffect(() =>
      this.actions$.pipe(
        ofType(FirestoreActions.GET_LOCATIONS_BY_COORDS_ANONYMOUS),
        switchMap((action) => {
          this.store.dispatch(SpinnerActions.SPINNER_START('Finding Specials'))
          return this.firestoreService
            .geoCloudSearchLocations(action.lat, action.lng)
        }),
        map((locations) => {
           console.log('Locations :', locations);
           if(!locations){return FirestoreActions.NO_LOCATIONS}
          // make a deep copy of locations
          const locationsCopy = JSON.parse(JSON.stringify(locations))
          // The locations array is in Ascending order because Firestore wouldn't return in descending order. Reverse the array order to display the closest locations first.
          locationsCopy.reverse();
          const filteredLocations = this.displayLocationsService.filterLocationResults(locationsCopy as Location[]);
          console.log('filtered: ', filteredLocations)
           return FirestoreActions.SET_LOCATIONS({locations: filteredLocations as Location[]})
        })

      ),
  );









  getLocationsFromSearchbar$ = createEffect(() =>
  this.actions$.pipe(
    ofType(FirestoreActions.GET_LOCATIONS_FROM_SEARCHBAR),
    switchMap((action) => {
      this.store.dispatch(SpinnerActions.SPINNER_START('Finding Specials'))
      return this.googleService
        .getCoordinates(action.input)
    }),
    map((coordinates) => {
      console.log('Coordinates :', coordinates[0]);
      coordinates[0].geometry.location_type === 'ROOFTOP' ? this.store.dispatch(FirestoreActions.GET_LOCATION_BY_PLACE_ID({place_id: coordinates[0].place_id})) : this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS({lat: coordinates[0].geometry.location.lat() , lng: coordinates[0].geometry.location.lng()}));
    })
  ),
{ dispatch: false }
);


 getLocationByPlaceId$ = createEffect(() =>
  this.actions$.pipe(
    ofType(FirestoreActions.GET_LOCATION_BY_PLACE_ID),
    switchMap((action) => {
      return this.firestoreService.getLocationByPlaceId(action.place_id);
    }),
    map((result) => {
      console.log('place Id result: ', result)
    })
  ),
{ dispatch: false }
);
}
