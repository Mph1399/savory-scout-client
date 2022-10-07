import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatDialog } from '@angular/material/dialog';
import { AddToHomeSafariComponent } from '../dialogs/add-to-home-safari/add-to-home-safari.component';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private platform: Platform,
    private dialog: MatDialog,
  ) { }

  // tslint:disable-next-line:typedef
  public initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      // tslint:disable-next-line:no-string-literal
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  // tslint:disable-next-line:typedef
  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => this.dialog.open(AddToHomeSafariComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      })
      );
  }
}
