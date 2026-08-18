package com.codefriendly.entity;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "modules")
@CompoundIndex(name = "skill_order_idx", def = "{'skillId': 1, 'orderIndex': 1}")
public class LearningModule {

    @Id
    private String id;

    private String skillId;
    private String name;
    private String description;
    private int orderIndex;
    private List<String> conceptIds = new ArrayList<>();

    public LearningModule() {
    }

    public LearningModule(String skillId, String name, String description, int orderIndex, List<String> conceptIds) {
        this.skillId = skillId;
        this.name = name;
        this.description = description;
        this.orderIndex = orderIndex;
        this.conceptIds = conceptIds;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSkillId() {
        return skillId;
    }

    public void setSkillId(String skillId) {
        this.skillId = skillId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(int orderIndex) {
        this.orderIndex = orderIndex;
    }

    public List<String> getConceptIds() {
        return conceptIds;
    }

    public void setConceptIds(List<String> conceptIds) {
        this.conceptIds = conceptIds;
    }
}
