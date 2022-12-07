package nl.hva.infosupport.controllers;

import nl.hva.infosupport.models.ChatMessage;
import nl.hva.infosupport.models.Room;
import nl.hva.infosupport.models.User;
import nl.hva.infosupport.repository.ChatMessageRepository;
import nl.hva.infosupport.repository.PatientFileRepository;
import nl.hva.infosupport.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "https://ewa-infosupport4-fe-app.herokuapp.com"})
@RequestMapping("/api/chat")
public class ChatController {
    ChatMessageRepository messageRepository;
    RoomRepository roomRepository;

    PatientFileRepository patientRepository;

    public ChatController(ChatMessageRepository messageRepository, RoomRepository roomRepository, @Qualifier("patientFileRepositoryJPA") PatientFileRepository patientRepository) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
        this.patientRepository = patientRepository;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    List<ChatMessage> getForRoom(int id) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if (roomOptional.isPresent()) {
            return messageRepository.findAllByRoom(roomOptional.get());
        }
        return new ArrayList<>();
    }

    @PostMapping
    void addNewChat(@RequestBody ChatMessage message) {
        messageRepository.save(message);
    }

    /**
     *  Get Id for room.
     * @param user_id Patient id.
     */
    @GetMapping("/room/{user_id}")
    ResponseEntity<Room> getRoomId(@PathVariable int user_id) {
        User doctor = patientRepository.findForPatient(user_id).getDoctor();
        if (doctor == null) {
            return null;
        }
        final int doctorId = Math.toIntExact(doctor.getId());
        Room s = roomRepository.findRoomByPatientIdAndDoctorId(user_id, doctorId);
        if (s == null) {
            s = new Room(user_id, doctorId);
        }
        roomRepository.save(s);
        return ResponseEntity.ok(s);
    }

    @GetMapping("/room/roomid/{user_id}")
    ResponseEntity<Room> getRoomFromId(@PathVariable int user_id) {
        Room s = roomRepository.findById(user_id).orElse(null);
        return ResponseEntity.ok(s);
    }

}
