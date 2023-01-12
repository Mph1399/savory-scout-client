import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-home-firefox',
  templateUrl: './add-to-home-firefox.component.html',
  styleUrls: ['./add-to-home-firefox.component.scss']
})
export class AddToHomeFirefoxComponent  {

  constructor(
    private dialogRef: MatDialogRef<AddToHomeFirefoxComponent>,
  ) {
    document.getElementById('title')?.scrollIntoView()
   }

  cancel = () => {
    this.dialogRef.close();
  }

}
