import { AddToHomeSafariComponent } from '../dialogs/add-to-home-safari/add-to-home-safari.component';
import { MatDialog , MatDialogConfig} from '@angular/material/dialog';
import { Component, OnInit, HostListener } from '@angular/core';
import { DeviceDetailsService } from '../services/device-details.service';
import { AddToHomeFirefoxComponent } from '../dialogs/add-to-home-firefox/add-to-home-firefox.component';

@Component({
  selector: 'app-add-to-home',
  templateUrl: './add-to-home.component.html',
  styleUrls: ['./add-to-home.component.scss']
})
export class AddToHomeComponent implements OnInit {
  deferredPrompt: any;
  addToHomeButton = false;
  isDesktop = false;
  browserName = '';
  unsuportedBrowser = false;
  standalone = false;


     // Add to home screen button
   @HostListener('window:beforeinstallprompt', ['$event'])
     onbeforeinstallprompt(e) {
       console.log(e);
       // Prevent Chrome 67 and earlier from automatically showing the prompt
       e.preventDefault();
       // Stash the event so it can be triggered later.
       this.deferredPrompt = e;
       this.addToHomeButton = true;
       console.log('On Before Install Fired');
     }
       // End Add to Home Button


  constructor(
    private dialog: MatDialog,
    private deviceDetailsService: DeviceDetailsService
  ) { }

  ngOnInit(): void {

  /* check if the device is mobile or desktop and set the isDesktopDevice boolean. */
   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) ? this.isDesktop = false : this.isDesktop = true;
   console.log('userAgent: ', window.navigator.userAgent);
  /* Detect if the current browser is in standalone mode(aka running from a desktop shortcut) or just a regular browser */
   if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log("This is running as standalone.");
    this.standalone = true;
  }
    /* Get the name of the current browser. beforeInstallPrompt isn't supported on Safari or Firefox so a Browser distinction needs to be made */
    this.browserName = this.deviceDetailsService.getBrowserName();
    this.browserName.indexOf("Safari") || this.browserName.indexOf('Firefox') != -1 ? this.unsuportedBrowser = true : this.unsuportedBrowser = false;
    console.log("Browser in A2HS: ", this.browserName)

    /*  Set a timeout to allow time for the device details service to run and store the device details */
   console.log('Desktop: ', this.isDesktop)
   setTimeout(() => {
   if (!this.isDesktop){
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeInstallPrompt triggered');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      this.addToHomeButton = true;
       });
      }
      }, 1000);
  }

  addToHomeScreen = () => {
    // hide our user interface that shows our A2HS button
    this.addToHomeButton = false;
    /* IOS safari doesn't allow an auto install prompt. A popup dialog is used to show picture
    based instrutions for a user to follow that shows them how to add to home screen */

    if (this.unsuportedBrowser) {
      console.log('Browser is Safari or Firefox');
      // Launch the dialog to show Safari or Firefox instructions
      if(this.browserName.indexOf('Safari') !== -1){
      this.dialog.open(AddToHomeSafariComponent, { maxWidth: '100vw', maxHeight: '100vh', height: '100%', width: '100%', autoFocus: false,});
      }
      if(this.browserName.indexOf('Firefox') !== -1){
        this.dialog.open(AddToHomeFirefoxComponent, { maxWidth: '100vw', maxHeight: '100vh', height: '100%', width: '100%', autoFocus: false,});
      }
       // End Open Safari
    } else {
      console.log('Browser is not Safari or Firefox');
      // Show the prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice
        .then((choiceResult: { outcome: string; }) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          this.deferredPrompt = null;
        });
    }
  }

}
