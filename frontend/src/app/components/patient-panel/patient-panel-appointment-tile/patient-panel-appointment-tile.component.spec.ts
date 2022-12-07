import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientPanelAppointmentTileComponent } from './patient-panel-appointment-tile.component';

describe('PatientPanelAppointmentTileComponent', () => {
  let component: PatientPanelAppointmentTileComponent;
  let fixture: ComponentFixture<PatientPanelAppointmentTileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPanelAppointmentTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPanelAppointmentTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
