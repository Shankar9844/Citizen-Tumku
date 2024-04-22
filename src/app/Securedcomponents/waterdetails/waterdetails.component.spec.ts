import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterdetailsComponent } from './waterdetails.component';

describe('WaterdetailsComponent', () => {
  let component: WaterdetailsComponent;
  let fixture: ComponentFixture<WaterdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterdetailsComponent]
    });
    fixture = TestBed.createComponent(WaterdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
