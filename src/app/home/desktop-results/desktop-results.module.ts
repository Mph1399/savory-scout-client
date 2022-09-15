import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DesktopResultsComponent } from './desktop-results.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DesktopResultsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [DesktopResultsComponent]
})
export class DesktopResultsModule { }
