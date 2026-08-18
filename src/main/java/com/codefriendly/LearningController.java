package com.codefriendly.controller;

import com.codefriendly.dto.LearningDtos;
import com.codefriendly.service.LearningService;
import com.codefriendly.service.QuizService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LearningController {

    private final LearningService learningService;
    private final QuizService quizService;

    public LearningController(LearningService learningService, QuizService quizService) {
        this.learningService = learningService;
        this.quizService = quizService;
    }

    @GetMapping("/topics/{skillId}/{conceptId}")
    public LearningDtos.TopicView topic(@PathVariable String skillId, @PathVariable String conceptId) {
        return learningService.topic(skillId, conceptId);
    }

    @GetMapping("/practice/{skillId}/{conceptId}")
    public List<LearningDtos.PracticeView> practice(@PathVariable String skillId, @PathVariable String conceptId) {
        return learningService.practice(skillId, conceptId);
    }

    @GetMapping("/quizzes/{skillId}/{conceptId}")
    public LearningDtos.QuizView quiz(@PathVariable String skillId, @PathVariable String conceptId) {
        return learningService.quiz(skillId, conceptId).orElse(null);
    }

    @PostMapping("/quizzes/submit")
    public LearningDtos.QuizResult submitQuiz(
            Authentication authentication,
            @Valid @RequestBody LearningDtos.QuizSubmitRequest request
    ) {
        return quizService.submit(authentication.getName(), request);
    }
}
