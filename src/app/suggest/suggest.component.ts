import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { MailService } from '../shared/services/mail.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss']
})
export class SuggestComponent  {
  sent = false;
  errorMessage = false;
  spinner = false;
  screenWidth: any;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  emailForm: FormGroup;


  constructor(private mail: MailService) {
    this.emailForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      location: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      type: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      text: new FormControl('', [Validators.required, Validators.maxLength(800)]),
      phone: new FormControl('')
    });
  }
 
  hasError = (controlName: string, errorName: string) => {
    return this.emailForm.controls[controlName].hasError(errorName);
  }


  submitForm = (form) => {
    // scroll to the top
    document.getElementById('title')!.scrollIntoView();
    // reset the error message
    this.errorMessage = false;
    this.spinner = true;
    const info = form.value;
    // Check the Honeypot
    if (info.phone === null) {
      this.mail.sendSuggestForm(info.name, info.location, info.type, info.text, info.email).toPromise().then(response => {
        form.reset();
        this.sent = true;
        this.spinner = false;
        console.log(response);
      }).catch(err => {
        this.sent = false;
        this.spinner = false;
        this.errorMessage = true;
        console.log(err);
      });
    } else {
      // do nothing bc it's a bot submitting the form
    }
  }
}
