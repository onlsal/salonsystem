import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblmemComponent } from './tblmem.component';

describe('TblmemComponent', () => {
  let component: TblmemComponent;
  let fixture: ComponentFixture<TblmemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblmemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblmemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
