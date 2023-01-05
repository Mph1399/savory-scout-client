import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { LocationDetailsService } from 'src/app/shared/services/location-details.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  constructor(
    private locationDetailsService: LocationDetailsService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }


  ngOnInit(): void {
  }

  openDetails = () => {
    this.locationDetailsService.openDetails(this.data.location);
 }
}
