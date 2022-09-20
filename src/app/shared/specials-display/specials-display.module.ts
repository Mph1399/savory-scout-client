import { MatIconModule } from '@angular/material/icon';
import { SpecialsDisplayComponent } from './specials-display.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [SpecialsDisplayComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule
  ],
  exports: [SpecialsDisplayComponent]
})
export class SpecialsDisplayModule { }
