package nl.hva.infosupport.repository;

import nl.hva.infosupport.models.PatientFile;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientFileRepository {

    List<PatientFile> findAll(int doctorId);

    List<PatientFile> findAllUnlinkedPatients();

    List<PatientFile> findAllUnlinkedUsers();

    PatientFile save(PatientFile savePatientFile);

    PatientFile findById(int id);

    PatientFile deleteById(int id);

    PatientFile findForPatient(int id);

    List<PatientFile> findAllTempAccountsFor(int doctor_id);

    PatientFile findForTemp(int id);
}
