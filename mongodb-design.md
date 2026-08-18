# MongoDB Database Design

Database name:

```text
codefriendly
```

## Collections

### users

Stores learner accounts and selected skill IDs.

```json
{
  "_id": "ObjectId",
  "name": "Learner Name",
  "email": "learner@example.com",
  "password": "bcrypt-hash",
  "college": "College Name",
  "branch": "Computer Science",
  "year": "Third Year",
  "roles": ["LEARNER"],
  "selectedSkillIds": ["skillId"]
}
```

### skills

Stores skill cards and ordering.

```json
{
  "_id": "ObjectId",
  "name": "Java",
  "slug": "java",
  "description": "Build strong programming fundamentals.",
  "difficulty": "Beginner",
  "color": "#2563EB",
  "orderIndex": 1
}
```

### modules

Stores roadmap modules for a skill.

```json
{
  "_id": "ObjectId",
  "skillId": "skillId",
  "name": "Java Basics",
  "description": "Start with values and repeated logic.",
  "orderIndex": 1,
  "conceptIds": ["conceptId"]
}
```

### concepts

Stores the shared concept once and keeps skill-specific implementations inside the document.

```json
{
  "_id": "ObjectId",
  "name": "Arrays",
  "slug": "arrays",
  "category": "Data Structures",
  "description": "Keep multiple related values under one name.",
  "implementations": [
    {
      "skillId": "javaSkillId",
      "skillSlug": "java",
      "skillName": "Java",
      "definition": "A Java array stores a fixed number of same-type values.",
      "syntax": "int[] marks = {85, 90, 95};",
      "codeExample": "int[] marks = {85, 90, 95};",
      "advantages": ["Improves structure"],
      "commonMistakes": ["Skipping small examples"],
      "interviewQuestions": ["Why are arrays useful?"]
    }
  ]
}
```

### practice_questions

Stores practice questions per skill and concept.

### quizzes

Stores quiz questions per skill and concept. Correct answers are returned only after quiz submission.

### progress

Tracks each learner's progress per skill.

```json
{
  "_id": "ObjectId",
  "userId": "userId",
  "skillId": "skillId",
  "completedConceptIds": ["conceptId"],
  "completedModuleIds": ["moduleId"],
  "quizScores": {
    "conceptId": 90
  },
  "streakDays": 3
}
```

### badges and user_badges

`badges` stores badge definitions. `user_badges` stores earned learner badges.

## Why MongoDB Works Here

Smart Compare Mode needs one shared concept with multiple language-specific implementations. MongoDB fits this by keeping the stable concept fields and implementation array together, while still referencing skills and modules by ID for scalable roadmaps and progress tracking.
