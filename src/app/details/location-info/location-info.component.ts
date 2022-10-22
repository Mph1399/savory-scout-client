import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';
import * as moment from 'moment';
import { Timestamp } from "firebase/firestore"
import { MatDialogRef } from '@angular/material/dialog';
import { DetailsComponent } from '../details.component';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit {
  @Input() data: Location;
  @Output() reportEvent = new EventEmitter<boolean>();
  reportLocation = false;
  date;

  constructor(
    private dialogRef: MatDialogRef<DetailsComponent>
  ) {

   }

   openReport = () =>  {
    this.reportLocation = true;
    this.reportEvent.emit(true);
   // this.dialogRef.close();
  }

  ngOnInit(): void {
        // Change the Timestamp on the location to display the last updated date
        const fieldVal = (this.data.updated_at as Timestamp);
        const timeStamp = new Timestamp(fieldVal!.seconds, fieldVal!.nanoseconds);
        const date = timeStamp.toDate()
        // console.log(date);
        // console.log(moment(date, 'ddd MMM DD YYYY HH:mm:ss ZZ').format('M/D/YYYY'))
        this.date = moment(date, 'ddd MMM DD YYYY HH:mm:ss ZZ').format('M/D/YYYY');
  }

}
