package com.codefriendly.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.time.Instant;
import java.util.List;
import java.util.Map;

public final class LearningDtos {

    private LearningDtos() {
    }

    public record SkillCard(
            String id,
            String name,
            String slug,
            String description,
            String difficulty,
            String imageUrl,
            String color
    ) {
    }

    public record SelectSkillsRequest(
            @NotEmpty List<String> skillIds
    ) {
    }

    public record RoadmapResponse(
            SkillCard skill,
            List<ModuleView> modules,
            int totalConcepts
    ) {
    }

    public record ModuleView(
            String id,
            String name,
            String description,
            int orderIndex,
            List<ConceptView> concepts,
            boolean completed
    ) {
    }

    public record ConceptView(
            String id,
            String name,
            String slug,
            String category,
            String description,
            boolean completed
    ) {
    }

    public record TopicView(
            String conceptId,
            String conceptName,
            String conceptSlug,
            String skillId,
            String skillName,
            String definition,
            String syntax,
            String explanation,
            String realWorldExample,
            String codeExample,
            String output,
            List<String> advantages,
            List<String> disadvantages,
            List<String> commonMistakes,
            List<String> interviewQuestions,
            List<PracticeView> practiceQuestions,
            QuizView quiz
    ) {
    }

    public record PracticeView(
            String id,
            String title,
            String difficulty,
            String prompt,
            String sampleInput,
            String sampleOutput,
            String expectedOutput,
            List<String> hints
    ) {
    }

    public record QuizView(
            String id,
            String title,
            List<QuestionView> questions
    ) {
    }

    public record QuestionView(
            String id,
            String text,
            List<String> options
    ) {
    }

    public record QuizSubmitRequest(
            @NotBlank String quizId,
            @NotEmpty Map<String, Integer> answers,
            String skillId,
            String conceptId
    ) {
    }

    public record QuizAnswerResult(
            String questionId,
            boolean correct,
            int correctOptionIndex,
            String explanation
    ) {
    }

    public record QuizResult(
            int score,
            int total,
            int percentage,
            List<QuizAnswerResult> answers
    ) {
    }

    public record CompleteTopicRequest(
            @NotBlank String skillId,
            @NotBlank String conceptId
    ) {
    }

    public record ProgressSummary(
            String skillId,
            String skillName,
            int totalTopics,
            int completedTopics,
            int learningPercentage,
            int completedModules,
            int quizAverage,
            List<BadgeView> badges,
            int streakDays,
            String currentTopic
    ) {
    }

    public record BadgeView(
            String id,
            String name,
            String description,
            String icon,
            String type,
            Instant awardedAt
    ) {
    }

    public record CompareResponse(
            String conceptName,
            String conceptSlug,
            List<CompareItem> items,
            List<String> similarities,
            List<String> differences
    ) {
    }

    public record CompareItem(
            String skillId,
            String skillName,
            String definition,
            String syntax,
            String codeExample,
            List<String> advantages,
            List<String> disadvantages,
            List<String> commonMistakes,
            List<String> interviewQuestions
    ) {
    }

    public record ProfileView(
            AuthDtos.UserView user,
            List<SkillCard> selectedSkills,
            List<ProgressSummary> progress,
            List<BadgeView> badges
    ) {
    }
}
