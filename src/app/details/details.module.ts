import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { ReportComponent } from './report/report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

import { TextFieldModule } from '@angular/cdk/text-field';
import { CategoryTabComponent } from './category-tab/category-tab.component'
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { LocationInfoComponent } from './location-info/location-info.component';
import { SpecialsDisplayModule } from '../shared/specials-display/specials-display.module';
import { DetailsService } from './details.service';



@NgModule({
  declarations: [
    DetailsComponent, 
    ReportComponent, 
    CategoryTabComponent, 
    CategoryTabComponent, 
    HeaderComponent, 
    LocationInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatTabsModule,
    MatIconModule,
    SpecialsDisplayModule
  ],
  providers: [DetailsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsModule { }
