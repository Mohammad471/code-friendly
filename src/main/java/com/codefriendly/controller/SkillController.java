package com.codefriendly.controller;

import com.codefriendly.dto.LearningDtos;
import com.codefriendly.service.LearningService;
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
@RequestMapping("/api/skills")
public class SkillController {

    private final LearningService learningService;

    public SkillController(LearningService learningService) {
        this.learningService = learningService;
    }

    @GetMapping
    public List<LearningDtos.SkillCard> skills() {
        return learningService.skills();
    }

    @PostMapping("/select")
    public List<LearningDtos.SkillCard> selectSkills(
            Authentication authentication,
            @Valid @RequestBody LearningDtos.SelectSkillsRequest request
    ) {
        return learningService.selectSkills(authentication.getName(), request);
    }

    @GetMapping("/{skillId}/roadmap")
    public LearningDtos.RoadmapResponse roadmap(@PathVariable String skillId, Authentication authentication) {
        String email = authentication == null ? null : authentication.getName();
        return learningService.roadmap(skillId, email);
    }
}
