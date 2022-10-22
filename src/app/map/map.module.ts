import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { SharedModule } from '../shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapRoutingModule } from './map-routing.module';
import { MapService } from './map.service';
import { InfoWindowComponent } from './info-window/info-window.component';
import { MatCardModule } from '@angular/material/card';
import { SpecialsDisplayModule } from '../shared/specials-display/specials-display.module';



@NgModule({
  declarations: [MapComponent, InfoWindowComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule,
    GoogleMapsModule,
    MatCardModule,
    SpecialsDisplayModule
  ],
  exports: [MapComponent],
  providers: [MapService]
})
export class MapModule { }
