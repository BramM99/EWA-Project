import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientsLinkComponent } from './doctor-patients-link.component';

describe('DoctorPatientsLinkComponent', () => {
  let component: DoctorPatientsLinkComponent;
  let fixture: ComponentFixture<DoctorPatientsLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPatientsLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPatientsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
