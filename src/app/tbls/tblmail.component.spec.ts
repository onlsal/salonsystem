import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblmailComponent } from './tblmail.component';

describe('TblmailComponent', () => {
  let component: TblmailComponent;
  let fixture: ComponentFixture<TblmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
