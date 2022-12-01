import { MatIconModule } from '@angular/material/icon';
import { SpecialsDisplayComponent } from './specials-display.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [SpecialsDisplayComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule
  ],
  exports: [SpecialsDisplayComponent],
})
export class SpecialsDisplayModule { }
