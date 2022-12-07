package nl.hva.infosupport.repository;

import nl.hva.infosupport.models.User;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Primary
@Repository
@Transactional
public class UserRepositoryJpa implements UserRepository {
    @PersistenceContext
    EntityManager entityManager;


    @Override
    public Optional<User> findByEmail(String params) {
        TypedQuery<User> userFindByEmail = entityManager.createNamedQuery(
                "User_find_by_email",
                User.class);
        userFindByEmail.setParameter(1, params);
        Optional<User> result = Optional.ofNullable(userFindByEmail.getSingleResult());
        return result;

    }

    @Override
    public Boolean existsByEmail(String email) {
        TypedQuery<User> userFindByEmail = entityManager.createNamedQuery(
                "User_find_by_email",
                User.class);
        userFindByEmail.setParameter(1, email);
        return userFindByEmail.getFirstResult() == 1;

    }

    @Override
    public List<User> findAll() {
        TypedQuery< User > query =
                this.entityManager.createQuery(
                        "select u from User u", User.class
                );
        return query.getResultList();
    }


    @Override
    public User findById(int oId) {
        return entityManager.find(User.class, (long) oId);
    }

    @Override
    public User save(User saveUser) {
        return entityManager.merge(saveUser) ;
    }

    @Override
    public User deleteById(int oId) {

        return null;
    }
}
