import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FirestoreAuthSelectors from '../../login/store/auth.selectors';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { authState } from 'src/app/login/store/auth.reducer';

@Injectable({
    providedIn: 'root'
  })
  export class MailService {
    token: string | null;
    AuthState$: Observable<authState>

    constructor(
        private http: HttpClient,
        private store: Store
    ){}
    cloudUrl = 'https://us-central1-savoryscout';


    sendContactForm = (name: string, email: string, text: string ) => {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(
          this.cloudUrl + '.cloudfunctions.net/contactFormEmail',
          { name, email, text, token: this.token},
          { headers }
        );
      }
      sendReportForm = (name: string, email: string, text: string, locationId, locationName ) => {
        return this.store.select(FirestoreAuthSelectors.getAuthState).pipe(
          switchMap(state => {
          console.log('Setting Token: ', state.user!.token)
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.post(
            this.cloudUrl + '.cloudfunctions.net/reportFormEmail',
            { name, email, text, locationId, locationName, token: state.user!.token},
            { headers }
          );
        }))

      }

      sendSuggestForm = (name: string, local: string, type: string, text: string, email: string ) => {
        console.log(name, ' ', local, ' ', type, ' ', text, ' ', email );
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(
          this.cloudUrl + '.cloudfunctions.net/suggestFormEmail',
          { name, location: local, type, text, email, token: this.token},
          { headers }
        );
      }
  }
