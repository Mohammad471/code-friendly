package com.codefriendly.repository;

import com.codefriendly.entity.Concept;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConceptRepository extends MongoRepository<Concept, String> {
    Optional<Concept> findBySlug(String slug);
}
