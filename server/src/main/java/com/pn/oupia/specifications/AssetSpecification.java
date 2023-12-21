package com.pn.oupia.specifications;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.domain.Specification;

import com.pn.oupia.model.Asset;

import jakarta.persistence.criteria.Predicate;


public class AssetSpecification {

    public static Specification<Asset> createSpecification(Map<String, String> params) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            String kw = params.get("kw");
            if (!kw.isBlank()) {
                predicates.add(cb.like(root.get("title"), "%" + kw + "%"));
            }

            String assetSlug = params.get("assetSlug");
            if (!assetSlug.isBlank()) {
                predicates.add(cb.equal(root.get("assetSlug"), assetSlug));
            }

            String username = params.get("username");
            if (username != null && !username.isBlank()) {
                Predicate userPredicate = cb.equal(root.get("user").get("username"), username);
                predicates.add(userPredicate);
            }

            String userId = params.get("userId");
            if (userId != null && !userId.isBlank()) {
                Predicate userPredicate = cb.equal(root.get("user").get("userId"), userId);
                predicates.add(userPredicate);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
    
}
