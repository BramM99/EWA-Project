import {Component, OnInit} from '@angular/core';
import {PatientfileService} from '../../../services/patientfile.service';
import {PatientFile} from '../../../models/PatientFile';
import {PatientPanelBaseTileComponent} from '../patient-panel-tile/patient-panel-base-tile.component';

@Component({
    selector: 'app-patient-panel-info-tile',
    templateUrl: './patient-panel-info-tile.component.html',
    styleUrls: ['./patient-panel-info-tile.component.css']
})
export class PatientPanelPatientinfoTileComponent extends PatientPanelBaseTileComponent implements OnInit {

    patientFile: PatientFile;

    constructor(readonly userService: PatientfileService) {
        super();
    }

    ngOnInit(): void {
        // TODO replace with proper ID by e.g. using getPatientFile
        this.userService.getPatients().subscribe(patients => {
            console.log(patients.length);
            if (patients.length !== 0) {
                this.patientFile = patients[0];
            }
        });
    }

    getFancyName(): string {
        return this.patientFile.user.firstname.concat(' ', this.patientFile.user.lastname);
    }

    getFancyBirthString(): string {
        return this.patientFile.birthdate;
    }
}
