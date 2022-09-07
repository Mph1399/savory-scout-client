import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as FromApp from './store/app.reducer';
import { AuthEffects } from './login/store/auth.effects';
import { FirestoreEffects } from './shared/firestore/store/firestore.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(FromApp.appReducer),
    EffectsModule.forRoot([ AuthEffects, FirestoreEffects, ]),
    AppRoutingModule,
    ScullyLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
