package com.codefriendly.repository;

import com.codefriendly.entity.UserProgress;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserProgressRepository extends MongoRepository<UserProgress, String> {
    Optional<UserProgress> findByUserIdAndSkillId(String userId, String skillId);

    List<UserProgress> findByUserId(String userId);
}
