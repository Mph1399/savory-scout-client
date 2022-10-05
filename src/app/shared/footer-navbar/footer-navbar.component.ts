import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FirestoreActions from '../firestore/store/firestore.actions'

@Component({
  selector: 'app-footer-navbar',
  templateUrl: './footer-navbar.component.html',
  styleUrls: ['./footer-navbar.component.scss']
})
export class FooterNavbarComponent implements OnInit {

  constructor( private store: Store) { }
screenWidth: any;
  ngOnInit(): void {
      // check the window size and record it to screenWidth var for use in modifying content based on screen size
      this.checkWindowSize();
      window.addEventListener('resize', (event) => {
        this.checkWindowSize();
      });
  }

  checkWindowSize = () => {
    this.screenWidth = window.screen.width;
   // height = window.innerHeight;
 }
  // When the search button is clicked
  onSearch = (input) => {
    this.store.dispatch(FirestoreActions.GET_LOCATIONS_FROM_SEARCHBAR({input: input.value}))
  }

  getUserLocation = () =>  {
  //   this.geolocation.findIpGeo().pipe(
  //      take(1)
  //   ).subscribe( result => {
  //     console.log('Results: ', result);
  //   });
   }
}
