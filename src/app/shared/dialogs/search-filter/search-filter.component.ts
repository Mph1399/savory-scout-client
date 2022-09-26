import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import * as SearchFilterActions from '../search-filter/store/search-filter.actions';
import * as SearchFilterSelectors from '../search-filter/store/search-filter.selectors'
import { FilterValues } from '../../../shared/models/filter-values.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  filter: boolean;
  date;
  radius;
  filterValues$ = this.store.select(SearchFilterSelectors.getFilterState).subscribe(values => this.filterValues = values.filters);
  filterValues: FilterValues;

  constructor(
    private dialogRef: MatDialogRef<SearchFilterComponent>,
    formBuilder: FormBuilder,
    public store: Store
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
      breakfast: new FormControl(this.filterValues.breakfast, []),
      lunch: new FormControl(this.filterValues.lunch, []),
      dinner: new FormControl(this.filterValues.dinner, []),
      kids: new FormControl(this.filterValues.kids, []),
      date: new FormControl(moment(this.filterValues.date).format()),
      radius: new FormControl(this.filterValues.radius)
    });
   }

  ngOnInit(): void {
  }

  isDateSetToToday = (date) => {
    // see if the date matches todays date.
  return moment().format('ddd MM/DD/YYYY').toUpperCase() === moment(date).format('ddd MM/DD/YYYY').toUpperCase() ? true : false;

  }

  closeFilter = (apply, form) => {
    console.log('Filter Close Value: ', this.formGroup.value);
    console.log('Filter Close Value in Func: ', form);
    if (apply) {
      console.log('Filter Apply is ', apply);
      // Format the date to the database formatting
      form.date = moment(form.date).format('ddd MM/DD/YYYY');
      // Set active according to if the date is set to today
      form.active && !this.isDateSetToToday(form.date)? form.active = false : '';
      // Update the filteroptions observable with the new filter data
      this.store.dispatch(SearchFilterActions.SET_FILTERS({...form}));
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

ngOnDestroy(){
  this.filterValues$.unsubscribe();
}
}
