import { Component, OnInit } from '@angular/core';
import {PatientfileService} from '../../../services/patientfile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientFile} from '../../../models/PatientFile';
import {User} from '../../../models/user';
import {TokenStorageService} from '../../../services/auth.service/token-storage.service';

@Component({
  selector: 'app-doctor-patients-link',
  templateUrl: './doctor-patients-link.component.html',
  styleUrls: ['./doctor-patients-link.component.css']
})
export class DoctorPatientsLinkComponent implements OnInit {
  constructor(public patientFileService: PatientfileService,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              private tokens: TokenStorageService) {
  }

  public filter = '';
  public patientFiles: PatientFile[];
  public shownPatientFiles: PatientFile[];

  public currentPatient: PatientFile;

  ngOnInit(): void {
    this.patientFileService.getUnlinkedPatients().subscribe(patients => {
      console.log(patients);
      this.patientFiles = patients.filter(patient => patient.user.id !== this.tokens.getUser().id);
      console.log(patients);
      this.shownPatientFiles = this.patientFiles;
    });
  }

  public linkClicked(): void {
    console.log(new Date(), 'Updating user...');
    this.patientFileService.updateDoctorReference(this.currentPatient, User.clone(this.tokens.getUser()));
    this.router.navigate(['/patient-menu']);
  }

  public setCurrentPatient(patientFile: PatientFile): void {
    this.currentPatient = patientFile;
  }

}
