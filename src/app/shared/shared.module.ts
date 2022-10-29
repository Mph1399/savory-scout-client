import { MatSelectModule } from '@angular/material/select';
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
import { AddressComponent } from './location/address/address.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { CitySelectService } from './city-select/city-select.service';
import { GoogleService } from './services/google.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocationDetailsService } from './services/location-details.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './dialogs/search/search.component';


@NgModule({
  declarations: [SpinnerComponent, AddToHomeSafariComponent, CitySelectComponent, SearchFilterComponent, AddressComponent, SnackbarComponent, SearchComponent],
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
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
    
  ],
  providers: [FirestoreService, DisplayLocationsService, CitySelectService, GoogleService, LocationDetailsService],
  exports: [SpinnerComponent, CitySelectComponent, SearchFilterComponent, AddressComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
