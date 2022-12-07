import { Component, OnInit } from '@angular/core';
import {PatientFile} from '../../../models/PatientFile';
import {PatientfileService} from '../../../services/patientfile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../../services/auth.service/token-storage.service';
import {TempAccount} from '../../../models/TempAccount';

@Component({
  selector: 'app-doctor-patients-add',
  templateUrl: './doctor-patients-add.component.html',
  styleUrls: ['./doctor-patients-add.component.css']
})
export class DoctorPatientsAddComponent implements OnInit {
  public patientFile: PatientFile;

  constructor(public patientfileService: PatientfileService,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService) {
  }

  protected childParamsSubscription: Subscription = null;

  ngOnInit(): void {
    this.patientFile = new PatientFile(0, '', '', '', '', '', null, this.tokenStorageService.getUser(), new TempAccount(0, '', '', ''));
  }

  public saveClicked(): void {
    this.patientfileService.addNewPatientFile(this.patientFile);
    this.router.navigateByUrl('/patients');
  }
}
