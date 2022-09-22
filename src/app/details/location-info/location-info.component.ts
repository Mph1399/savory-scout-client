import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';
import * as moment from 'moment';
import { Timestamp, serverTimestamp } from "firebase/firestore"

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit {
  @Input() data: Location;
  reportLocation = false;
  date;

  constructor() {

   }

   openReport = () =>  {
    this.reportLocation = true;
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
