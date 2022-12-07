package nl.hva.infosupport.controllers;

import nl.hva.infosupport.models.PatientFile;
import nl.hva.infosupport.models.TempAccount;
import nl.hva.infosupport.models.User;
import nl.hva.infosupport.repository.PatientFileRepository;
import nl.hva.infosupport.repository.TempAccountRepository;
import nl.hva.infosupport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200", "https://ewa-infosupport4-fe-app.herokuapp.com", "http://localhost:4200/#", "http://localhost:4200/#/calendar"})
@RequestMapping("/api/patients")
@RestController
public class PatientFileController {

    @Autowired
    private PatientFileRepository patientFileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TempAccountRepository tempAccountRepository;

    @GetMapping(path = "/doctor/{id}")
    public List<PatientFile> getAllPatientsFor(@PathVariable int id) {
        return patientFileRepository.findAll(id);
    }

    @GetMapping(path = "/unlinked-patients")
    public List<PatientFile> getAllUnlinkedPatients() {
        System.out.println("Finding patients...");
        return patientFileRepository.findAllUnlinkedPatients();
    }

    @PostMapping(path = "/merge/{temp_id}/{user_id}")
    public PatientFile merge(@PathVariable int user_id, @PathVariable int temp_id) {
        User user = userRepository.findById(user_id);

        //Delete user entry and add it to TempAccount entry.
        patientFileRepository.deleteById(patientFileRepository.findForPatient(user_id).getId());
        PatientFile tempPatientFile = patientFileRepository.findForTemp(temp_id);
        tempPatientFile.setUser(user);

        //Save entry.
        return patientFileRepository.save(tempPatientFile);
    }

    @GetMapping(path = "/unlinked-users")
    public List<PatientFile> getAllUnlinkedUsers() {
        System.out.println("Finding users...");
        return patientFileRepository.findAllUnlinkedUsers();
    }

    @PostMapping
    public ResponseEntity<PatientFile> addPatientFile(@RequestBody PatientFile patientFile){
        patientFileRepository.save(patientFile);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(patientFile.getId())
                .toUri();

        return ResponseEntity.created(location).body(patientFile);
    }

    @GetMapping("/{id}")
    public PatientFile getPatientFile(@PathVariable int id){
        return patientFileRepository.findById(id);
    }

    @PutMapping(path = "/doctor/{user_id}")
    public PatientFile updateDoctor(@PathVariable int user_id, @RequestBody User user) {
        System.out.println(user.getId());
        PatientFile file = patientFileRepository.findForPatient(user_id);
        User doctor = userRepository.findById(Math.toIntExact(user.getId()));
        file.setDoctor(doctor);
        return patientFileRepository.save(file);
    }

    @PutMapping(path = "/{id}")
    public PatientFile editPatientFile(@PathVariable int id, @RequestBody PatientFile newPatientFile){
        PatientFile oldPatientFile = patientFileRepository.findById(id);
        newPatientFile.setId(oldPatientFile.getId());
        System.out.println("Saving file...");
        return patientFileRepository.save(newPatientFile);
    }

    @DeleteMapping(path = "/{id}")
    public PatientFile deletePatientFile(@PathVariable int id){
        return patientFileRepository.deleteById(id);
    }

    @GetMapping(path = "/userid/{id}")
    public PatientFile getSpecificPatientFile(@PathVariable int id){
        return patientFileRepository.findForPatient(id);
    }
}
