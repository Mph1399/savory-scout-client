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
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [MapComponent, InfoWindowComponent, BottomSheetComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule,
    GoogleMapsModule,
    MatCardModule,
    MatIconModule,
    SpecialsDisplayModule,
    MatBottomSheetModule
  ],
  exports: [MapComponent],
  providers: [MapService]
})
export class MapModule { }
