import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorPatientsOverviewComponent } from './doctor-patients-overview.component';

describe('DoctorPatientsOverviewComponent', () => {
  let component: DoctorPatientsOverviewComponent;
  let fixture: ComponentFixture<DoctorPatientsOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorPatientsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPatientsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
