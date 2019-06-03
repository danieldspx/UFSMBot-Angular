import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccountDetailsComponent } from './dialog-account-details.component';

describe('DialogAccountDetailsComponent', () => {
  let component: DialogAccountDetailsComponent;
  let fixture: ComponentFixture<DialogAccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAccountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
