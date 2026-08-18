package com.codefriendly.service;

import com.codefriendly.dto.AuthDtos;
import com.codefriendly.dto.LearningDtos;
import com.codefriendly.entity.User;
import com.codefriendly.exception.ResourceNotFoundException;
import com.codefriendly.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final AuthService authService;
    private final LearningService learningService;
    private final ProgressService progressService;

    public ProfileService(
            UserRepository userRepository,
            AuthService authService,
            LearningService learningService,
            ProgressService progressService
    ) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.learningService = learningService;
        this.progressService = progressService;
    }

    public LearningDtos.ProfileView profile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        AuthDtos.UserView userView = authService.toUserView(user);
        List<LearningDtos.SkillCard> selectedSkills = user.getSelectedSkillIds()
                .stream()
                .map(learningService::findSkill)
                .map(learningService::toSkillCard)
                .toList();
        return new LearningDtos.ProfileView(
                userView,
                selectedSkills,
                progressService.summaries(email),
                progressService.userBadges(email)
        );
    }
}
