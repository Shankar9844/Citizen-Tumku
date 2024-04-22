import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPropertyRegistrationComponent } from './new-property-registration.component';

describe('NewPropertyRegistrationComponent', () => {
  let component: NewPropertyRegistrationComponent;
  let fixture: ComponentFixture<NewPropertyRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPropertyRegistrationComponent]
    });
    fixture = TestBed.createComponent(NewPropertyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
