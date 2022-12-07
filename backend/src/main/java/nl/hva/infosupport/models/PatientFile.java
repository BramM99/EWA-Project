package nl.hva.infosupport.models;

import javax.persistence.*;

@Entity
public class PatientFile {
    @Id
    @GeneratedValue
    private int id;
    private String birthdate;
    private String sex;
    private String phonenumber;
    private String address;
    private String allergies;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    private User doctor;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(unique = true)
    private TempAccount tempAccount;

    public PatientFile(){}

    public PatientFile(int id, int userId, String birthdate, String sex, String phonenumber, String address, String allergies) {
        this.id = id;
        this.birthdate = birthdate;
        this.sex = sex;
        this.phonenumber = phonenumber;
        this.address = address;
        this.allergies = allergies;
    }

    public PatientFile(String birthdate, String sex, String phonenumber, String address, String allergies, User user, User doctor) {
        this.birthdate = birthdate;
        this.sex = sex;
        this.phonenumber = phonenumber;
        this.address = address;
        this.allergies = allergies;
        this.user = user;
        this.doctor = doctor;
    }

    public PatientFile(TempAccount tempAccount, String birthdate, String sex, String phonenumber, String address, String allergies, User doctor) {
        this.birthdate = birthdate;
        this.sex = sex;
        this.phonenumber = phonenumber;
        this.address = address;
        this.allergies = allergies;
        this.doctor = doctor;
        this.tempAccount = tempAccount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public User getDoctor() {
        return doctor;
    }

    public void setDoctor(User doctor) {
        this.doctor = doctor;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TempAccount getTempAccount() {
        return tempAccount;
    }

    public void setTempAccount(TempAccount tempAccount) {
        this.tempAccount = tempAccount;
    }
}
