import { MapComponent } from './map.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ],
  exports: [RouterModule]
})
export class MapRoutingModule { }
