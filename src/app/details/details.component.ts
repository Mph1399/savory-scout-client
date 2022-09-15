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
//   public emailForm: FormGroup;
//   location;
//   navData;
//   segment = 'active';
//   foodDays = [];
//   drinksDays = [];
//   eventsDays = [];
//   date;
//   managed;
//   selectedDay;
//   isMobile = false;
//   reportLocation = false;
//   isDesktop = false;
//   errorMessage = false;
//   spinner = false;
//   sent = false;
//   data;
//   categories = [
//   {category: 'food', days: this.foodDays},
//   {category: 'drinks', days: this.drinksDays},
//   {category: 'events', days: this.eventsDays}
// ];
//   constructor(
//     private locationDetailsService: LocationDetailsService,
//     private mail: MailService,
//     @Inject(MAT_DIALOG_DATA) data,
//     private zone: NgZone
//   ) {
//     console.log('Running constructor!');
//     // store the incoming info from the data injection to a global var.
//     this.data = data;

//     this.date = new FormControl(new Date());
//     // this.data = this.searchStorageService.getLocation();
//     this.zone.run(() => {
//       console.log('Data sent to dialog: ', this.data);
//     });
//     // the location data is sent to this dialog via this.data
//     // filter it to show active specials
//     // tslint:disable-next-line:max-line-length
//     // const filteredLocation = this.searchFilterService.locationFilter(this.data, true, true, true, true, this.date.value, false, false, false, false);
//     // set the location var equal to the filtered location
//     // this.location = filteredLocation.location;
//     // create the final object for each category. This shows which specials to display
//     this.foodDays  = this.locationDetailsService.displayDays('food', this.data);
//     this.drinksDays  = this.locationDetailsService.displayDays('drinks', this.data);
//     this.eventsDays   = this.locationDetailsService.displayDays('events', this.data);
//     console.log('FOOD DAYS: ', this.foodDays);
//     // set the categories array to include the finished category object for display
//     this.categories[0].days = this.foodDays;
//     this.categories[1].days = this.drinksDays;
//     console.log('Drinks DAYS: ', this.drinksDays);
//     this.categories[2].days = this.eventsDays;
//     // console.log("Categories: ", this.categories);

//     // Change the Timestamp on the location to display the last updated date
//     this.date = this.data.updated_at.toDate();
//     // console.log(this.date);
//     this.date = moment(this.date, 'ddd MM DD YYYY mm:ss:SS').format('MMM DD, YYYY');
//     // Take the "managed" bool from the location and set to yes or no
//     if (this.data.managed) {
//       this.managed = 'Yes';
//     } else {
//       this.managed = 'No';
//     }
//     ////////////////// Initalize Form Data  ///////////
//     this.emailForm = new FormGroup({
//       name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
//       email: new FormControl('', Validators.compose([
//         Validators.required,
//         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
//       ])),
//       text: new FormControl('', [Validators.required, Validators.maxLength(800)]),
//       phone: new FormControl()
//     });
//    // this.isDesktop = this.deviceService.isDesktop();
//   }

//   openReport = () =>  {
//     this.reportLocation = true;
//   }
//   submitForm = (form) => {
//     // reset the error message
//     this.errorMessage = false;
//     this.spinner = true;
//     const info = form.value;
//     // console.log('info: ', info)
//     // Check Honey Pot
//     if (info.phone === null) {
//       this.mail.sendReportForm(info.name, info.email, info.text, this.data.id, this.data.name).toPromise().then(response => {
//         form.reset();
//         this.sent = true;
//         this.spinner = false;
//         // console.log(response);
//       }).catch(err => {
//         this.sent = false;
//         this.spinner = false;
//         this.errorMessage = true;
//         // console.log(err);
//       });
//     } else {
//       // do nothing bc it's a bot submitting the form
//     }
//   }
//   onCancel = () => {
//     this.reportLocation = false;
//   }
//   public hasError = (controlName: string, errorName: string) => {
//     return this.emailForm.controls[controlName].hasError(errorName);
//   }

//   // When the segment value is changed, update the segment variable so that the displayed content can be shown accordingly
//   segmentChanged = (segment) => {
//     this.segment = segment;

//     // set the default selected day when the segment tab is changed
//     switch (segment) {
//       case 'food':
//         try {
//           this.selectedDay = this.foodDays[0].day;
//         } catch (e) {}
//         break;
//       case 'drinks':
//         try {
//           this.selectedDay = this.drinksDays[0].day;
//         } catch (e) {}
//         break;
//       case 'events':
//         try {
//           this.selectedDay = this.eventsDays[0].day;
//         } catch (e) {}
//         break;

//       default:
//         break;
//     }
//   }

//   dayChanged = (day) => {
//     this.selectedDay = day;
//   }
//   toggleSection = (category, i) => {
//     // Toggle the day list item from open to close
//     switch (category) {
//       case 'food':
//         this.foodDays[i].open = !this.foodDays[i].open;
//         break;
//       case 'drinks':
//         this.drinksDays[i].open = !this.drinksDays[i].open;
//         break;
//       case 'events':
//         this.eventsDays[i].open = !this.eventsDays[i].open;
//         break;
//     }
//   }
}
