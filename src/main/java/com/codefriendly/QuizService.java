package com.codefriendly.service;

import com.codefriendly.dto.LearningDtos;
import com.codefriendly.entity.Quiz;
import com.codefriendly.exception.ResourceNotFoundException;
import com.codefriendly.repository.QuizRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final ProgressService progressService;

    public QuizService(QuizRepository quizRepository, ProgressService progressService) {
        this.quizRepository = quizRepository;
        this.progressService = progressService;
    }

    public LearningDtos.QuizResult submit(String email, LearningDtos.QuizSubmitRequest request) {
        Quiz quiz = quizRepository.findById(request.quizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));
        int score = 0;
        List<LearningDtos.QuizAnswerResult> answerResults = new ArrayList<>();
        for (Quiz.Question question : quiz.getQuestions()) {
            Integer answer = request.answers().get(question.getId());
            boolean correct = answer != null && answer == question.getCorrectOptionIndex();
            if (correct) {
                score++;
            }
            answerResults.add(new LearningDtos.QuizAnswerResult(
                    question.getId(),
                    correct,
                    question.getCorrectOptionIndex(),
                    question.getExplanation()
            ));
        }
        int total = quiz.getQuestions().size();
        int percentage = total == 0 ? 0 : Math.round((score * 100f) / total);
        progressService.recordQuizScore(email, request.skillId(), request.conceptId(), percentage);
        return new LearningDtos.QuizResult(score, total, percentage, answerResults);
    }
}
