package nl.hva.infosupport.repository;

import nl.hva.infosupport.models.ERole;
import nl.hva.infosupport.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
