import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MailService } from 'src/app/shared/mail.service';
import { Location } from 'src/app/shared/models/location.model';
import * as SpinnerActions from '../../shared/spinner/store/spinner.actions'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  data: Location;
  public emailForm: FormGroup;
  sent = false;
  errorMessage = false;
  reportLocation = false;
  report: Subscription;

  constructor(
    private store: Store,
    private mail: MailService,
    private dialogRef: MatDialogRef<ReportComponent>,
    @Inject(MAT_DIALOG_DATA) data: Location) { 
      this.data = data;
      
    ////////////////// Initalize Form Data  ///////////
      this.emailForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        text: new FormControl('', [Validators.required, Validators.maxLength(800)]),
        phone: new FormControl()
      });
    }

  public hasError = (controlName: string, errorName: string) => {
    return this.emailForm.controls[controlName].hasError(errorName);
  }

  submitForm = (form) => {
    // reset the error message
    this.errorMessage = false;
    this.store.dispatch(SpinnerActions.SPINNER_START());
    const info = form.value;
    // console.log('info: ', info)
    // Check Honey Pot
    if (info.phone === null) {
      this.report = this.mail.sendReportForm(info.name, info.email, info.text, this.data.id, this.data.name)
      .subscribe({
        next: () => {
          form.reset();
          this.sent = true;
          this.store.dispatch(SpinnerActions.SPINNER_END());
        },
        error: (err) => {
          this.sent = false;
          this.store.dispatch(SpinnerActions.SPINNER_END());
          this.errorMessage = true;
          console.log(err);
        },
      })
    } else {
      // do nothing bc it's a bot submitting the form
      this.store.dispatch(SpinnerActions.SPINNER_END());
    }
  }

  onCancel = () => {
    this.reportLocation = false;
    this.dialogRef.close();
  }



  ngOnInit(): void {
  }

}
