import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblcalComponent } from './tblcal.component';

describe('TblcalComponent', () => {
  let component: TblcalComponent;
  let fixture: ComponentFixture<TblcalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblcalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblcalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
