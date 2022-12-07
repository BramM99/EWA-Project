import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientPanelBaseTileComponent } from './patient-panel-base-tile.component';

describe('PatientPanelTileComponent', () => {
  let component: PatientPanelBaseTileComponent;
  let fixture: ComponentFixture<PatientPanelBaseTileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPanelBaseTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPanelBaseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
