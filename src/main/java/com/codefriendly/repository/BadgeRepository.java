package com.codefriendly.repository;

import com.codefriendly.entity.Badge;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BadgeRepository extends MongoRepository<Badge, String> {
    Optional<Badge> findByName(String name);
}
