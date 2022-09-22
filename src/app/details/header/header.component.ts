import { Component, Input } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() data: Location;

  constructor() { }

}
