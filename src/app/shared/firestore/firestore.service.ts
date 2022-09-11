import { Injectable } from "@angular/core";
import * as geofire from 'geofire-common';
import { environment } from 'src/environments/environment';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


// Initialize Firebase
const app = firebase.initializeApp(environment.firebase);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore(app);

@Injectable()
export class FirestoreService {

 geoSearchLocations = async (lat: number, lng: number) => {
    // Find cities within 50km of London
const center : geofire.Geopoint = [lat, lng];
const radiusInM = 50 * 1000;

// Each item in 'bounds' represents a startAt/endAt pair. We have to issue
// a separate query for each pair. There can be up to 9 pairs of bounds
// depending on overlap, but in most cases there are 4.
const bounds = geofire.geohashQueryBounds(center, radiusInM);
const promises: any[] = [];

for (const b of bounds) {
  const colRef = db.collection('locations')
    .orderBy('geohash')
    .startAt(b[0])
    .endAt(b[1]);
  promises.push(colRef.get());
}

// Collect all the query results together into a single list
Promise.all(promises).then((snapshots) => {
  const matchingDocs = [];

  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const lat = doc.get('lat');
      const lng = doc.get('lng');

      // We have to filter out a few false positives due to GeoHash
      // accuracy, but most will match
      const distanceInKm = geofire.distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        matchingDocs.push(doc);
      }
    }
  }

  return matchingDocs;
}).then((matchingDocs) => {
  // Process the matching documents
  // ...
  matchingDocs.forEach(doc => {
      console.log('Document: ', doc)
  })
}).catch((err) => { console.log('error: ', err)})
}

}