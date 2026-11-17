package com.codefriendly.service;

import com.codefriendly.dto.LearningDtos;
import com.codefriendly.entity.Concept;
import com.codefriendly.entity.LearningModule;
import com.codefriendly.entity.PracticeQuestion;
import com.codefriendly.entity.Quiz;
import com.codefriendly.entity.Skill;
import com.codefriendly.entity.User;
import com.codefriendly.entity.UserProgress;
import com.codefriendly.exception.ResourceNotFoundException;
import com.codefriendly.repository.ConceptRepository;
import com.codefriendly.repository.LearningModuleRepository;
import com.codefriendly.repository.PracticeQuestionRepository;
import com.codefriendly.repository.QuizRepository;
import com.codefriendly.repository.SkillRepository;
import com.codefriendly.repository.UserProgressRepository;
import com.codefriendly.repository.UserRepository;
import java.util.ArrayList;
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
import org.springframework.stereotype.Service;

@Service
public class LearningService {

    private final SkillRepository skillRepository;
    private final LearningModuleRepository moduleRepository;
    private final ConceptRepository conceptRepository;
    private final PracticeQuestionRepository practiceQuestionRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final UserProgressRepository progressRepository;

    public LearningService(
            SkillRepository skillRepository,
            LearningModuleRepository moduleRepository,
            ConceptRepository conceptRepository,
            PracticeQuestionRepository practiceQuestionRepository,
            QuizRepository quizRepository,
            UserRepository userRepository,
            UserProgressRepository progressRepository
    ) {
        this.skillRepository = skillRepository;
        this.moduleRepository = moduleRepository;
        this.conceptRepository = conceptRepository;
        this.practiceQuestionRepository = practiceQuestionRepository;
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
    }

    public List<LearningDtos.SkillCard> skills() {
        return skillRepository.findAllByOrderByOrderIndexAsc()
                .stream()
                .map(this::toSkillCard)
                .toList();
    }

    public List<LearningDtos.SkillCard> selectSkills(String email, LearningDtos.SelectSkillsRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Set<String> selectedIds = new LinkedHashSet<>();
        for (String skillIdentifier : request.skillIds()) {
            Skill skill = findSkill(skillIdentifier);
            selectedIds.add(skill.getId());
            progressRepository.findByUserIdAndSkillId(user.getId(), skill.getId())
                    .orElseGet(() -> progressRepository.save(new UserProgress(user.getId(), skill.getId())));
        }
        user.setSelectedSkillIds(selectedIds);
        userRepository.save(user);
        return selectedIds.stream()
                .map(this::findSkill)
                .map(this::toSkillCard)
                .toList();
    }

    public LearningDtos.RoadmapResponse roadmap(String skillIdentifier, String email) {
        Skill skill = findSkill(skillIdentifier);
        Set<String> completedConcepts = completedConcepts(email, skill.getId());
        Set<String> completedModules = completedModules(email, skill.getId());
        List<LearningModule> modules = moduleRepository.findBySkillIdOrderByOrderIndexAsc(skill.getId());
        List<LearningDtos.ModuleView> moduleViews = modules.stream()
                .map(module -> toModuleView(module, completedConcepts, completedModules))
                .toList();
        int totalConcepts = modules.stream().map(LearningModule::getConceptIds).flatMap(Collection::stream).collect(Collectors.toSet()).size();
        return new LearningDtos.RoadmapResponse(toSkillCard(skill), moduleViews, totalConcepts);
    }

    public LearningDtos.TopicView topic(String skillIdentifier, String conceptIdentifier) {
        Skill skill = findSkill(skillIdentifier);
        Concept concept = findConcept(conceptIdentifier);
        Concept.TopicImplementation implementation = implementationFor(concept, skill);
        List<LearningDtos.PracticeView> practice = practiceByIds(skill.getId(), concept.getId());
        LearningDtos.QuizView quiz = quizByIds(skill.getId(), concept.getId()).orElse(null);
        return new LearningDtos.TopicView(
                concept.getId(),
                concept.getName(),
                concept.getSlug(),
                skill.getId(),
                skill.getName(),
                implementation.getDefinition(),
                implementation.getSyntax(),
                implementation.getExplanation(),
                implementation.getRealWorldExample(),
                implementation.getCodeExample(),
                implementation.getOutput(),
                implementation.getAdvantages(),
                implementation.getDisadvantages(),
                implementation.getCommonMistakes(),
                implementation.getInterviewQuestions(),
                practice,
                quiz
        );
    }

    public List<LearningDtos.PracticeView> practice(String skillIdentifier, String conceptIdentifier) {
        Skill skill = findSkill(skillIdentifier);
        Concept concept = findConcept(conceptIdentifier);
        return practiceByIds(skill.getId(), concept.getId());
    }

    public Optional<LearningDtos.QuizView> quiz(String skillIdentifier, String conceptIdentifier) {
        Skill skill = findSkill(skillIdentifier);
        Concept concept = findConcept(conceptIdentifier);
        return quizByIds(skill.getId(), concept.getId());
    }

    public LearningDtos.CompareResponse compare(String conceptIdentifier, List<String> skillIdentifiers) {
        Concept concept = findConcept(conceptIdentifier);
        List<Skill> selectedSkills = skillIdentifiers.stream()
                .filter(value -> value != null && !value.isBlank())
                .map(this::findSkill)
                .toList();
        if (selectedSkills.isEmpty()) {
            selectedSkills = skillRepository.findAllByOrderByOrderIndexAsc().stream().limit(2).toList();
        }
        List<LearningDtos.CompareItem> items = selectedSkills.stream()
                .map(skill -> {
                    Concept.TopicImplementation implementation = implementationFor(concept, skill);
                    return new LearningDtos.CompareItem(
                            skill.getId(),
                            skill.getName(),
                            implementation.getDefinition(),
                            implementation.getSyntax(),
                            implementation.getCodeExample(),
                            implementation.getAdvantages(),
                            implementation.getDisadvantages(),
                            implementation.getCommonMistakes(),
                            implementation.getInterviewQuestions()
                    );
                })
                .toList();
        return new LearningDtos.CompareResponse(
                concept.getName(),
                concept.getSlug(),
                items,
                similaritiesFor(concept),
                differencesFor(concept, selectedSkills)
        );
    }

    public Skill findSkill(String identifier) {
        return skillRepository.findById(identifier)
                .or(() -> skillRepository.findBySlug(identifier))
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found: " + identifier));
    }

    public Concept findConcept(String identifier) {
        return conceptRepository.findById(identifier)
                .or(() -> conceptRepository.findBySlug(identifier))
                .orElseThrow(() -> new ResourceNotFoundException("Concept not found: " + identifier));
    }

    public LearningDtos.SkillCard toSkillCard(Skill skill) {
        return new LearningDtos.SkillCard(
                skill.getId(),
                skill.getName(),
                skill.getSlug(),
                skill.getDescription(),
                skill.getDifficulty(),
                skill.getImageUrl(),
                skill.getColor()
        );
    }

    private LearningDtos.ModuleView toModuleView(LearningModule module, Set<String> completedConcepts, Set<String> completedModules) {
        Map<String, Concept> concepts = conceptRepository.findAllById(module.getConceptIds())
                .stream()
                .collect(Collectors.toMap(Concept::getId, Function.identity()));
        List<LearningDtos.ConceptView> conceptViews = module.getConceptIds()
                .stream()
                .map(concepts::get)
                .filter(concept -> concept != null)
                .map(concept -> new LearningDtos.ConceptView(
                        concept.getId(),
                        concept.getName(),
                        concept.getSlug(),
                        concept.getCategory(),
                        concept.getDescription(),
                        completedConcepts.contains(concept.getId())
                ))
                .toList();
        return new LearningDtos.ModuleView(
                module.getId(),
                module.getName(),
                module.getDescription(),
                module.getOrderIndex(),
                conceptViews,
                completedModules.contains(module.getId())
        );
    }

    private List<LearningDtos.PracticeView> practiceByIds(String skillId, String conceptId) {
        return practiceQuestionRepository.findBySkillIdAndConceptId(skillId, conceptId)
                .stream()
                .map(this::toPracticeView)
                .toList();
    }

    private Optional<LearningDtos.QuizView> quizByIds(String skillId, String conceptId) {
        return quizRepository.findBySkillIdAndConceptId(skillId, conceptId).map(this::toQuizView);
    }

    private LearningDtos.PracticeView toPracticeView(PracticeQuestion question) {
        return new LearningDtos.PracticeView(
                question.getId(),
                question.getTitle(),
                question.getDifficulty(),
                question.getPrompt(),
                question.getSampleInput(),
                question.getSampleOutput(),
                question.getExpectedOutput(),
                question.getHints()
        );
    }

    private LearningDtos.QuizView toQuizView(Quiz quiz) {
        List<LearningDtos.QuestionView> questions = quiz.getQuestions()
                .stream()
                .map(question -> new LearningDtos.QuestionView(question.getId(), question.getText(), question.getOptions()))
                .toList();
        return new LearningDtos.QuizView(quiz.getId(), quiz.getTitle(), questions);
    }

    private Concept.TopicImplementation implementationFor(Concept concept, Skill skill) {
        return concept.getImplementations()
                .stream()
                .filter(implementation -> skill.getId().equals(implementation.getSkillId())
                        || skill.getSlug().equals(implementation.getSkillSlug()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No " + skill.getName() + " implementation for " + concept.getName()));
    }

    private Set<String> completedConcepts(String email, String skillId) {
        if (email == null) {
            return Set.of();
        }
        return userRepository.findByEmail(email)
                .flatMap(user -> progressRepository.findByUserIdAndSkillId(user.getId(), skillId))
                .map(UserProgress::getCompletedConceptIds)
                .orElse(Set.of());
    }

    private Set<String> completedModules(String email, String skillId) {
        if (email == null) {
            return Set.of();
        }
        return userRepository.findByEmail(email)
                .flatMap(user -> progressRepository.findByUserIdAndSkillId(user.getId(), skillId))
                .map(UserProgress::getCompletedModuleIds)
                .orElse(Set.of());
    }

    private List<String> similaritiesFor(Concept concept) {
        return switch (concept.getSlug()) {
            case "arrays" -> List.of(
                    "Arrays store multiple values under one name.",
                    "Index-based access is central in every language.",
                    "Looping through array values is a common pattern."
            );
            case "loops" -> List.of(
                    "Loops repeat a block until a condition or sequence ends.",
                    "Every language supports fixed-count and condition-based iteration.",
                    "Loop control statements help skip or stop execution."
            );
            default -> List.of(
                    "The core problem-solving idea stays the same across skills.",
                    "Syntax changes, but the concept helps structure logic.",
                    "Practice makes language-specific differences easier to remember."
            );
        };
    }

    private List<String> differencesFor(Concept concept, List<Skill> skills) {
        List<String> names = skills.stream().map(Skill::getName).toList();
        if ("arrays".equals(concept.getSlug())) {
            return List.of(
                    String.join(" vs ", names) + " differs mostly in syntax, typing rules, and built-in methods.",
                    "Java arrays are fixed-size, while Python lists and JavaScript arrays are dynamic.",
                    "Error behavior differs when indexes are outside the valid range."
            );
        }
        if ("functions".equals(concept.getSlug())) {
            return List.of(
                    "Return type declaration depends on the language.",
                    "Parameter typing can be explicit, inferred, or dynamic.",
                    "Function placement differs in class-based and script-based code."
            );
        }
        return new ArrayList<>(List.of(
                "Keywords and punctuation change from language to language.",
                "Type systems influence how much the compiler catches before execution.",
                "Standard libraries provide different shortcuts for the same concept."
        ));
    }
}
