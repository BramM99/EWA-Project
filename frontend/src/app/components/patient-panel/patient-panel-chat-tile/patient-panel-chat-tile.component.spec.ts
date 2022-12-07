import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientPanelChatTileComponent } from './patient-panel-chat-tile.component';

describe('PatientPanelChatTileComponent', () => {
  let component: PatientPanelChatTileComponent;
  let fixture: ComponentFixture<PatientPanelChatTileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPanelChatTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPanelChatTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
