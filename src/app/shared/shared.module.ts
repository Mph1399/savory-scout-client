import { SearchFilterComponent } from './dialogs/search-filter/search-filter.component';
import { DisplayLocationsService } from './services/display-locations.service';
import { MatCardModule } from '@angular/material/card';
import { FirestoreService } from './firestore/firestore.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from './spinner/spinner.component';
import { AddToHomeSafariComponent } from './dialogs/add-to-home-safari/add-to-home-safari.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';

import { CitySelectComponent } from './city-select/city-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [SpinnerComponent, AddToHomeSafariComponent, CitySelectComponent, SearchFilterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule
    
  ],
  providers: [FirestoreService, DisplayLocationsService],
  exports: [SpinnerComponent, CitySelectComponent, SearchFilterComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
