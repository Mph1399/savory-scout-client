import { Injectable, OnDestroy } from '@angular/core';
import * as geofire from 'geofire-common';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDocs, QuerySnapshot } from 'firebase/firestore';
// Create a reference to the cities collection
import { collection, query, where } from "firebase/firestore";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as FilterSelectors from '../dialogs/search-filter/store/search-filter.selectors'
import { Subscription } from 'rxjs';
// Initialize Firebase
const app = firebase.initializeApp(environment.firebase);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore(app);
const locationsRef = collection(db, "locations");

@Injectable()
export class FirestoreService implements OnDestroy{
  filters;
  filters$: Subscription;

  constructor(
    private http: HttpClient,
    private store: Store){
    this.filters$ = this.store.select(FilterSelectors.getFilterState).subscribe(state => this.filters = state.filters);
  }
  geoSearchLocations = async (lat: number, lng: number) => {
    // Find cities within 50km of London
    const center: geofire.Geopoint = [lat, lng];
    const radiusInM = 50 * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    // Limit results to 30 to meet the Firestore rules query response limit for abuse prevention
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises: any[] = [];

    for (const b of bounds) {
      const colRef = db
        .collection('locations')
        .limit(30)
        .orderBy('geohash')
        .startAt(b[0])
        .endAt(b[1]);
      promises.push(colRef.get());
    }

    // Collect all the query results together into a single list
   return Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs: QuerySnapshot[] = [];

        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get('lat');
            const lng = doc.get('lng');

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = geofire.distanceBetween([lat, lng], center)
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
              matchingDocs.push(doc);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        // Process the matching documents
        return matchingDocs;

      })
      .catch((err) => {
        console.log('error: ', err);
        throw new Error(`Error: ${err}`);
      });
  };

  getLocationByPlaceId = async (place_id: string) => {
    const q = query(locationsRef, where( "google_id", "==", place_id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
       // doc.data() is never undefined for query doc snapshots
     doc.exists() ? doc.data() : null;
    });
  }

  getLocationByPlaceIdAnonymous(google_id: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      'https://us-central1-savoryscout.cloudfunctions.net/placeIdSearch',
      { google_id},
      { headers: headers }
    );
  }



  geoCloudSearchLocations(lat: number, lng: number) {
    console.log('FETCHING CLOUD LOCATIONS!')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      'https://us-central1-savoryscout.cloudfunctions.net/geoSearch',
      { lat , lng, radius: this.filters.radius * 1000},
      { headers: headers }
    );
  }

ngOnDestroy(){
  this.filters$.unsubscribe();
}
}
