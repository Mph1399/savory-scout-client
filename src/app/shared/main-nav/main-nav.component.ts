import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MobileBreakpointService } from '../services/mobile-breakpoints.service';
import * as AuthActions from '../../login/store/auth.actions';
import * as FirestoreSelectors from '../firestore/store/firestore.selectors';
import { getAuthState } from '../../login/store/auth.selectors'

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {


}
