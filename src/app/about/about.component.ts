import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
// import { GoogleAnalyticsService } from 'src/services/google-analytics.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent  {
  isDesktop = false;
  menuOpen = false;
  constructor(
 //   public googleAnalyticsService: GoogleAnalyticsService
    ) { }

  // ngOnInit = () => {
  //   if (environment.state === 'prod') {
  //     this.googleAnalyticsService.eventEmitter('about_page', 'about', 'about_page_viewed' );
  //   }
  // }

}
