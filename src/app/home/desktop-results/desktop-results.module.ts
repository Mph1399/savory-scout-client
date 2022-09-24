import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DesktopResultsComponent } from './desktop-results.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialsDisplayModule } from 'src/app/shared/specials-display/specials-display.module';

@NgModule({
  declarations: [DesktopResultsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    SpecialsDisplayModule,
  ],
  exports: [DesktopResultsComponent]
})
export class DesktopResultsModule { }
