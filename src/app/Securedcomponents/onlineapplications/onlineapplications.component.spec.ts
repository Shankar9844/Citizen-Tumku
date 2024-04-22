import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineapplicationsComponent } from './onlineapplications.component';

describe('OnlineapplicationsComponent', () => {
  let component: OnlineapplicationsComponent;
  let fixture: ComponentFixture<OnlineapplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineapplicationsComponent]
    });
    fixture = TestBed.createComponent(OnlineapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
