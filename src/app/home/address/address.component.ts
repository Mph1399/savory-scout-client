import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() address: string;
  address1: string;
  address2: string;

  ngOnInit(): void {
   const index = this.address.indexOf(',');
   this.address1 = this.address.slice(0, index);
   this.address2 = this.address.slice(index + 2, this.address.length)
  }

}
