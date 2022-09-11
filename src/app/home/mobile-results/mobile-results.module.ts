import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileResultsComponent } from './mobile-results.component';
import { SpecialsDisplayModule } from 'src/app/shared/specials-display/specials-display.module';



@NgModule({
  declarations: [MobileResultsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    IvyCarouselModule,
    SpecialsDisplayModule
  ],
  exports: [MobileResultsComponent]
})
export class MobileResultsModule { }
