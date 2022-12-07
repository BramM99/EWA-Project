package nl.hva.infosupport.controllers;

import nl.hva.infosupport.models.User;
import nl.hva.infosupport.payload.request.PasswordRequest;
import nl.hva.infosupport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "https://ewa-infosupport4-fe-app.herokuapp.com"})
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable long id) {
        return userRepository.findById(Math.toIntExact(id));
    }

    @PutMapping("/{id}")
    public User saveNewInfo(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/password/{id}")
    public User saveNewPassword(@RequestBody PasswordRequest passwordRequest, @PathVariable long id) {
        User user = userRepository.findById(Math.toIntExact(id));
        user.setPassword(encoder.encode(passwordRequest.getPassword()));
        return userRepository.save(user);
    }
}
