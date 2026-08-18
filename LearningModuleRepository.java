package com.codefriendly.repository;

import com.codefriendly.entity.LearningModule;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LearningModuleRepository extends MongoRepository<LearningModule, String> {
    List<LearningModule> findBySkillIdOrderByOrderIndexAsc(String skillId);
}
