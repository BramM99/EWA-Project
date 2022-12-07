package nl.hva.infosupport.repository;

import nl.hva.infosupport.models.Appointment;
import nl.hva.infosupport.models.PatientFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository {
    List<Appointment> appointments = null;

    public List<Appointment> findAll(int authorId);

    public List<Appointment> findAllDoctor(int doctorId);

    public Appointment save(Appointment appointment);

}
