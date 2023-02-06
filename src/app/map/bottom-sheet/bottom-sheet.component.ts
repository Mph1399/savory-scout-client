import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { LocationDetailsService } from 'src/app/shared/services/location-details.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent  {

  constructor(
    private bottomSheet: MatBottomSheet,
    private locationDetailsService: LocationDetailsService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  openDetails = () => {
    this.locationDetailsService.openDetails(this.data.location);
 }
 close = () => {
  this.bottomSheet.dismiss();
 }

}
