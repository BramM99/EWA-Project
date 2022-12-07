import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientPanelPatientinfoTileComponent } from './patient-panel-patientinfo-tile.component';

describe('PatientPanelInfoTileComponent', () => {
  let component: PatientPanelPatientinfoTileComponent;
  let fixture: ComponentFixture<PatientPanelPatientinfoTileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPanelPatientinfoTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPanelPatientinfoTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
