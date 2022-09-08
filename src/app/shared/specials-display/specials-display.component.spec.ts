import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialsDisplayComponent } from './specials-display.component';

describe('SpecialsDisplayComponent', () => {
  let component: SpecialsDisplayComponent;
  let fixture: ComponentFixture<SpecialsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
