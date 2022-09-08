import { MatIconModule } from '@angular/material/icon';
import { SpecialsDisplayComponent } from './specials-display.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [SpecialsDisplayComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [SpecialsDisplayComponent]
})
export class SpecialsDisplayModule { }
