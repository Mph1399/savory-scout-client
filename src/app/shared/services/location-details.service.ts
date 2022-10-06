import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DetailsComponent } from "src/app/details/details.component";
import { DeviceDetailsService } from "./device-details.service";

@Injectable()
export class LocationDetailsService {
    screenWidth = this.deviceDetailsService.screenWidth;

    constructor(
        private deviceDetailsService: DeviceDetailsService,
        private dialog: MatDialog
        ){}


    openDetails = (location) => {
        // Send an update to this locations clickThroughs
        // if (environment.state === 'prod') {
        //   try {
        //     if (this.myCoords === undefined) {
        //     //  this.databaseService.updateClickThrough(this.locations[index].id);
        //     } else {
        //       this.databaseService.updateClickThroughWithGeo(
        //         this.locations[index].id,
        //         this.myCoords
        //       );
        //     }
        //   } catch (e) {}
        // Send the index of the location to google analytics so we can count the result positions that are clicked the
        // this.googleAnalyticsService.eventEmitter('location_clicked', 'search_page_location_click', 'location_clicked', index.toString(), 1 )
        // }
      
        const modalConfig = new MatDialogConfig();
        modalConfig.role = 'dialog';
        /* When the page is viewed on a mobile device, we want the dialog to display full screen.
              Here we detect if the device is mobile and use 100vw size if it is or 60vw if it's not.
              panelClass is added to the mobile version to remove the default 24px padding that the modal(dialog) has.
              The default padding can't be overidden any other way.
              'custom-dialog-container' is a class in the styles.scss
              */
      
        if (this.screenWidth < 800) {
          // Open the dialog with these settings if the device is mobile
          const detailsModal = this.dialog.open(DetailsComponent, {
            panelClass: 'myapp-no-padding-dialog',
            minWidth: '100vw',
            height: '100vh',
            data: location,
          });
        } else {
          // Open the dialog with these settings if the device is NOT MOBILE
          const detailsModal = this.dialog.open(DetailsComponent, {
            width: '60vw',
            panelClass: 'myapp-no-padding-dialog',
            data: location,
          });
        }
      }
}