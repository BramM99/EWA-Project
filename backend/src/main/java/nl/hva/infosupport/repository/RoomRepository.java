package nl.hva.infosupport.repository;

import nl.hva.infosupport.models.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends CrudRepository<Room, Integer> {

    Room findRoomByPatientIdAndDoctorId(int patientId, int doctorId);
}
