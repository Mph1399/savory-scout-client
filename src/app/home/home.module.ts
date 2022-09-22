import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';
import { MatCardModule } from '@angular/material/card';
import { DesktopResultsComponent } from './desktop-results/desktop-results.component';
 import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MobileResultsComponent } from './mobile-results/mobile-results.component';
import { SpecialsDisplayModule } from '../shared/specials-display/specials-display.module';


@NgModule({
  declarations: [
    HomeComponent,
    DesktopResultsComponent,
    MobileResultsComponent],

  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MatCardModule,
    IvyCarouselModule,
    SpecialsDisplayModule

  ],
  exports: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
