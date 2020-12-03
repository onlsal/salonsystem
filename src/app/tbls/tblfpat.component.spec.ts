import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblfpatComponent } from './tblfpat.component';

describe('TblfpatComponent', () => {
  let component: TblfpatComponent;
  let fixture: ComponentFixture<TblfpatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblfpatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblfpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
