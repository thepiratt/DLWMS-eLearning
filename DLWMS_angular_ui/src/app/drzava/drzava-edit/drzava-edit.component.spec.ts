import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrzavaEditComponent } from './drzava-edit.component';

describe('DrzavaEditComponent', () => {
  let component: DrzavaEditComponent;
  let fixture: ComponentFixture<DrzavaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrzavaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrzavaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
