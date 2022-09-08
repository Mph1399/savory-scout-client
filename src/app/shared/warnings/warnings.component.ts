// import { SearchFilterService } from './../../../services/search-filter.service';
// import { Component, Input, OnInit } from '@angular/core';
// import { FilteredLocationsPackage } from 'src/models/filtered-locations-package.model';
// import { fromEvent, merge, Observable, Observer } from 'rxjs';
// import { RestaurantService } from 'src/services/restaurant.service';
// import { FilterValues } from 'src/models/filter-values.model';
// import { map } from 'rxjs/operators';


// @Component({
//   selector: 'app-warnings',
//   templateUrl: './warnings.component.html',
//   styleUrls: ['./warnings.component.scss']
// })
// export class WarningsComponent implements OnInit {
// @Input() filterValues: FilterValues;
// @Input() filteredLocations$: Observable<FilteredLocationsPackage>;
// connectionStatus;

//   constructor(
//     public restaurantService: RestaurantService,
//     public searchFilterService: SearchFilterService
//   ) { }

//   ngOnInit(): void {
//     this.createOnline$().subscribe(isOnline => {
//       isOnline ? this.connectionStatus = 'ONLINE' : this.connectionStatus = 'OFFLINE';
//       console.log('Connection Status: ', this.connectionStatus);
//     });
//   }

//   createOnline$ = () => {
//     return merge<boolean>(
//       fromEvent(window, 'offline').pipe(map(() => false)),
//       fromEvent(window, 'online').pipe(map(() => true)),
//       new Observable((sub: Observer<boolean>) => {
//       sub.next(navigator.onLine);
//       sub.complete();
//       }));
//     }

// }
