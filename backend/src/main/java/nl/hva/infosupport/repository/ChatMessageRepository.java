package nl.hva.infosupport.repository;

import nl.hva.infosupport.models.ChatMessage;
import nl.hva.infosupport.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {

    List<ChatMessage> findAllByRoom(Room room);

}
