
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SuggestComponent } from './suggest.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TextFieldModule } from '@angular/cdk/text-field';
import { SuggestRoutingModule } from './suggest-routing.module';



@NgModule({
  declarations: [ SuggestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    TextFieldModule,
    MatInputModule,
    SuggestRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SuggestModule { }
