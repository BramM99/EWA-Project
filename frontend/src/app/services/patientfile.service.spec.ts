import { TestBed } from '@angular/core/testing';

import { PatientfileService } from './patientfile.service';

describe('PatientfileService', () => {
  let service: PatientfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
