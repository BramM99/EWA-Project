import {Injectable} from '@angular/core';
import {PatientFile} from '../models/PatientFile';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {TokenStorageService} from './auth.service/token-storage.service';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class PatientfileService {

    public newPatientFile: PatientFile;
    public patientFiles: PatientFile[] = [];
    public unlinkedPatientFiles: PatientFile[] = [];
    public unlinkedUserFiles: User[] = [];
    public specificPatientFile: PatientFile[] = [];

    constructor(private http: HttpClient,
                private tokenStorageService: TokenStorageService) {
    }

    // Normal Patients

    public addNewPatientFile(patientFile: PatientFile): void {
        this.http.post(`${environment.apiUrl}/api/patients`, patientFile).subscribe();
    }

    public deleteNewPatientFile(patientFile: PatientFile): void {
        this.deletePatientFile(patientFile).subscribe(data => {
            this.patientFiles.splice(this.patientFiles.indexOf(patientFile), 1);
        });
    }

    public editNewPatientFile(patientFile: PatientFile): void {
        this.editPatientFile(patientFile).subscribe(data => {
            this.patientFiles.splice(this.patientFiles.indexOf(patientFile), 1, patientFile);
        });
    }

    public updateDoctorReference(patientFile: PatientFile, doctor: User): void {
        console.log(new Date(), 'sending updated user...');
        patientFile.doctor = doctor;
        this.http.put(`${environment.apiUrl}/api/patients/doctor/${patientFile.user.id}`, doctor).subscribe();
    }

    // Unlinked Patients

    public addNewUnlinkedPatientFile(patientFile: PatientFile): void {
        this.unlinkedPatientFiles.push(patientFile);
    }

    public deleteNewUnlinkedPatientFile(patientFile: PatientFile): void {
        this.unlinkedPatientFiles.splice(this.unlinkedPatientFiles.indexOf(patientFile), 1);
    }

    public editNewUnlinkedPatientFile(patientFile: PatientFile): void {
        this.unlinkedPatientFiles.splice(this.unlinkedPatientFiles.indexOf(patientFile), 1, patientFile);
    }

    // Unlinked Users

    // Rest Controllers

    public findAll(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/patients/doctor/${this.tokenStorageService.getUser().id}`);
    }

    public findAllUnlinkedPatients(): Observable<PatientFile[]> {
        return of(this.unlinkedPatientFiles);
    }

    public findAllUnlinkedUsers(): Observable<User[]> {
        return of(this.unlinkedUserFiles);
    }

    public findById(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/patients/${id}`);
    }

    public copyPatientFile(patient: PatientFile): PatientFile {
        return JSON.parse(JSON.stringify(patient));
    }

    public getPatients(): Observable<any> {
        try {
            return this.http
                .get(`${environment.apiUrl}/api/patients/doctor/${this.tokenStorageService.getUser().id}`);
        } catch (error) {
            console.log('Error: ' + error);
            return null;
        }
    }

    public getUnlinkedPatients(): Observable<PatientFile[]> {
        try {
            return this.http
                .get<PatientFile[]>(`${environment.apiUrl}/api/patients/unlinked-patients`);
        } catch (error) {
            console.log('Error: ' + error);
            return null;
        }
    }

    public getUnlinkedUsers(): Observable<PatientFile[]> {
        try {
            return this.http
                .get<PatientFile[]>(`${environment.apiUrl}/api/patients/unlinked-users`);
        } catch (error) {
            console.log('Error: ' + error);
            return null;
        }
    }

    public addPatientFile(patientFile: PatientFile): Observable<PatientFile> {
        try {
            return this.http
                .post<PatientFile>(`${environment.apiUrl}/api/patients`, patientFile);
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    public editPatientFile(patient: PatientFile): Observable<PatientFile> {
        try {
            return this.http
                .put<PatientFile>(`${environment.apiUrl}/api/patients/` + patient.id, patient);
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    public deletePatientFile(patient: PatientFile): Observable<PatientFile> {
        try {
            return this.http
                .delete<PatientFile>(`${environment.apiUrl}/api/patients/` + patient.id);
        } catch (error) {
            console.log('Error: ' + error);
            return null;
        }
    }

    public getSpecificPatient(userId: number): Observable<PatientFile> {
        try {
            return this.http
                .get<PatientFile>(`${environment.apiUrl}/api/patients/userid/` + userId.valueOf());
        } catch (error) {
            console.log('Error: ' + error);
            return null;
        }
    }

    public mergeUsers(noAccountFile: PatientFile, createdUser: User): Observable<any> {
        return this.http.post(`${environment.apiUrl}/api/patients/merge/${noAccountFile.tempAccount.id}/${createdUser.id}`, {});
    }
}
