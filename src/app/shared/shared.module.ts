import { FirestoreService } from './firestore/firestore.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
  ],
  providers: [FirestoreService],
  exports: [SpinnerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
