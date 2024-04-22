import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UgddetailsComponent } from './ugddetails.component';

describe('UgddetailsComponent', () => {
  let component: UgddetailsComponent;
  let fixture: ComponentFixture<UgddetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UgddetailsComponent]
    });
    fixture = TestBed.createComponent(UgddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
