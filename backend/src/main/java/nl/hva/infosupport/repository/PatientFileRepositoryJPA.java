package nl.hva.infosupport.repository;

import nl.hva.infosupport.models.PatientFile;
import nl.hva.infosupport.models.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class PatientFileRepositoryJPA implements PatientFileRepository {

    @PersistenceContext
    EntityManager entityManager;

    final UserRepository userRepository;
    final TempAccountRepository tempAccountRepository;

    public PatientFileRepositoryJPA(UserRepository userRepository, TempAccountRepository tempAccountRepository) {
        this.userRepository = userRepository;
        this.tempAccountRepository = tempAccountRepository;
    }

    @Override
    public List<PatientFile> findAll(int doctorId) {
        User doctor = userRepository.findById(doctorId);
        TypedQuery<PatientFile> query =
                this.entityManager.createQuery(
                        "SELECT p FROM PatientFile p WHERE p.doctor=:id", PatientFile.class
                );
        query.setParameter("id", doctor);
        return query.getResultList();
    }

    @Override
    public List<PatientFile> findAllUnlinkedPatients() {
        TypedQuery<PatientFile> query =
                this.entityManager.createQuery(
                        "SELECT p FROM PatientFile p WHERE p.doctor IS NULL", PatientFile.class
                );
        return query.getResultList();
    }

    public List<PatientFile> findAllTempAccountsFor(int doctor_id) {
        TypedQuery<PatientFile> query =
                this.entityManager.createQuery(
                        "SELECT pf FROM PatientFile pf WHERE pf.user IS NULL AND pf.doctor.id =:id", PatientFile.class
                );
        query.setParameter("id", doctor_id);
        return query.getResultList();
    }

    @Override
    public PatientFile findForTemp(int temp_id) {
        TypedQuery<PatientFile> query =
                this.entityManager.createQuery(
                        "SELECT p FROM PatientFile p WHERE p.tempAccount.id = :id", PatientFile.class
                );
        query.setParameter("id", temp_id);
        return query.getSingleResult();
    }


    @Override
    public List<PatientFile> findAllUnlinkedUsers() {
        TypedQuery<PatientFile> query =
                this.entityManager.createQuery(
                        "SELECT p FROM PatientFile p WHERE p.doctor IS NULL AND p.user IS NOT NULL", PatientFile.class
                );
        List<PatientFile> users = query.getResultList();
        return users;
    }

    @Override
    public PatientFile save(PatientFile savePatientFile) {

        if (savePatientFile.getTempAccount() != null) {
            tempAccountRepository.save(savePatientFile.getTempAccount());
        }
        return entityManager.merge(savePatientFile);
    }

    @Override
    public PatientFile findById(int id) {
        return entityManager.find(PatientFile.class, id);
    }

    @Override
    public PatientFile deleteById(int id) {
        PatientFile patientFile = entityManager.find(PatientFile.class, id);
        entityManager.remove(patientFile);
        return patientFile;
    }

    @Override
    public PatientFile findForPatient(int id) {
        TypedQuery<PatientFile> query =
                this.entityManager.createQuery(
                        "SELECT p FROM PatientFile p WHERE p.user.id=:id", PatientFile.class
                );

        final User userToSave = this.userRepository.findById(id);
        if (userToSave == null) {
            return null;
        }
        query.setParameter("id", (long) id);
        if (query.getResultList().size() == 1)
            return query.getSingleResult();
        else {
            System.out.println(id);
            return save(new PatientFile("", "", "", "", "", userToSave, null));
        }
    }
}
