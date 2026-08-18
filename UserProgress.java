package com.codefriendly.entity;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "progress")
@CompoundIndex(name = "user_skill_progress_idx", def = "{'userId': 1, 'skillId': 1}", unique = true)
public class UserProgress {

    @Id
    private String id;

    private String userId;
    private String skillId;
    private Set<String> completedConceptIds = new LinkedHashSet<>();
    private Set<String> completedModuleIds = new LinkedHashSet<>();
    private Map<String, Integer> quizScores = new LinkedHashMap<>();
    private int streakDays;
    private Instant lastActivityAt;
    private Instant updatedAt = Instant.now();

    public UserProgress() {
    }

    public UserProgress(String userId, String skillId) {
        this.userId = userId;
        this.skillId = skillId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSkillId() {
        return skillId;
    }

    public void setSkillId(String skillId) {
        this.skillId = skillId;
    }

    public Set<String> getCompletedConceptIds() {
        return completedConceptIds;
    }

    public void setCompletedConceptIds(Set<String> completedConceptIds) {
        this.completedConceptIds = completedConceptIds;
    }

    public Set<String> getCompletedModuleIds() {
        return completedModuleIds;
    }

    public void setCompletedModuleIds(Set<String> completedModuleIds) {
        this.completedModuleIds = completedModuleIds;
    }

    public Map<String, Integer> getQuizScores() {
        return quizScores;
    }

    public void setQuizScores(Map<String, Integer> quizScores) {
        this.quizScores = quizScores;
    }

    public int getStreakDays() {
        return streakDays;
    }

    public void setStreakDays(int streakDays) {
        this.streakDays = streakDays;
    }

    public Instant getLastActivityAt() {
        return lastActivityAt;
    }

    public void setLastActivityAt(Instant lastActivityAt) {
        this.lastActivityAt = lastActivityAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
