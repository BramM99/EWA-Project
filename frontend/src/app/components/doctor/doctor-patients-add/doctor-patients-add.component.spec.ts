import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientsAddComponent } from './doctor-patients-add.component';

describe('DoctorPatientsAddComponent', () => {
  let component: DoctorPatientsAddComponent;
  let fixture: ComponentFixture<DoctorPatientsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPatientsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPatientsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
