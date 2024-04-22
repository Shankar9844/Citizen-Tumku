import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyMutationComponent } from './property-mutation.component';

describe('PropertyMutationComponent', () => {
  let component: PropertyMutationComponent;
  let fixture: ComponentFixture<PropertyMutationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyMutationComponent]
    });
    fixture = TestBed.createComponent(PropertyMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
