package com.codefriendly.repository;

import com.codefriendly.entity.PracticeQuestion;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PracticeQuestionRepository extends MongoRepository<PracticeQuestion, String> {
    List<PracticeQuestion> findBySkillIdAndConceptId(String skillId, String conceptId);
}
