import {Injectable} from '@angular/core';
import {Appointment} from '../models/Appointment';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TokenStorageService} from './auth.service/token-storage.service';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AppointmentService {

    public allAppointments: Appointment[] = [];

    constructor(private http: HttpClient,
                private tokenStorageService: TokenStorageService) {
    }

    public findAll(): Observable<Appointment[]> {
        return new Observable<Appointment[]>((observer) => {
            this.getAppointments().subscribe(returningAppointment => {
                returningAppointment.map(Appointment.trueCopy);
                observer.next(returningAppointment);
                this.refreshList();
            });
        });
    }

    public findAllDoctor(): Observable<Appointment[]> {
        return new Observable<Appointment[]>((observer) => {
            this.getAppointmentsDoctor().subscribe(returningAppointment => {
                returningAppointment.map(Appointment.trueCopy);
                observer.next(returningAppointment);
                this.refreshList();
            });
        });
    }

    public refreshList(): void {
        this.getAppointments().subscribe(returningAppointments => {
            this.allAppointments = returningAppointments;
        });
    }

    public refreshListDoctor(): void {
        this.getAppointmentsDoctor().subscribe(returningAppointments => {
            this.allAppointments = returningAppointments;
        });
    }

    public postAppointment(appointment: Appointment): Observable<Appointment> {
        try {
            return this.http.post<Appointment>(`${environment.apiUrl}/appointments`, appointment);
        } catch (error) {
            console.log('Error: ' + error);
            return null;
        }
    }

    private getAppointments(): Observable<any> {
        try {
            return this.http.put(`${environment.apiUrl}/appointments/all`, this.tokenStorageService.getUser().id);
        } catch (error) {
            console.log('Error: ' + error);
            return null;
        }
    }

    private getAppointmentsDoctor(): Observable<any> {
        try {
            return this.http.put(`${environment.apiUrl}/appointments/doctor`, this.tokenStorageService.getUser().id);
        } catch (error) {
            console.log('Error: ' + error);
            return null;
        }
    }

}
