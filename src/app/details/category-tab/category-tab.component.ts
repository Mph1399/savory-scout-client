import { Day } from './../../shared/models/day.model';
import { Component, Input, OnInit } from '@angular/core';
import { SpecialObject } from 'src/app/shared/models/specialObject.model';
import { CategoryDetails } from '../details.service';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss']
})
export class CategoryTabComponent implements OnInit {
  @Input() specials: SpecialObject
  @Input() details: CategoryDetails;
  @Input() type: string;

  constructor(

  ) { }

  ngOnInit(): void {
    console.log('details: ', this.details)
  }

}

