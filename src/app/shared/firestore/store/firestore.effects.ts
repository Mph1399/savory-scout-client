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
import * as FilterActions from '../../dialogs/search-filter/store/search-filter.actions'
import { GeolocationService } from '../../services/geolocation.service';

@Injectable()
export class FirestoreEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: FirestoreService,
    private store: Store,
    private displayLocationsService: DisplayLocationsService,
    private googleService: GoogleService,
    private geoService: GeolocationService
  ) //     private router: RouterEvent
  {}

  getLocationsByCoords$ = createEffect(() =>
      this.actions$.pipe(
        ofType(FirestoreActions.GET_LOCATIONS_BY_COORDS),
        switchMap((action) => {
          this.store.dispatch(SpinnerActions.SPINNER_START('Finding Specials'))
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
          console.log('START Locations :', locations);
          if(!locations){return FirestoreActions.NO_LOCATIONS}
          // make a deep copy of locations
          const locationsCopy = JSON.parse(JSON.stringify(locations))
          // The locations array is in Ascending order because Firestore wouldn't return in descending order. Reverse the array order to display the closest locations first.
          locationsCopy.reverse();
          const filteredLocations = this.displayLocationsService.filterLocationResults(locationsCopy as Location[]);
          console.log('FINAL Filtered: ', filteredLocations)
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

  noLocations$ = createEffect(() =>
      this.actions$.pipe(
        ofType(FirestoreActions.NO_LOCATIONS),
        tap(() => {
          return this.store.dispatch(FilterActions.SET_FILTERS({active: true}))
        })
      ))


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
      /* Check the local storage userDate to determine if the user is logged in or if we should use a cloud function to initiate the db search/retrieval. 
      Cloud Functions are used until the user is forced to log in after 1 week free trial. That 1 week time frame is determined by the userDate time stamp in local storage.
      When a user signs in, userDate is removed from local storage so we just need to check if it exists to determine the type of db search needed.
      */
      const userDate = localStorage.getItem('userDate');
      if(coordinates[0].geometry.location_type === 'ROOFTOP'){
        // The results is an actual location, not an area/city 
        this.store.dispatch(FilterActions.SET_FILTERS({active: false }));

       userDate === null ? 
       this.store.dispatch(FirestoreActions.GET_LOCATION_BY_PLACE_ID({place_id: coordinates[0].place_id}))  : 
       this.store.dispatch(FirestoreActions.GET_LOCATION_BY_PLACE_ID_ANONYMOUS({place_id: coordinates[0].place_id}));
 
       } 
        else{ 
          this.geoService.coords.next({location: {lat: coordinates[0].geometry.location.lat(), lng: coordinates[0].geometry.location.lng() }})
          userDate === null ? 
          this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS({lat: coordinates[0].geometry.location.lat() , lng: coordinates[0].geometry.location.lng()})) :
          this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS_ANONYMOUS({lat: coordinates[0].geometry.location.lat() , lng: coordinates[0].geometry.location.lng()}));
         
          ;}
    })
  ),
{ dispatch: false }
);





 getLocationByPlaceId$ = createEffect(() =>
  this.actions$.pipe(
    ofType(FirestoreActions.GET_LOCATION_BY_PLACE_ID),
    switchMap((action) => {
      this.store.dispatch(SpinnerActions.SPINNER_START('Finding Specials'))
      return this.firestoreService.getLocationByPlaceId(action.place_id);
    }),
    map((locations: any) => {
      console.log('START Locations :', locations);
      if(!locations){return FirestoreActions.NO_LOCATIONS}
      // make a deep copy of locations
      const locationsCopy = JSON.parse(JSON.stringify(locations))
      // The locations array is in Ascending order because Firestore wouldn't return in descending order. Reverse the array order to display the closest locations first.
      locationsCopy.reverse();
      const filteredLocations = this.displayLocationsService.filterLocationResults(locationsCopy as Location[]);
      console.log('FINAL Filtered: ', filteredLocations)
      return FirestoreActions.SET_LOCATIONS({locations: filteredLocations as Location[]});
    })
  ),
);




getLocationByPlaceIdAnonymous$ = createEffect(() =>
this.actions$.pipe(
  ofType(FirestoreActions.GET_LOCATION_BY_PLACE_ID_ANONYMOUS),
  switchMap((action) => {
    this.store.dispatch(SpinnerActions.SPINNER_START('Finding Specials'));
    return  this.firestoreService.getLocationByPlaceIdAnonymous(action.place_id)
  }),
  map((locations: any) => {
    console.log('START Locations :', locations);
    if(!locations){return FirestoreActions.NO_LOCATIONS}
    // make a deep copy of locations
    const locationsCopy = JSON.parse(JSON.stringify(locations))
    // The locations array is in Ascending order because Firestore wouldn't return in descending order. Reverse the array order to display the closest locations first.
    locationsCopy.reverse();
    const filteredLocations = this.displayLocationsService.filterLocationResults(locationsCopy as Location[]);
    console.log('FINAL Filtered: ', filteredLocations)
    return FirestoreActions.SET_LOCATIONS({locations: filteredLocations as Location[]});
  })
)
);


}

