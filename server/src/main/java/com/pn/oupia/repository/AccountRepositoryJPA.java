package com.pn.oupia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.pn.oupia.model.Account;

public interface AccountRepositoryJPA extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String userName);
    Optional<Account> findById(Long id);
}
