import { Component, OnInit } from '@angular/core';
import { MailService } from '../shared/services/mail.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  emailForm: FormGroup;
  sent = false;
  errorMessage = false;
  menuOpen = false;
  spinner = false;
  screenWidth: any;

  constructor(
    private mail: MailService,
  ) {
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



  ngOnInit = () => {
    // check the window size and record it to screenWidth var for use in modifying content based on screen size
    this.checkWindowSize();
    window.addEventListener('resize', (event) => {
      this.checkWindowSize();
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.emailForm.controls[controlName].hasError(errorName);
  }

  checkWindowSize = () => {
    this.screenWidth = window.screen.width;
    // height = window.innerHeight;
  }

  submitForm = (form) => {
    // reset the error message
    this.errorMessage = false;
    this.spinner = true;
    const info = form.value;
    // Check the honeypot
    if (info.phone === null) {
      this.mail.sendContactForm(info.name, info.email, info.text).toPromise().then(response => {
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
