import { AddToHomeSafariComponent } from '../dialogs/add-to-home-safari/add-to-home-safari.component';
import { MatDialog , MatDialogConfig} from '@angular/material/dialog';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-add-to-home',
  templateUrl: './add-to-home.component.html',
  styleUrls: ['./add-to-home.component.scss']
})
export class AddToHomeComponent implements OnInit {
  deferredPrompt: any;
  addToHomeButton = false;
  isDesktop = false;
  isSafari = false;

     // Add to home screen button
  //  @HostListener('window:beforeinstallprompt', ['$event'])
  //    onbeforeinstallprompt(e) {
  //      console.log(e);
  //      // Prevent Chrome 67 and earlier from automatically showing the prompt
  //      e.preventDefault();
  //      // Stash the event so it can be triggered later.
  //      this.deferredPrompt = e;
  //      this.addToHomeButton = true;
  //      console.log('On Before Install Fired');
  //    }
       // End Add to Home Button


  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  // check if the device is mobile or desktop and set the isDesktopDevice boolean.
   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) ? this.isDesktop = false : this.isDesktop = true;

   window.navigator.userAgent.indexOf("Safari") != -1 ? this.isSafari = true : this.isSafari = false;

    /*  Set a timeout to allow time for the search or map page onInits to run and store the device details
    into the device details service. */
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
      }, 500);
}

  addToHomeScreen = () => {
    console.log(this.deferredPrompt);
    // hide our user interface that shows our A2HS button
    this.addToHomeButton = false;
    /* IOS safari doesn't allow an auto install prompt. A popup dialog is used to show picture
    based instrutions for a user to follow that shows them how to add to home screen */

    if (this.isSafari) {
      console.log('Browser is Safari');
      // Launch the dialog to show Safari instructions

     // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);
      console.log('Standalone mode: ', isInStandaloneMode);
      if (!isInStandaloneMode) {
        this.dialog.open(AddToHomeSafariComponent, { maxWidth: '100vw', maxHeight: '100vh', height: '100%', width: '100%'});
      } // End Open Safari
    } else {
      console.log('Browser is not Safari');
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
