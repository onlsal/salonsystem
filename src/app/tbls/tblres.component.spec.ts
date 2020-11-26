import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblresComponent } from './tblres.component';

describe('TblresComponent', () => {
  let component: TblresComponent;
  let fixture: ComponentFixture<TblresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
