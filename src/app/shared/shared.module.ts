import { MatCardModule } from '@angular/material/card';
import { FirestoreService } from './firestore/firestore.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from './spinner/spinner.component';
import { AddToHomeSafariComponent } from './dialogs/add-to-home-safari/add-to-home-safari.component';
import {  MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [SpinnerComponent, AddToHomeSafariComponent,],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [FirestoreService],
  exports: [SpinnerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
