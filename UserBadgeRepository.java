package com.codefriendly.repository;

import com.codefriendly.entity.UserBadge;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserBadgeRepository extends MongoRepository<UserBadge, String> {
    List<UserBadge> findByUserId(String userId);

    Optional<UserBadge> findByUserIdAndBadgeId(String userId, String badgeId);
}
