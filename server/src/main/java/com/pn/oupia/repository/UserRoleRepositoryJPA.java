package com.pn.oupia.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pn.oupia.model.UserRole;

public interface UserRoleRepositoryJPA extends JpaRepository<UserRole, Long>{
    List<UserRole> findByUserId(Long userId);
}
