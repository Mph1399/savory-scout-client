import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { MatCardModule } from '@angular/material/card';
import { PrivacyRoutingModule } from './privacy-routing.module';



@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    MatCardModule,
    PrivacyRoutingModule
  ]
})
export class PrivacyModule { }
