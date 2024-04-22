import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmulgamationComponent } from './amulgamation.component';

describe('AmulgamationComponent', () => {
  let component: AmulgamationComponent;
  let fixture: ComponentFixture<AmulgamationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmulgamationComponent]
    });
    fixture = TestBed.createComponent(AmulgamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
