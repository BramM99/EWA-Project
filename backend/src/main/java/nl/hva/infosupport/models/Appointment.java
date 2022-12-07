package nl.hva.infosupport.models;

import javax.persistence.*;
import java.time.Instant;
import java.util.Date;

@Entity
public class Appointment {
    @Id
    @GeneratedValue
    public int id;
    @Column(name = "title")
    public String title;
    @Column(name = "date")
    public Date start;
    @Column(name = "authorId")
    public int authorId;
    @Column(name = "doctorId")
    public int doctorId;

    public Appointment() {
    }

    public Appointment(String title, Date start, int authorId, int doctorId) {
        this.title = title;
        this.start = start;
        this.authorId = authorId;
        this.doctorId = doctorId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }
}
