import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as FromApp from './store/app.reducer';
import { AuthEffects } from './login/store/auth.effects';
import { FirestoreEffects } from './shared/firestore/store/firestore.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from './shared/shared.module';
import { SpecialsDisplayComponent } from './shared/specials-display/specials-display.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(FromApp.appReducer),
    EffectsModule.forRoot([ AuthEffects, FirestoreEffects, ]),
    SharedModule,
    AppRoutingModule,
    ScullyLibModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
