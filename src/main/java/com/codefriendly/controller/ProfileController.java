package com.codefriendly.controller;

import com.codefriendly.dto.LearningDtos;
import com.codefriendly.service.ProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public LearningDtos.ProfileView profile(Authentication authentication) {
        return profileService.profile(authentication.getName());
    }
}
