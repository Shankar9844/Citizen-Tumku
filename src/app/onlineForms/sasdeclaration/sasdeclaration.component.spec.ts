import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SASDeclarationComponent } from './sasdeclaration.component';

describe('SASDeclarationComponent', () => {
  let component: SASDeclarationComponent;
  let fixture: ComponentFixture<SASDeclarationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SASDeclarationComponent]
    });
    fixture = TestBed.createComponent(SASDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
