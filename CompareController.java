package com.codefriendly.controller;

import com.codefriendly.dto.LearningDtos;
import com.codefriendly.service.LearningService;
import java.util.Arrays;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/compare")
public class CompareController {

    private final LearningService learningService;

    public CompareController(LearningService learningService) {
        this.learningService = learningService;
    }

    @GetMapping
    public LearningDtos.CompareResponse compare(
            @RequestParam(defaultValue = "arrays") String concept,
            @RequestParam(required = false) String skillIds
    ) {
        List<String> selectedSkills = skillIds == null || skillIds.isBlank()
                ? List.of()
                : Arrays.stream(skillIds.split(",")).map(String::trim).toList();
        return learningService.compare(concept, selectedSkills);
    }
}
