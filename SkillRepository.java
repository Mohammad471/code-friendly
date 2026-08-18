package com.codefriendly.repository;

import com.codefriendly.entity.Skill;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SkillRepository extends MongoRepository<Skill, String> {
    List<Skill> findAllByOrderByOrderIndexAsc();

    Optional<Skill> findBySlug(String slug);
}
