package com.codefriendly.controller;

import com.codefriendly.dto.LearningDtos;
import com.codefriendly.service.ProgressService;
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
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public List<LearningDtos.ProgressSummary> summaries(Authentication authentication) {
        return progressService.summaries(authentication.getName());
    }

    @GetMapping("/{skillId}")
    public LearningDtos.ProgressSummary summary(Authentication authentication, @PathVariable String skillId) {
        return progressService.summary(authentication.getName(), skillId);
    }

    @PostMapping("/complete-topic")
    public LearningDtos.ProgressSummary completeTopic(
            Authentication authentication,
            @Valid @RequestBody LearningDtos.CompleteTopicRequest request
    ) {
        return progressService.completeTopic(authentication.getName(), request);
    }
}
