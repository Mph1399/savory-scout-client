import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Day } from '../shared/models/day.model';

// import { LocationDetailsService } from 'src/services/location-details.service';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '../shared/models/location.model';
import { CategoryDetails, DetailsService } from './details.service';
//import { MailService } from 'src/services/mail.service';
import * as FilterSelectors from '../shared/dialogs/search-filter/store/search-filter.selectors'
import { Store } from '@ngrx/store';
import { ReportComponent } from './report/report.component';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
   data: Location;
   categoryDetails: CategoryDetails[] = [];
   filters$ = this.store.select(FilterSelectors.getFilterState);

   constructor(
      private store: Store,
      private dialog: MatDialog,
//     private locationDetailsService: LocationDetailsService,
//     private mail: MailService,
     private detailsService: DetailsService,
     @Inject(MAT_DIALOG_DATA) data: Location,
//     private zone: NgZone
   ) {
      this.data = data;
      console.log("Data: ", data)
   }

   ngOnInit(){
      this.categoryDetails.push( {category: 'food', days: this.detailsService.displayDays('food', this.data['food'])});
      this.categoryDetails.push( {category: 'drinks', days: this.detailsService.displayDays('drinks', this.data['drinks'])});
      this.categoryDetails.push( {category: 'events', days: this.detailsService.displayDays('events', this.data['events'])});

}
openReportForm = () => {
   console.log(this.data)
   this.dialog.open(ReportComponent, {width: '330px',
   height: '400px',
   data: this.data
   })
}
}

