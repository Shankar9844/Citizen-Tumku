import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAssessedpropoertyComponent } from './un-assessedpropoerty.component';

describe('UnAssessedpropoertyComponent', () => {
  let component: UnAssessedpropoertyComponent;
  let fixture: ComponentFixture<UnAssessedpropoertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnAssessedpropoertyComponent]
    });
    fixture = TestBed.createComponent(UnAssessedpropoertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
