package nl.hva.infosupport.repository;

import nl.hva.infosupport.models.TempAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface TempAccountRepository extends CrudRepository<TempAccount, Long> {

}
