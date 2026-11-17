package com.codefriendly.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "skills")
public class Skill {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String slug;

    private String description;
    private String difficulty;
    private String imageUrl;
    private String color;
    private int orderIndex;

    public Skill() {
    }

    public Skill(String name, String slug, String description, String difficulty, String imageUrl, String color, int orderIndex) {
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.difficulty = difficulty;
        this.imageUrl = imageUrl;
        this.color = color;
        this.orderIndex = orderIndex;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(int orderIndex) {
        this.orderIndex = orderIndex;
    }
}
