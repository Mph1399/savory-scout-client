import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import { NgZone } from '@angular/core';
// import { LocationDetailsService } from 'src/services/location-details.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { MailService } from 'src/services/mail.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

   constructor(
//     private locationDetailsService: LocationDetailsService,
//     private mail: MailService,
     @Inject(MAT_DIALOG_DATA) data,
//     private zone: NgZone
   ) {}

}
