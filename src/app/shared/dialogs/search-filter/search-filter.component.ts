import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { SearchFilterService } from 'src/services/search-filter.service';
import { FilterValues } from 'src/models/filter-values.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  formGroup: FormGroup;
  filter: boolean;
  date;
  radius;
  filterValues$ = this.searchFilterService.filterValues$.subscribe(values => this.filterValues = values);
  filterValues: FilterValues;

  constructor(
    private dialogRef: MatDialogRef<SearchFilterComponent>,
    formBuilder: FormBuilder,
    public searchFilterService: SearchFilterService,
    ) {
      this.radius = this.filterValues.radius;
      this.date = moment(this.filterValues.date).format();
   // @Inject(MAT_DIALOG_DATA) data,
      this.formGroup = formBuilder.group({
      active: new FormControl(this.filterValues.active, []),
      food: new FormControl(this.filterValues.food, []),
      drinks: new FormControl(this.filterValues.drinks, []),
      events: new FormControl(this.filterValues.events, []),
      outdoor: new FormControl(this.filterValues.outdoor, []),
      happyHour: new FormControl(this.filterValues.happyHour, []),
      brunch: new FormControl(this.filterValues.brunch, []),
      kids: new FormControl(this.filterValues.kids, []),
      date: new FormControl(moment(this.filterValues.date).format()),
      radius: new FormControl(this.filterValues.radius)
    });
   }

  ngOnInit(): void {
  }

  setActive = (date) => {
    // see if the date matches todays date.
    moment().format('ddd MM/DD/YYYY').toUpperCase() !== moment(date).format('ddd MM/DD/YYYY').toUpperCase() ? false : true;
  }

  closeFilter = (apply, form) => {
    console.log('Filter Close Value: ', this.formGroup.value);
    console.log('Filter Close Value in Func: ', form);
    if (apply) {
      console.log('Filter Apply is ', apply);
      // Format the date to the database formatting
      form.date = moment(form.date).format('ddd MM/DD/YYYY');
      // Set active according to if the date is set to today
      form.active = this.setActive(form.date);
      // Update the filteroptions observable with the new filter data
      this.searchFilterService.triggerNextFilterValues(form);
    }
     //
    this.dialogRef.close();
  }


reset = () => {
  console.log('resetting');
  this.formGroup.reset();
  this.radius = this.filterValues.radius;
  this.date = new Date();
}
}
