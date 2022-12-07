import {Component, OnInit} from '@angular/core';
import {PatientFile} from '../../../models/PatientFile';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientfileService} from '../../../services/patientfile.service';
import {RoomService} from '../../../services/chat/room.service';
import {User} from '../../../models/user';

@Component({
    selector: 'app-doctor-patients-overview',
    templateUrl: './doctor-patients-overview.component.html',
    styleUrls: ['./doctor-patients-overview.component.css']
})
export class DoctorPatientsOverviewComponent implements OnInit {

    public patientFiles: PatientFile[];
    public unlinkedUsers: User[];

    private selectedFile: PatientFile;
    public selectedUser: User;

    constructor(public patientFileService: PatientfileService,
                private roomService: RoomService) { }

    ngOnInit(): void {
        this.getPatients();
        this.getUnlinkedUsers();
    }

    public getPatients(): void {
        this.patientFileService.findAll().subscribe(patient => {
            patient.forEach(file => {
                if (file.user != null) {
                    this.roomService.getRoomForUser(String(file.user.id)).subscribe(room => {
                        file.roomId = room.roomId;
                    });
                }
            });
            this.patientFiles = patient;
        });
    }

    openMenuFor(patientFile: PatientFile): void {
        this.selectedFile = patientFile;
    }

    private getUnlinkedUsers(): void {
        this.patientFileService.getUnlinkedUsers().subscribe(users => {
            this.unlinkedUsers = users.map(file => file.user);
        });
    }

    linkUsers(): void {
        this.patientFileService.mergeUsers(this.selectedFile, this.selectedUser).subscribe(unused => {
            this.selectedUser = null;
            this.selectedFile = null;
        });
    }
}
