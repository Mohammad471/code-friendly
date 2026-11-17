package com.codefriendly.entity;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quizzes")
@CompoundIndex(name = "skill_concept_quiz_idx", def = "{'skillId': 1, 'conceptId': 1}", unique = true)
public class Quiz {

    @Id
    private String id;

    private String skillId;
    private String conceptId;
    private String title;
    private List<Question> questions = new ArrayList<>();

    public Quiz() {
    }

    public Quiz(String skillId, String conceptId, String title) {
        this.skillId = skillId;
        this.conceptId = conceptId;
        this.title = title;
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

    public String getConceptId() {
        return conceptId;
    }

    public void setConceptId(String conceptId) {
        this.conceptId = conceptId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public static class Question {
        private String id;
        private String text;
        private List<String> options = new ArrayList<>();
        private int correctOptionIndex;
        private String explanation;

        public Question() {
        }

        public Question(String id, String text, List<String> options, int correctOptionIndex, String explanation) {
            this.id = id;
            this.text = text;
            this.options = options;
            this.correctOptionIndex = correctOptionIndex;
            this.explanation = explanation;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public List<String> getOptions() {
            return options;
        }

        public void setOptions(List<String> options) {
            this.options = options;
        }

        public int getCorrectOptionIndex() {
            return correctOptionIndex;
        }

        public void setCorrectOptionIndex(int correctOptionIndex) {
            this.correctOptionIndex = correctOptionIndex;
        }

        public String getExplanation() {
            return explanation;
        }

        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }
    }
}
