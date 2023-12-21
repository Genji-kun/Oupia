package com.pn.oupia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pn.oupia.model.User;

public interface UserRepositoryJPA extends JpaRepository<User, Long> {

}
