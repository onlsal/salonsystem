import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblpayComponent } from './tblpay.component';

describe('TblpayComponent', () => {
  let component: TblpayComponent;
  let fixture: ComponentFixture<TblpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
