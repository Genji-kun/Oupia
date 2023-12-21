package com.pn.oupia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.pn.oupia.model.OAuth;

public interface OAuthRepositoryJPA extends JpaRepository<OAuth, Long> {
    Optional<OAuth> findBySubId(String subId);
}
