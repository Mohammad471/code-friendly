package com.codefriendly.entity;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "concepts")
public class Concept {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String slug;

    private String category;
    private String description;
    private List<TopicImplementation> implementations = new ArrayList<>();

    public Concept() {
    }

    public Concept(String name, String slug, String category, String description) {
        this.name = name;
        this.slug = slug;
        this.category = category;
        this.description = description;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<TopicImplementation> getImplementations() {
        return implementations;
    }

    public void setImplementations(List<TopicImplementation> implementations) {
        this.implementations = implementations;
    }

    public static class TopicImplementation {
        private String skillId;
        private String skillSlug;
        private String skillName;
        private String definition;
        private String syntax;
        private String explanation;
        private String realWorldExample;
        private String codeExample;
        private String output;
        private List<String> advantages = new ArrayList<>();
        private List<String> disadvantages = new ArrayList<>();
        private List<String> commonMistakes = new ArrayList<>();
        private List<String> interviewQuestions = new ArrayList<>();

        public TopicImplementation() {
        }

        public TopicImplementation(String skillId, String skillSlug, String skillName) {
            this.skillId = skillId;
            this.skillSlug = skillSlug;
            this.skillName = skillName;
        }

        public String getSkillId() {
            return skillId;
        }

        public void setSkillId(String skillId) {
            this.skillId = skillId;
        }

        public String getSkillSlug() {
            return skillSlug;
        }

        public void setSkillSlug(String skillSlug) {
            this.skillSlug = skillSlug;
        }

        public String getSkillName() {
            return skillName;
        }

        public void setSkillName(String skillName) {
            this.skillName = skillName;
        }

        public String getDefinition() {
            return definition;
        }

        public void setDefinition(String definition) {
            this.definition = definition;
        }

        public String getSyntax() {
            return syntax;
        }

        public void setSyntax(String syntax) {
            this.syntax = syntax;
        }

        public String getExplanation() {
            return explanation;
        }

        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }

        public String getRealWorldExample() {
            return realWorldExample;
        }

        public void setRealWorldExample(String realWorldExample) {
            this.realWorldExample = realWorldExample;
        }

        public String getCodeExample() {
            return codeExample;
        }

        public void setCodeExample(String codeExample) {
            this.codeExample = codeExample;
        }

        public String getOutput() {
            return output;
        }

        public void setOutput(String output) {
            this.output = output;
        }

        public List<String> getAdvantages() {
            return advantages;
        }

        public void setAdvantages(List<String> advantages) {
            this.advantages = advantages;
        }

        public List<String> getDisadvantages() {
            return disadvantages;
        }

        public void setDisadvantages(List<String> disadvantages) {
            this.disadvantages = disadvantages;
        }

        public List<String> getCommonMistakes() {
            return commonMistakes;
        }

        public void setCommonMistakes(List<String> commonMistakes) {
            this.commonMistakes = commonMistakes;
        }

        public List<String> getInterviewQuestions() {
            return interviewQuestions;
        }

        public void setInterviewQuestions(List<String> interviewQuestions) {
            this.interviewQuestions = interviewQuestions;
        }
    }
}
