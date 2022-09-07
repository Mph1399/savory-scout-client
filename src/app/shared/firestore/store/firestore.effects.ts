import { Injectable } from "@angular/core";
// import { RouterEvent } from "@angular/router";
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Store } from "@ngrx/store";
// import { FirestoreService } from "../firestore.service";
// import * as FirestoreActions from './firestore.actions'


@Injectable()
export class FirestoreEffects {

    // constructor(
    //     private actions$: Actions,
    //     private firestoreService: FirestoreService,
    //     private store: Store,
    //     private router: RouterEvent
    //   ) {}


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
}
