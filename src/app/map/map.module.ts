import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { SharedModule } from '../shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapRoutingModule } from './map-routing.module';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
  ],
  exports: [MapComponent]
})
export class MapModule { }
