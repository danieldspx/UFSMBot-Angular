import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgreementComponent } from './dialog-agreement.component';

describe('DialogAgreementComponent', () => {
  let component: DialogAgreementComponent;
  let fixture: ComponentFixture<DialogAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
