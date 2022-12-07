package nl.hva.infosupport.repository;

import nl.hva.infosupport.models.Appointment;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class AppointmentRepositoryJPA implements AppointmentRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Appointment> findAll(int authorId) {
        TypedQuery<Appointment> query =
                this.entityManager.createQuery(
                        "SELECT a FROM Appointment a WHERE a.authorId=:id", Appointment.class
                );
        query.setParameter("id", authorId);
        return query.getResultList();
    }

    @Override
    public List<Appointment> findAllDoctor(int doctorId) {
        TypedQuery<Appointment> query =
                this.entityManager.createQuery(
                        "SELECT a FROM Appointment a WHERE a.doctorId=:id", Appointment.class
                );
        query.setParameter("id", doctorId);
        return query.getResultList();
    }

    @Override
    public Appointment save(Appointment appointment) {
        return entityManager.merge(appointment);
    }
}
