import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PatientFile} from '../../../models/PatientFile';
import {PatientfileService} from '../../../services/patientfile.service';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-doctor-patients-files',
    templateUrl: './doctor-patients-files.component.html',
    styleUrls: ['./doctor-patients-files.component.css']
})
export class DoctorPatientsFilesComponent implements OnInit {
    public currentPatientFile: PatientFile;
    public copyPatientFile: PatientFile;
    public readOnlyBoolean = true;

    constructor(public patientfileService: PatientfileService,
                protected router: Router,
                protected activatedRoute: ActivatedRoute) {
    }

    protected childParamsSubscription: Subscription = null;

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.setAndCopyPatientfile(+params.id);
        });
    }

    public setAndCopyPatientfile(id: number): void {
        this.patientfileService.findById(id).subscribe(file => {
            console.log(file);
            this.currentPatientFile = file;
            this.copyPatientFile = this.currentPatientFile;
        });
    }

    public editClicked(): void {
        if (this.readOnlyBoolean === true) {
            this.readOnlyBoolean = false;
        } else if (this.readOnlyBoolean === false) {
            this.readOnlyBoolean = true;
        }
    }

    public cancelClicked(): void {
        Object.assign(this.currentPatientFile, this.copyPatientFile);
        this.editClicked();
    }

    public saveClicked(): void {
        this.patientfileService.editNewPatientFile(this.currentPatientFile);
        this.copyPatientFile = this.patientfileService.copyPatientFile(this.currentPatientFile);
        this.editClicked();
    }

    public removeClicked(): void {
        this.patientfileService.deleteNewPatientFile(this.currentPatientFile);
        alert('Succesvol verwijderd!');
        this.router.navigateByUrl('/patients');
    }
}
