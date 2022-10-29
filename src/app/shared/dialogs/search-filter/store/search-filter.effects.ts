
import { DisplayLocationsService } from './../../../services/display-locations.service';
import { GeolocationService } from './../../../services/geolocation.service';
 import { Injectable } from "@angular/core";
// // import { RouterEvent } from "@angular/router";
 import { Actions, createEffect, ofType } from '@ngrx/effects';
 import { Store } from "@ngrx/store";
import * as FirestoreActions from '../../../firestore/store/firestore.actions'
import * as SearchFilterActions from './search-filter.actions';
import * as FirestoreSelectors from '../../../firestore/store/firestore.selectors'
import { map, Observable, switchMap, take, tap } from 'rxjs';
import { Location } from 'src/app/shared/models/location.model';


 @Injectable()
 export class SearchFilterEffects {
    locations$: Observable<any> = this.store.select(FirestoreSelectors.getLocationsState);

    constructor(
        private actions$: Actions,
        private store: Store,
        private displayLocationsService: DisplayLocationsService

      ) {}
      setLocations$ = createEffect(() =>
        this.actions$.pipe(
        ofType(SearchFilterActions.SET_FILTERS),
        switchMap(() => {   
        //  console.log('getting locations')
          return  this.locations$
            .pipe(
                take(1),
                map(state => {
                  //  console.log('locations: ', state.locations)
                    const filteredLocations = JSON.parse(JSON.stringify(this.displayLocationsService.displaySelectedCategories(state.locations)));
                  //  console.log('filtered: ', filteredLocations)
                    return FirestoreActions.SET_LOCATIONS({locations: filteredLocations as Location[]})
                })
            )
        })

        )
       
      )
      
    }

//   getLocations$ = createEffect(() =>
//     this.actions$.pipe(
// //        ofType(FirestoreActions.GET_LOCATIONS),
// //     //   switchMap((action) => {
// //     //     console.log('inside getLocation Effect: ', action);
// //     //     return this.firestoreDatabaseService.getLocation(action.id);
// //     //   }),
// //     //   map((docSnap) => {
// //     //     if (docSnap.exists()) {
// //     //       console.log('Document data:', docSnap.data());
// //     //       // return LocationActions.SET_LOCATION({docSnap.data().location})
// //     //     } else {
// //     //       // doc.data() will be undefined in this case
// //     //       console.log('No such document!');
// //     //     }
// //     //     // return LocationActions.SET_LOCATION({docSnap.data().location})
// //     //     return LocationActions.SET_LOCATION({
// //     //       location: docSnap.data() as Location,
// //     //     });
// //     //   }),
// //     //   catchError((errorRes) => {
// //     //     console.log('Error: ', errorRes);
// //     //     return of(
// //     //       LocationActions.GET_LOCATION_FAILED({
// //     //         message: 'error getting location',
// //     //       })
// //     //     );
// //     //   })
// //     //   //   
//     ),
//     { dispatch: false }
//   )

// setLocations$ = createEffect(() =>
// this.actions$.pipe(
// ofType(SearchFilterActions.SET_FILTERS),
// switchMap(() => {   
//   console.log('getting locations')
//   return  this.locations$
// }),
// map(state => {
//     console.log('locations: ', state.locations)
//     const filteredLocations = JSON.parse(JSON.stringify(this.displayLocationsService.filterLocationResults(state.locations)));
//     console.log('filtered: ', filteredLocations)
//     return FirestoreActions.SET_LOCATIONS({locations: filteredLocations as Location[]})
// })
// )

// )