package com.codefriendly.repository;

import com.codefriendly.entity.Quiz;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizRepository extends MongoRepository<Quiz, String> {
    Optional<Quiz> findBySkillIdAndConceptId(String skillId, String conceptId);
}
