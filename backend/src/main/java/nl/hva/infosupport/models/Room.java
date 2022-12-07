package nl.hva.infosupport.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Collection;

@Entity
public class Room {

    @Id @GeneratedValue private int roomId;
    @OneToMany Collection<ChatMessage> messages;

    public Room(int patientId, int doctorId) {
        this.patientId = patientId;
        this.doctorId = doctorId;
    }

    public Room() {
    }

    public Collection<ChatMessage> getMessages() {
        return messages;
    }

    public void setMessages(Collection<ChatMessage> messages) {
        this.messages = messages;
    }


    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patient_id) {
        this.patientId = patient_id;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctor_id) {
        this.doctorId = doctor_id;
    }

    private int patientId;
    private int doctorId;


    public void setRoomId(int room_id) {
        this.roomId = room_id;
    }

    public int getRoomId() {
        return roomId;
    }
}
