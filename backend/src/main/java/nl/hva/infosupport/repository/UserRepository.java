package nl.hva.infosupport.repository;

import nl.hva.infosupport.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    List<User> users = null;

    public List<User> findAll();

    public User findById(int oId);

    public User save(User saveUser);

    public User deleteById(int oId);
}
