import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodiComponent } from './podi.component';

describe('PodiComponent', () => {
  let component: PodiComponent;
  let fixture: ComponentFixture<PodiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PodiComponent]
    });
    fixture = TestBed.createComponent(PodiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
