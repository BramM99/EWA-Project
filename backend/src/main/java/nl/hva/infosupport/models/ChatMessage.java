package nl.hva.infosupport.models;

import javax.persistence.*;
import java.util.Date;

@Entity
public class ChatMessage {

    @Id
    @GeneratedValue
    public int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    @ManyToOne Room room;

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    private int senderId;
    private String content;
    private Date timestamp;

    public ChatMessage(Room room, int senderId, String content, Date timestamp) {
        this.room = room;
        this.senderId = senderId;
        this.content = content;
        this.timestamp = timestamp;
    }

    public ChatMessage(String roomId, int senderId, String content, Date timestamp) {

    }
    public ChatMessage() {

    }

    @Override
    public String toString() {
        return "{" +
                "\"id\": \"" + id + '\"' +
                ", \"roomId\": \"" + room.getRoomId() + '\"' +
                ", \"senderId\": \"" + senderId + '\"' +
                ", \"content\": \"" + content + '\"' +
                ", \"timestamp\": \"" + timestamp.toString() + '\"'+
                '}';
    }

}
