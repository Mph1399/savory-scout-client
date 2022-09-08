import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 // {path: 'home', component: HomeComponent},
   { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapModule) },
  // {path: 'suggest', loadChildren: () => import('./suggest/suggest.module').then(m => m.SuggestModule)},
  // {path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  // {path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
 // { path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
