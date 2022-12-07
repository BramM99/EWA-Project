import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorPatientsFilesComponent } from './doctor-patients-files.component';

describe('DoctorPatientsFilesComponent', () => {
  let component: DoctorPatientsFilesComponent;
  let fixture: ComponentFixture<DoctorPatientsFilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorPatientsFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPatientsFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
