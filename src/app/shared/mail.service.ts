import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class MailService {

    constructor(
        private http: HttpClient
    ){}
    cloudUrl = 'https://us-central1-savoryscout';


    sendContactForm = (name: string, email: string, text: string ) => {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(
          this.cloudUrl + '.cloudfunctions.net/contactFormEmail',
          { name, email, text},
          { headers }
        );
      }
      sendReportForm = (name: string, email: string, text: string, locationId, locationName ) => {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(
          this.cloudUrl + '.cloudfunctions.net/reportFormEmail',
          { name, email, text, locationId, locationName},
          { headers }
        );
      }

      sendSuggestForm = (name: string, local: string, type: string, text: string, email: string ) => {
        console.log(name, ' ', local, ' ', type, ' ', text, ' ', email );
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(
          this.cloudUrl + '.cloudfunctions.net/suggestFormEmail',
          { name, location: local, type, text, email},
          { headers }
        );
      }
  }
