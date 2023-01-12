import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToHomeComponent } from './add-to-home.component';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    AddToHomeComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [AddToHomeComponent]
})
export class AddToHomeModule { }
