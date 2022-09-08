import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-home-safari',
  templateUrl: './add-to-home-safari.component.html',
  styleUrls: ['./add-to-home-safari.component.scss'],
})
export class AddToHomeSafariComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddToHomeSafariComponent>,
  ) { }

  ngOnInit(): void {
  }

  cancel = () => {
    this.dialogRef.close();
  }

  add = () => {
   // this.router.navigateByUrl('/register-multi-locations');
   console.log('This needs to be sorted out');
  }

}
