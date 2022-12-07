package nl.hva.infosupport.controllers;

import nl.hva.infosupport.models.ChatMessage;
import nl.hva.infosupport.models.PatientFile;
import nl.hva.infosupport.models.Room;
import nl.hva.infosupport.repository.ChatMessageRepository;
import nl.hva.infosupport.repository.PatientFileRepository;
import nl.hva.infosupport.repository.RoomRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@Controller
@CrossOrigin(origins = {"http://localhost:4200", "https://ewa-infosupport4-fe-app.herokuapp.com"})
public class ChatSocketController {

    final RoomRepository roomRepository;
    final ChatMessageRepository chatMessageRepository;
    final PatientFileRepository patientFileRepository;
    final SimpMessagingTemplate template;

    public ChatSocketController(RoomRepository roomRepository, ChatMessageRepository chatMessageRepository, PatientFileRepository patientFileRepository, SimpMessagingTemplate template) {

        this.roomRepository = roomRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.patientFileRepository = patientFileRepository;
        this.template = template;
    }

//    @MessageMapping("/sending/{room}")
//    @SendTo("/chat/receiving/{room}")
//    public String send(@DestinationVariable int room, ChatMessage message) {
//        Optional<Room> roomOptional = roomRepository.findById(room);
//        if (roomOptional.isPresent()) {
//            message.setRoom(roomOptional.get());
//        } else {
//            message.setRoom(roomRepository.findById(9).get());
//        }
//        chatMessageRepository.save(message);
//        return message.toString();
//    }

    @MessageMapping("/sending/{room}")
    @SendTo("/chat/receiving/{room}")
    public String send(@DestinationVariable int room, ChatMessage message) {
        Optional<Room> roomOptional = roomRepository.findById(room);
        if (roomOptional.isPresent()) {
            message.setRoom(roomOptional.get());
        } else {
            PatientFile patient = patientFileRepository.findForPatient(message.getSenderId());
            Room returningRoom = roomRepository.save(new Room(patient.getId(), Math.toIntExact(patient.getDoctor().getId())));
            message.setRoom(returningRoom);
        }
        chatMessageRepository.save(message);
        return message.toString();
    }
}
