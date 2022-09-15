import { DesktopResultsModule } from './desktop-results/desktop-results.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    DesktopResultsModule
  ],
  exports: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
