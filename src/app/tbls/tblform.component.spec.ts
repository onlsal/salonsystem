import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblformComponent } from './tblform.component';

describe('TblformComponent', () => {
  let component: TblformComponent;
  let fixture: ComponentFixture<TblformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
