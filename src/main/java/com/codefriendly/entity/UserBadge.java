package com.codefriendly.entity;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_badges")
@CompoundIndex(name = "user_badge_unique_idx", def = "{'userId': 1, 'badgeId': 1}", unique = true)
public class UserBadge {

    @Id
    private String id;

    private String userId;
    private String badgeId;
    private Instant awardedAt = Instant.now();

    public UserBadge() {
    }

    public UserBadge(String userId, String badgeId) {
        this.userId = userId;
        this.badgeId = badgeId;
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

    public String getBadgeId() {
        return badgeId;
    }

    public void setBadgeId(String badgeId) {
        this.badgeId = badgeId;
    }

    public Instant getAwardedAt() {
        return awardedAt;
    }

    public void setAwardedAt(Instant awardedAt) {
        this.awardedAt = awardedAt;
    }
}
