import { Component, OnInit } from '@angular/core';
import {PatientPanelBaseTileComponent} from '../patient-panel-tile/patient-panel-base-tile.component';
import {AppointmentService} from '../../../services/appointment.service';
import {Appointment} from '../../../models/Appointment';

@Component({
  selector: 'app-patient-panel-appointment-tile',
  templateUrl: './patient-panel-appointment-tile.component.html',
  styleUrls: ['./patient-panel-appointment-tile.component.css']
})
export class PatientPanelAppointmentTileComponent extends PatientPanelBaseTileComponent implements OnInit {

  appointment: Appointment;

  constructor(readonly appointmentService: AppointmentService) {
    super();
  }

  ngOnInit(): void {
    this.appointmentService.findAll().subscribe(appointments => {
      if (appointments.length !== 0) {
        appointments.sort((a, b) => new Date(a.start) > new Date(b.start) ? 1 : -1);
        this.appointment = appointments[0];
      }
    });
  }

  getFancyDateString(): string {
    const parsedDate = new Date(this.appointment.start);
    const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hours: '2-digit', minutes: '2-digit'};
    const date = new Intl.DateTimeFormat('nl-NL', dateOptions).format();
    return `${date} om ${String(parsedDate.getHours()).padStart(2, '0')}:${String(parsedDate.getMinutes()).padStart(2, '0')}`;
  }
}
