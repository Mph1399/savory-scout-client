import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';
import { LocationDetailsService } from 'src/app/shared/services/location-details.service';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.scss']
})
export class InfoWindowComponent implements OnInit {
  @Input() infoContent: Location;

  constructor(private locationDetailsService: LocationDetailsService) { }

  ngOnInit(): void {
  }
  openDetails = () => {
    this.locationDetailsService.openDetails(this.infoContent);
 }
}
