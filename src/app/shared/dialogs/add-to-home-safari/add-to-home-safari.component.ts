import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-home-safari',
  templateUrl: './add-to-home-safari.component.html',
  styleUrls: ['./add-to-home-safari.component.scss'],
})
export class AddToHomeSafariComponent {

  constructor(
    private dialogRef: MatDialogRef<AddToHomeSafariComponent>,
  ) {}

  cancel = () => {
    this.dialogRef.close();
  }

}
