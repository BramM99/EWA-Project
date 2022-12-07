import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {AppointmentService} from '../../services/appointment.service';
import {Appointment} from '../../models/Appointment';
import {isSameDay, isSameMonth} from 'date-fns';
import {TokenStorageService} from '../../services/auth.service/token-storage.service';
import {PatientfileService} from '../../services/patientfile.service';
import {PatientFile} from '../../models/PatientFile';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-calender',
    templateUrl: './calender.component.html',
    styleUrls: ['./calender.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CalenderComponent implements OnInit {
    constructor(private appointmentService: AppointmentService, private tokenStorageService: TokenStorageService,
                private patientFileService: PatientfileService) {
    }

    events: CalendarEvent[] = this.appointmentService.allAppointments;
    view: CalendarView = CalendarView.Month;
    viewDate: Date = new Date();
    appointment: Appointment;
    appointmentDate: Date = new Date();
    activeDayIsOpen: boolean;
    selectedTime: string;
    doctorId: number;
    patients: PatientFile[] = [];

    observablePatientFile: Observable<PatientFile[]>;

    myDpOptions: IAngularMyDpOptions = {
        dateRange: false,
        dateFormat: 'dd.mm.yyyy'
    };

    model: IMyDateModel = null;
    @Input() redenAfspraak: string;

    CalendarView = CalendarView;

    modalData: {
        action: string;
        event: CalendarEvent;
    };

    times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

    ngOnInit(): void {
        this.refreshCalendar();
    }

    onSelectTime(time): void {
        this.selectedTime = time.target.value;
    }

    refreshCalendar(): void {
        // If logged in user is a doctor
        if (this.tokenStorageService.getUser().roles[0] === 'ROLE_DOCTOR'){
            console.log('Doctor logged in');
            this.appointmentService.findAllDoctor().subscribe(val => {
                this.parseDate(val);
                this.viewDate = new Date();
            });
        } else {
            // Logged in user is a patient
            console.log('Patient logged in');
            this.appointmentService.findAll().subscribe(val => {
                this.parseDate(val);
                this.viewDate = new Date();
            });
        }
    }

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    setView(view: CalendarView): void {
        this.view = view;
    }

    parseDate(eventsParse: CalendarEvent[]): void {
        eventsParse.forEach(event => {
            event.start = new Date(event.start);
            this.events.push(event);
        });
    }

    closeOpenMonthViewDay(): void {
        this.activeDayIsOpen = false;
    }

    changeDay(date: Date): void {
        this.viewDate = date;
        this.view = CalendarView.Day;
    }

    getDoctorId(): Promise<void> {
        return new Promise(promise => {
            this.patientFileService.getSpecificPatient(this.tokenStorageService.getUser().id).subscribe(patients => {
                if (patients[0] != null) {
                    this.doctorId = patients[0].doctor.id;
                }
                promise();
            });
        });
    }

    async addEvent(): Promise<void> {
        this.appointmentDate = new Date(this.model.singleDate.jsDate);
        const hours = this.selectedTime.slice(0, 2);
        const minutes = this.selectedTime.slice(3);
        this.appointmentDate.setHours(Number(hours) + 1);
        this.appointmentDate.setMinutes(Number(minutes));
        await this.getDoctorId();
        this.appointment = new Appointment(this.redenAfspraak, this.appointmentDate, this.tokenStorageService.getUser().id, this.doctorId);
        this.appointmentService.postAppointment(this.appointment).subscribe(() => {
            this.events = [];
            this.refreshCalendar();
        });
    }
}
