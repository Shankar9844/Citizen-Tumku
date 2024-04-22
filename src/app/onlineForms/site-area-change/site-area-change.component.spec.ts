import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAreaChangeComponent } from './site-area-change.component';

describe('SiteAreaChangeComponent', () => {
  let component: SiteAreaChangeComponent;
  let fixture: ComponentFixture<SiteAreaChangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteAreaChangeComponent]
    });
    fixture = TestBed.createComponent(SiteAreaChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
