import { SearchComponent } from './../dialogs/search/search.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MobileBreakpointService } from '../services/mobile-breakpoints.service';
import * as AuthActions from '../../login/store/auth.actions';
import * as FirestoreSelectors from '../firestore/store/firestore.selectors';
import { getAuthState } from '../../login/store/auth.selectors';
import { MatDialog} from '@angular/material/dialog';
import { SearchFilterComponent } from '../dialogs/search-filter/search-filter.component';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  @ViewChild('drawer') drawer: MatSidenav;
  isHandset$!: Observable<boolean>;
  location$ = this.store.select(FirestoreSelectors.getLocationsState)
  auth$ = this.store.select(getAuthState)

  constructor(
    private mobileBreakpointService: MobileBreakpointService, 
    private store: Store,
    public router: Router,
    private matDialog: MatDialog) {
    
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

  openFilter = () => {
    this.matDialog.open(SearchFilterComponent);
  }

  closeSidenav = () => {
    this.drawer.close();
  }

  openSearch = () => {
    this.matDialog.open(SearchComponent, {panelClass: 'myapp-no-padding-dialog', width: '300px'})
  }
}
