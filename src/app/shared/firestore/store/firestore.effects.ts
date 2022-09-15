import { DisplayLocationsService } from './../../services/display-locations.service';

import { Injectable } from '@angular/core';
// import { RouterEvent } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { FirestoreService } from '../firestore.service';
import * as FirestoreActions from './firestore.actions';
import { Location } from '../../models/location.model';

@Injectable()
export class FirestoreEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: FirestoreService,
    private store: Store,
    private displayLocationsService: DisplayLocationsService
  ) //     private router: RouterEvent
  {}

  getLocationsByCoords$ = createEffect(() =>
      this.actions$.pipe(
        ofType(FirestoreActions.GET_LOCATIONS_BY_COORDS),
        switchMap((action) => {
          return this.firestoreService
            .geoSearchLocations(action.lat, action.lng)
            .then((matchingDocs) => {
              return (matchingDocs as any[]).map((doc) => {
                return doc.data();
              });
            })
            .catch((err) => {
              console.log('Error : ', err);
            });
        }),
        map((locations) => {
          console.log('Locations :', locations);
         const filteredLocations = this.displayLocationsService.filterLocationResults(locations as [Location]);
         console.log('filtered: ', filteredLocations)
          return FirestoreActions.SET_LOCATIONS({locations: locations as [Location]})
        })
      ),
    //{ dispatch: false }
  );
}
