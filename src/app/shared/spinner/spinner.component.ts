import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer'

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent  {
  @Input() message: string = '';
  displaySpinner = false;

  spinnerState$ = this.store.pipe(select(state => state.spinner.isOn))
  constructor(private store: Store<AppState>) { }



}
