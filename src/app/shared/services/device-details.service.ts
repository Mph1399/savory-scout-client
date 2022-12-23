import { DetailsComponent } from '../../details/details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DeviceDetailsService {
isDesktopDevice: boolean;
browser = '';
screenWidth: any;

constructor(
    private dialog: MatDialog
) {
   // check the window size and record it to screenWidth var for use in modifying content based on screen size
   this.checkWindowSize();
   window.addEventListener('resize', (event) => {
     this.checkWindowSize();
   });
console.log(window.navigator.userAgent)
}
checkWindowSize = () => {
  this.screenWidth = window.innerWidth;
 // height = window.innerHeight;
 console.log('Screen Size: ', this.screenWidth)
}

setIsDesktopDevice = (isDesktop) => {
    this.isDesktopDevice = isDesktop;
}
getIsDesktopDevice = () => {
    return this.isDesktopDevice;
}
// setBrowser = (browser) => {
//     this.browser = browser;
// }
// getBrowser = () => {
//     return this.browser;
// }
// setLatestLocation = (coords) => {
//     this.latestLocation = coords;
// }
// getLatestLocation = () => {
//     return this.latestLocation;
// }

}

