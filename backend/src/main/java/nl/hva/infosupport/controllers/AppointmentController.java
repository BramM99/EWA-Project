package nl.hva.infosupport.controllers;

import nl.hva.infosupport.models.Appointment;
import nl.hva.infosupport.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "https://ewa-infosupport4-fe-app.herokuapp.com", "http://localhost:52740"})
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @PostMapping(path = "/appointments")
    public Appointment makeAppointment(@RequestBody Appointment appointment) {
        appointmentRepository.save(appointment);
        return appointment;
    }

    @PutMapping(path = "/appointments/all")
    public List<Appointment> getAllAppointments(@RequestBody int authorId) {
        return appointmentRepository.findAll(authorId);
    }

    @PutMapping(path = "/appointments/doctor")
    public List<Appointment> getAllAppointmentsDoctor(@RequestBody int doctorId) {
        return appointmentRepository.findAllDoctor(doctorId);
    }

}
