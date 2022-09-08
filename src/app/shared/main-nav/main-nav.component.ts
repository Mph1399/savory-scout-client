import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MobileBreakpointService } from '../services/mobile-breakpoints.service';
import * as AuthActions from '../../login/store/auth.actions';
import * as FirestoreSelectors from '../firestore/store/firestore.selectors';
import { getAuthState } from '../../login/store/auth.selectors';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  isHandset$!: Observable<boolean>;
  location$ = this.store.select(FirestoreSelectors.getLocationsState)
  auth$ = this.store.select(getAuthState)

  constructor(
    private mobileBreakpointService: MobileBreakpointService, 
    private store: Store,
    public router: Router) {
    
    // subscribe to the User store
  }

  ngOnInit(){
    this.isHandset$ = this.mobileBreakpointService.isHandset$;
  }

  cancelClick(ev: MouseEvent) {
    ev.stopPropagation();
  }

  logout = () => {
   this.store.dispatch(AuthActions.LOGOUT())
  }

}
