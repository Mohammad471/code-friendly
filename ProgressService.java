package com.codefriendly.service;

import com.codefriendly.dto.LearningDtos;
import com.codefriendly.entity.Badge;
import com.codefriendly.entity.Concept;
import com.codefriendly.entity.LearningModule;
import com.codefriendly.entity.Skill;
import com.codefriendly.entity.User;
import com.codefriendly.entity.UserBadge;
import com.codefriendly.entity.UserProgress;
import com.codefriendly.exception.ResourceNotFoundException;
import com.codefriendly.repository.BadgeRepository;
import com.codefriendly.repository.ConceptRepository;
import com.codefriendly.repository.LearningModuleRepository;
import com.codefriendly.repository.UserBadgeRepository;
import com.codefriendly.repository.UserProgressRepository;
import com.codefriendly.repository.UserRepository;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Collection;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {

    private final UserRepository userRepository;
    private final UserProgressRepository progressRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final BadgeRepository badgeRepository;
    private final LearningModuleRepository moduleRepository;
    private final ConceptRepository conceptRepository;
    private final LearningService learningService;

    public ProgressService(
            UserRepository userRepository,
            UserProgressRepository progressRepository,
            UserBadgeRepository userBadgeRepository,
            BadgeRepository badgeRepository,
            LearningModuleRepository moduleRepository,
            ConceptRepository conceptRepository,
            LearningService learningService
    ) {
        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
        this.userBadgeRepository = userBadgeRepository;
        this.badgeRepository = badgeRepository;
        this.moduleRepository = moduleRepository;
        this.conceptRepository = conceptRepository;
        this.learningService = learningService;
    }

    public List<LearningDtos.ProgressSummary> summaries(String email) {
        User user = findUser(email);
        return user.getSelectedSkillIds()
                .stream()
                .map(skillId -> summary(user, learningService.findSkill(skillId)))
                .toList();
    }

    public LearningDtos.ProgressSummary summary(String email, String skillIdentifier) {
        return summary(findUser(email), learningService.findSkill(skillIdentifier));
    }

    public LearningDtos.ProgressSummary completeTopic(String email, LearningDtos.CompleteTopicRequest request) {
        User user = findUser(email);
        Skill skill = learningService.findSkill(request.skillId());
        Concept concept = learningService.findConcept(request.conceptId());
        UserProgress progress = progress(user.getId(), skill.getId());
        progress.getCompletedConceptIds().add(concept.getId());
        updateModuleCompletion(skill.getId(), progress);
        touch(progress);
        progressRepository.save(progress);

        award(user.getId(), "Topic Completed");
        if ("arrays".equals(concept.getSlug())) {
            award(user.getId(), "Array Expert");
        }
        if ("loops".equals(concept.getSlug())) {
            award(user.getId(), "Loop Master");
        }
        if (!progress.getCompletedModuleIds().isEmpty()) {
            award(user.getId(), "Module Completed");
        }
        if (isSkillComplete(skill.getId(), progress)) {
            award(user.getId(), "Skill Completed");
        }
        return summary(user, skill);
    }

    public void recordQuizScore(String email, String skillIdentifier, String conceptIdentifier, int percentage) {
        if (email == null || skillIdentifier == null || conceptIdentifier == null) {
            return;
        }
        User user = findUser(email);
        Skill skill = learningService.findSkill(skillIdentifier);
        Concept concept = learningService.findConcept(conceptIdentifier);
        UserProgress progress = progress(user.getId(), skill.getId());
        progress.getQuizScores().put(concept.getId(), percentage);
        touch(progress);
        progressRepository.save(progress);
        if (percentage >= 80) {
            award(user.getId(), "Quiz Master");
        }
    }

    public List<LearningDtos.BadgeView> userBadges(String email) {
        User user = findUser(email);
        return badgeViews(user.getId());
    }

    private LearningDtos.ProgressSummary summary(User user, Skill skill) {
        UserProgress progress = progress(user.getId(), skill.getId());
        updateModuleCompletion(skill.getId(), progress);
        progressRepository.save(progress);

        List<LearningModule> modules = moduleRepository.findBySkillIdOrderByOrderIndexAsc(skill.getId());
        Set<String> allConceptIds = modules.stream()
                .map(LearningModule::getConceptIds)
                .flatMap(Collection::stream)
                .collect(Collectors.toCollection(LinkedHashSet::new));
        int totalTopics = allConceptIds.size();
        int completedTopics = (int) progress.getCompletedConceptIds().stream().filter(allConceptIds::contains).count();
        int learningPercentage = totalTopics == 0 ? 0 : Math.round((completedTopics * 100f) / totalTopics);
        int quizAverage = progress.getQuizScores().isEmpty()
                ? 0
                : Math.round((float) progress.getQuizScores().values().stream().mapToInt(Integer::intValue).average().orElse(0));

        return new LearningDtos.ProgressSummary(
                skill.getId(),
                skill.getName(),
                totalTopics,
                completedTopics,
                learningPercentage,
                progress.getCompletedModuleIds().size(),
                quizAverage,
                badgeViews(user.getId()),
                progress.getStreakDays(),
                currentTopic(modules, progress.getCompletedConceptIds())
        );
    }

    private void updateModuleCompletion(String skillId, UserProgress progress) {
        Set<String> completedModules = moduleRepository.findBySkillIdOrderByOrderIndexAsc(skillId)
                .stream()
                .filter(module -> !module.getConceptIds().isEmpty()
                        && progress.getCompletedConceptIds().containsAll(module.getConceptIds()))
                .map(LearningModule::getId)
                .collect(Collectors.toCollection(LinkedHashSet::new));
        progress.setCompletedModuleIds(completedModules);
    }

    private boolean isSkillComplete(String skillId, UserProgress progress) {
        Set<String> conceptIds = moduleRepository.findBySkillIdOrderByOrderIndexAsc(skillId)
                .stream()
                .map(LearningModule::getConceptIds)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
        return !conceptIds.isEmpty() && progress.getCompletedConceptIds().containsAll(conceptIds);
    }

    private String currentTopic(List<LearningModule> modules, Set<String> completedConceptIds) {
        List<String> orderedConceptIds = modules.stream()
                .sorted(Comparator.comparingInt(LearningModule::getOrderIndex))
                .map(LearningModule::getConceptIds)
                .flatMap(Collection::stream)
                .toList();
        Map<String, Concept> concepts = conceptRepository.findAllById(orderedConceptIds)
                .stream()
                .collect(Collectors.toMap(Concept::getId, Function.identity()));
        return orderedConceptIds.stream()
                .filter(conceptId -> !completedConceptIds.contains(conceptId))
                .map(concepts::get)
                .filter(concept -> concept != null)
                .map(Concept::getName)
                .findFirst()
                .orElse("Skill completed");
    }

    private void touch(UserProgress progress) {
        Instant now = Instant.now();
        LocalDate today = LocalDate.ofInstant(now, ZoneOffset.UTC);
        LocalDate lastActivity = Optional.ofNullable(progress.getLastActivityAt())
                .map(instant -> LocalDate.ofInstant(instant, ZoneOffset.UTC))
                .orElse(null);
        if (lastActivity == null) {
            progress.setStreakDays(1);
        } else if (lastActivity.plusDays(1).equals(today)) {
            progress.setStreakDays(progress.getStreakDays() + 1);
        } else if (!lastActivity.equals(today)) {
            progress.setStreakDays(1);
        }
        if (progress.getStreakDays() >= 7) {
            award(progress.getUserId(), "7 Day Streak");
        }
        progress.setLastActivityAt(now);
        progress.setUpdatedAt(now);
    }

    private UserProgress progress(String userId, String skillId) {
        return progressRepository.findByUserIdAndSkillId(userId, skillId)
                .orElseGet(() -> progressRepository.save(new UserProgress(userId, skillId)));
    }

    private List<LearningDtos.BadgeView> badgeViews(String userId) {
        List<UserBadge> userBadges = userBadgeRepository.findByUserId(userId);
        Map<String, UserBadge> awarded = userBadges.stream()
                .collect(Collectors.toMap(UserBadge::getBadgeId, Function.identity(), (first, second) -> first, LinkedHashMap::new));
        return badgeRepository.findAllById(awarded.keySet())
                .stream()
                .map(badge -> toBadgeView(badge, awarded.get(badge.getId())))
                .toList();
    }

    private LearningDtos.BadgeView toBadgeView(Badge badge, UserBadge userBadge) {
        return new LearningDtos.BadgeView(
                badge.getId(),
                badge.getName(),
                badge.getDescription(),
                badge.getIcon(),
                badge.getType(),
                userBadge == null ? null : userBadge.getAwardedAt()
        );
    }

    private void award(String userId, String badgeName) {
        Badge badge = badgeRepository.findByName(badgeName).orElse(null);
        if (badge == null || userBadgeRepository.findByUserIdAndBadgeId(userId, badge.getId()).isPresent()) {
            return;
        }
        try {
            userBadgeRepository.save(new UserBadge(userId, badge.getId()));
        } catch (DuplicateKeyException ignored) {
            // Another request already awarded the same badge.
        }
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
