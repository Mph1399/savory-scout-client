import { RestaurantService } from 'src/services/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-navbar',
  templateUrl: './footer-navbar.component.html',
  styleUrls: ['./footer-navbar.component.scss']
})
export class FooterNavbarComponent implements OnInit {

  constructor( private restaurantService: RestaurantService) { }
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
    this.restaurantService.seachbarSubmitted(input.value);
  }

  getUserLocation = () =>  {
  //   this.geolocation.findIpGeo().pipe(
  //      take(1)
  //   ).subscribe( result => {
  //     console.log('Results: ', result);
  //   });
   }
}
