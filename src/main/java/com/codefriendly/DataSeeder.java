package com.codefriendly.config;

import com.codefriendly.entity.Badge;
import com.codefriendly.entity.Concept;
import com.codefriendly.entity.LearningModule;
import com.codefriendly.entity.PracticeQuestion;
import com.codefriendly.entity.Quiz;
import com.codefriendly.entity.Skill;
import com.codefriendly.entity.User;
import com.codefriendly.entity.UserProgress;
import com.codefriendly.repository.BadgeRepository;
import com.codefriendly.repository.ConceptRepository;
import com.codefriendly.repository.LearningModuleRepository;
import com.codefriendly.repository.PracticeQuestionRepository;
import com.codefriendly.repository.QuizRepository;
import com.codefriendly.repository.SkillRepository;
import com.codefriendly.repository.UserProgressRepository;
import com.codefriendly.repository.UserRepository;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements ApplicationRunner {

    private final SkillRepository skillRepository;
    private final ConceptRepository conceptRepository;
    private final LearningModuleRepository moduleRepository;
    private final PracticeQuestionRepository practiceQuestionRepository;
    private final QuizRepository quizRepository;
    private final BadgeRepository badgeRepository;
    private final UserRepository userRepository;
    private final UserProgressRepository progressRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            SkillRepository skillRepository,
            ConceptRepository conceptRepository,
            LearningModuleRepository moduleRepository,
            PracticeQuestionRepository practiceQuestionRepository,
            QuizRepository quizRepository,
            BadgeRepository badgeRepository,
            UserRepository userRepository,
            UserProgressRepository progressRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.skillRepository = skillRepository;
        this.conceptRepository = conceptRepository;
        this.moduleRepository = moduleRepository;
        this.practiceQuestionRepository = practiceQuestionRepository;
        this.quizRepository = quizRepository;
        this.badgeRepository = badgeRepository;
        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (skillRepository.count() > 0) {
            return;
        }

        Map<String, Skill> skills = seedSkills();
        Map<String, Concept> concepts = seedConcepts(skills);
        seedModules(skills, concepts);
        seedPracticeAndQuizzes(concepts.values());
        seedBadges();
        seedDemoUser(skills, concepts);
    }

    private Map<String, Skill> seedSkills() {
        List<Skill> saved = skillRepository.saveAll(List.of(
                new Skill("Java", "java", "Build strong programming fundamentals with Java 21 and OOP.", "Beginner", "", "#2563EB", 1),
                new Skill("Python", "python", "Learn clean scripting, problem solving, and automation basics.", "Beginner", "", "#16A34A", 2),
                new Skill("JavaScript", "javascript", "Understand browser logic, DOM behavior, and modern web basics.", "Beginner", "", "#F59E0B", 3),
                new Skill("C++", "c-plus-plus", "Practice performance-aware coding, memory basics, and STL thinking.", "Intermediate", "", "#7C3AED", 4),
                new Skill("Spring Boot", "spring-boot", "Create REST APIs with dependency injection, security, and MongoDB.", "Intermediate", "", "#22C55E", 5),
                new Skill("SQL", "sql", "Learn relational thinking, queries, joins, and data modeling.", "Beginner", "", "#0F766E", 6),
                new Skill("AWS", "aws", "Start cloud fundamentals with compute, storage, and deployment concepts.", "Beginner", "", "#EA580C", 7),
                new Skill("AI/ML", "ai-ml", "Learn model training, supervised learning, and evaluation basics.", "Intermediate", "", "#DB2777", 8)
        ));
        return saved.stream().collect(Collectors.toMap(Skill::getSlug, Function.identity()));
    }

    private Map<String, Concept> seedConcepts(Map<String, Skill> skills) {
        List<Concept> concepts = new ArrayList<>();
        concepts.add(concept("Variables", "variables", "Programming Basics", "Store and reuse values while solving problems."));
        concepts.add(concept("Data Types", "data-types", "Programming Basics", "Choose the right kind of value for text, numbers, booleans, and objects."));
        concepts.add(concept("Operators", "operators", "Programming Basics", "Calculate, compare, and combine values in expressions."));
        concepts.add(concept("Conditionals", "conditionals", "Control Flow", "Run different code paths when a condition is true or false."));
        concepts.add(concept("Arrays", "arrays", "Data Structures", "Keep multiple related values under one name."));
        concepts.add(concept("Strings", "strings", "Programming Basics", "Work with text, characters, formatting, and common text operations."));
        concepts.add(concept("Loops", "loops", "Control Flow", "Repeat work predictably without writing duplicate code."));
        concepts.add(concept("Functions", "functions", "Code Organization", "Group reusable logic behind a clear name."));
        concepts.add(concept("OOP", "oop", "Object-Oriented Programming", "Model real-world behavior with classes, objects, and methods."));
        concepts.add(concept("Classes", "classes", "Object-Oriented Programming", "Design a blueprint that groups state and behavior."));
        concepts.add(concept("Inheritance", "inheritance", "Object-Oriented Programming", "Reuse and specialize behavior from an existing type."));
        concepts.add(concept("Collections", "collections", "Data Structures", "Use flexible built-in containers for lists, maps, sets, and queues."));
        concepts.add(concept("Recursion", "recursion", "Problem Solving", "Solve a problem by breaking it into smaller versions of itself."));
        concepts.add(concept("Exception Handling", "exception-handling", "Reliability", "Handle runtime problems without crashing the full program."));
        concepts.add(concept("Java Introduction", "java-introduction", "Java Basics", "Understand what Java is, where it runs, and why students use it."));
        concepts.add(concept("JDK Setup", "java-setup", "Java Basics", "Install the JDK and understand compile-and-run commands."));
        concepts.add(concept("Program Structure", "java-program-structure", "Java Basics", "Read the class, main method, statements, braces, and semicolons in a Java file."));
        concepts.add(concept("Input And Output", "java-input-output", "Java Basics", "Read learner input and print clear program output."));
        concepts.add(concept("Type Casting", "java-type-casting", "Java Basics", "Convert values between compatible Java data types safely."));
        concepts.add(concept("2D Arrays", "java-arrays-2d", "Java Data Structures", "Store rows and columns of values in a matrix-like structure."));
        concepts.add(concept("Constructors", "java-constructors", "Java OOP", "Initialize objects with required starting values."));
        concepts.add(concept("Encapsulation", "java-encapsulation", "Java OOP", "Group related data and behavior inside one easy-to-understand class."));
        concepts.add(concept("Polymorphism", "java-polymorphism", "Java OOP", "Use one parent reference to call behavior from different child objects."));
        concepts.add(concept("Abstraction", "java-abstraction", "Java OOP", "Hide implementation details behind abstract classes or methods."));
        concepts.add(concept("Interfaces", "java-interfaces", "Java OOP", "Define behavior contracts that multiple classes can implement."));
        concepts.add(concept("Packages", "java-packages", "Java Project Structure", "Organize Java classes into folders and namespaces."));
        concepts.add(concept("File Handling", "java-file-handling", "Java Practical Skills", "Read and write files using Java library classes."));
        concepts.add(concept("Generics", "java-generics", "Java Practical Skills", "Write type-safe reusable classes, methods, and collections."));
        concepts.add(concept("Lambda And Streams", "java-lambda-streams", "Java Practical Skills", "Process collections with concise functional-style Java."));
        concepts.add(concept("REST API", "rest-api", "Backend", "Expose resources through predictable HTTP endpoints."));
        concepts.add(concept("Dependency Injection", "dependency-injection", "Backend", "Provide dependencies from the framework instead of constructing them manually."));
        concepts.add(concept("Spring Security", "spring-security", "Backend Security", "Protect APIs with authentication, authorization, and filters."));
        concepts.add(concept("Tables", "tables", "Database Basics", "Organize structured records into rows and columns."));
        concepts.add(concept("Queries", "queries", "Database Basics", "Read and filter useful information from stored data."));
        concepts.add(concept("Joins", "joins", "Database Relationships", "Combine related records from more than one table."));
        concepts.add(concept("Cloud Basics", "cloud-basics", "Cloud", "Understand on-demand infrastructure and managed services."));
        concepts.add(concept("EC2", "ec2", "Cloud Compute", "Run virtual servers for backend workloads."));
        concepts.add(concept("S3", "s3", "Cloud Storage", "Store files and static assets in durable object storage."));
        concepts.add(concept("Supervised Learning", "supervised-learning", "Machine Learning", "Train a model from examples that already include correct answers."));
        concepts.add(concept("Model Training", "model-training", "Machine Learning", "Fit a model to data so it can make predictions."));
        concepts.add(concept("Evaluation", "evaluation", "Machine Learning", "Measure how well a model performs on unseen data."));

        List<String> languageConcepts = List.of(
                "variables", "data-types", "operators", "conditionals",
                "strings", "arrays", "loops", "functions", "collections", "recursion",
                "oop", "classes", "inheritance", "exception-handling"
        );
        List<Skill> languageSkills = List.of(skills.get("java"), skills.get("python"), skills.get("javascript"), skills.get("c-plus-plus"));
        concepts.stream()
                .filter(concept -> languageConcepts.contains(concept.getSlug()))
                .forEach(concept -> languageSkills.forEach(skill -> concept.getImplementations().add(languageImplementation(skill, concept.getSlug()))));

        List<String> javaOnlyConcepts = List.of(
                "java-introduction", "java-setup", "java-program-structure", "java-input-output", "java-type-casting",
                "java-arrays-2d", "java-constructors", "java-encapsulation", "java-polymorphism", "java-abstraction",
                "java-interfaces", "java-packages", "java-file-handling", "java-generics", "java-lambda-streams"
        );
        concepts.stream()
                .filter(concept -> javaOnlyConcepts.contains(concept.getSlug()))
                .forEach(concept -> concept.getImplementations().add(javaImplementation(skills.get("java"), concept.getSlug())));

        find(concepts, "rest-api").getImplementations().add(implementation(
                skills.get("spring-boot"),
                "A Spring Boot REST API exposes resources such as skills, topics, and progress through HTTP endpoints.",
                "@GetMapping(\"/skills\")",
                """
                @RestController
                @RequestMapping("/api/skills")
                class SkillController {
                    @GetMapping
                    List<SkillDto> allSkills() {
                        return skillService.findAll();
                    }
                }
                """,
                "JSON response with available skills"
        ));
        find(concepts, "dependency-injection").getImplementations().add(implementation(
                skills.get("spring-boot"),
                "Dependency injection lets Spring create and provide service objects where they are needed.",
                "public Controller(Service service) { this.service = service; }",
                """
                @Service
                class RoadmapService {
                    private final SkillRepository skills;

                    RoadmapService(SkillRepository skills) {
                        this.skills = skills;
                    }
                }
                """,
                "Spring wires SkillRepository automatically"
        ));
        find(concepts, "spring-security").getImplementations().add(implementation(
                skills.get("spring-boot"),
                "Spring Security protects website APIs with filters, password encoding, and authorization rules.",
                "http.authorizeHttpRequests(auth -> auth.anyRequest().authenticated())",
                """
                @Bean
                SecurityFilterChain security(HttpSecurity http) throws Exception {
                    return http.csrf(csrf -> csrf.disable())
                            .authorizeHttpRequests(auth -> auth
                                    .requestMatchers("/api/auth/**").permitAll()
                                    .anyRequest().authenticated())
                            .build();
                }
                """,
                "Only authenticated learners access protected data"
        ));

        find(concepts, "tables").getImplementations().add(implementation(
                skills.get("sql"),
                "A table stores one type of record, such as users, skills, or quiz attempts.",
                "CREATE TABLE students (...);",
                """
                CREATE TABLE students (
                    id INT PRIMARY KEY,
                    name VARCHAR(80),
                    branch VARCHAR(80)
                );
                """,
                "Table created"
        ));
        find(concepts, "queries").getImplementations().add(implementation(
                skills.get("sql"),
                "A query asks the database for rows that match selected columns, filters, and sorting rules.",
                "SELECT column FROM table WHERE condition;",
                """
                SELECT name, branch
                FROM students
                WHERE branch = 'CSE'
                ORDER BY name;
                """,
                "Filtered student rows"
        ));
        find(concepts, "joins").getImplementations().add(implementation(
                skills.get("sql"),
                "A join combines rows from related tables, usually through primary and foreign keys.",
                "SELECT ... FROM a JOIN b ON a.id = b.a_id;",
                """
                SELECT students.name, badges.name AS badge
                FROM students
                JOIN user_badges ON students.id = user_badges.student_id
                JOIN badges ON badges.id = user_badges.badge_id;
                """,
                "Student names with earned badges"
        ));

        find(concepts, "cloud-basics").getImplementations().add(implementation(
                skills.get("aws"),
                "Cloud basics explain how rented compute, storage, networking, and managed services replace manual servers.",
                "Region -> VPC -> Compute -> Storage -> Monitoring",
                "Choose a region, create a secure network, deploy the backend, store assets, and monitor usage.",
                "A deployable cloud architecture plan"
        ));
        find(concepts, "ec2").getImplementations().add(implementation(
                skills.get("aws"),
                "EC2 provides virtual machines that can run a Spring Boot backend or supporting worker services.",
                "AMI + instance type + security group + key pair",
                "Launch a small instance, open only required ports, install Java, and run the backend jar.",
                "Backend reachable from a public URL"
        ));
        find(concepts, "s3").getImplementations().add(implementation(
                skills.get("aws"),
                "S3 stores static website assets, uploaded files, backups, and generated reports as objects.",
                "bucket/key",
                "Upload frontend assets to a bucket, enable hosting or serve through CloudFront, and keep write access private.",
                "Static files delivered reliably"
        ));

        find(concepts, "supervised-learning").getImplementations().add(implementation(
                skills.get("ai-ml"),
                "Supervised learning uses labeled examples so a model can learn the relationship between inputs and outputs.",
                "features + label -> model",
                "Train with student practice history and quiz scores to predict which topic needs revision next.",
                "A prediction for the next weak topic"
        ));
        find(concepts, "model-training").getImplementations().add(implementation(
                skills.get("ai-ml"),
                "Model training adjusts model parameters so predictions become closer to correct answers.",
                "split data -> train -> validate -> tune",
                "Split the dataset, train a classifier, tune hyperparameters, and compare validation scores.",
                "A trained model artifact"
        ));
        find(concepts, "evaluation").getImplementations().add(implementation(
                skills.get("ai-ml"),
                "Evaluation checks model quality on data that was not used for training.",
                "accuracy, precision, recall, F1",
                "Use a test set to measure accuracy and inspect mistakes before trusting the model.",
                "Clear metrics and improvement direction"
        ));

        List<Concept> saved = conceptRepository.saveAll(concepts);
        return saved.stream().collect(Collectors.toMap(Concept::getSlug, Function.identity()));
    }

    private void seedModules(Map<String, Skill> skills, Map<String, Concept> concepts) {
        moduleRepository.saveAll(List.of(
                module(skills.get("java"), "Java Getting Started", "Understand Java, the JDK, program structure, and console input/output.", 1, concepts, "java-introduction", "java-setup", "java-program-structure", "java-input-output"),
                module(skills.get("java"), "Java Fundamentals", "Start with values, types, calculations, decisions, and safe conversions.", 2, concepts, "variables", "data-types", "operators", "conditionals", "java-type-casting"),
                module(skills.get("java"), "Java Problem Solving", "Practice text, arrays, 2D arrays, loops, methods, collections, and recursion.", 3, concepts, "strings", "arrays", "java-arrays-2d", "loops", "functions", "collections", "recursion"),
                module(skills.get("java"), "Java OOP Deep Dive", "Move into objects, classes, constructors, encapsulation, inheritance, polymorphism, abstraction, and interfaces.", 4, concepts, "oop", "classes", "java-constructors", "java-encapsulation", "inheritance", "java-polymorphism", "java-abstraction", "java-interfaces"),
                module(skills.get("java"), "Java Practical Skills", "Handle exceptions, organize packages, work with files, use generics, and process data with streams.", 5, concepts, "exception-handling", "java-packages", "java-file-handling", "java-generics", "java-lambda-streams"),
                module(skills.get("python"), "Python Fundamentals", "Use readable syntax for values, types, calculations, and decisions.", 1, concepts, "variables", "data-types", "operators", "conditionals"),
                module(skills.get("python"), "Python Problem Solving", "Practice text, lists, loops, functions, collections, and recursion.", 2, concepts, "strings", "arrays", "loops", "functions", "collections", "recursion"),
                module(skills.get("python"), "Python OOP and Reliability", "Organize larger scripts with objects, classes, inheritance, and exceptions.", 3, concepts, "oop", "classes", "inheritance", "exception-handling"),
                module(skills.get("javascript"), "JavaScript Fundamentals", "Learn values, types, expressions, and browser-friendly decision logic.", 1, concepts, "variables", "data-types", "operators", "conditionals"),
                module(skills.get("javascript"), "JavaScript Problem Solving", "Practice strings, arrays, loops, functions, collections, and recursion.", 2, concepts, "strings", "arrays", "loops", "functions", "collections", "recursion"),
                module(skills.get("javascript"), "JavaScript OOP and Reliability", "Use objects, classes, inheritance, and runtime error handling.", 3, concepts, "oop", "classes", "inheritance", "exception-handling"),
                module(skills.get("c-plus-plus"), "C++ Fundamentals", "Practice typed values, operators, decisions, and efficient basics.", 1, concepts, "variables", "data-types", "operators", "conditionals"),
                module(skills.get("c-plus-plus"), "C++ Problem Solving", "Use strings, arrays, loops, functions, STL containers, and recursion.", 2, concepts, "strings", "arrays", "loops", "functions", "collections", "recursion"),
                module(skills.get("c-plus-plus"), "C++ OOP and Reliability", "Build classes, inheritance, and careful runtime handling.", 3, concepts, "oop", "classes", "inheritance", "exception-handling"),
                module(skills.get("spring-boot"), "REST Backend", "Build clean HTTP APIs with Spring Boot.", 1, concepts, "rest-api", "dependency-injection"),
                module(skills.get("spring-boot"), "Secure Backend", "Protect APIs using Spring Security.", 2, concepts, "spring-security"),
                module(skills.get("sql"), "Database Basics", "Create structures and ask useful questions of data.", 1, concepts, "tables", "queries"),
                module(skills.get("sql"), "Relationships", "Connect related records with joins.", 2, concepts, "joins"),
                module(skills.get("aws"), "Cloud Foundations", "Understand the services used to host web projects.", 1, concepts, "cloud-basics", "ec2", "s3"),
                module(skills.get("ai-ml"), "ML Foundations", "Learn the training and evaluation loop.", 1, concepts, "supervised-learning", "model-training", "evaluation")
        ));
    }

    private void seedPracticeAndQuizzes(Collection<Concept> concepts) {
        List<PracticeQuestion> practices = new ArrayList<>();
        List<Quiz> quizzes = new ArrayList<>();
        for (Concept concept : concepts) {
            for (Concept.TopicImplementation implementation : concept.getImplementations()) {
                PracticeQuestion practice = new PracticeQuestion(
                        implementation.getSkillId(),
                        concept.getId(),
                        "Practice " + concept.getName() + " in " + implementation.getSkillName(),
                        practiceDifficulty(concept.getSlug()),
                        practicePrompt(concept.getSlug(), concept.getName(), implementation.getSkillName())
                );
                practice.setSampleInput(sampleInputFor(concept.getSlug()));
                practice.setSampleOutput(implementation.getOutput());
                practice.setExpectedOutput(implementation.getSkillName() + " solution that prints exactly: " + implementation.getOutput());
                practice.setHints(practiceHints(concept.getSlug(), implementation.getSkillName()));
                practices.add(practice);

                Quiz quiz = new Quiz(implementation.getSkillId(), concept.getId(), concept.getName() + " Quiz");
                quiz.setQuestions(List.of(
                        new Quiz.Question(
                                "q1",
                                "What is the main purpose of " + concept.getName() + "?",
                                List.of(implementation.getDefinition(), "To decorate the page visually", "To replace authentication", "To skip testing"),
                                0,
                                implementation.getDefinition()
                        ),
                        new Quiz.Question(
                                "q2",
                                "Which item is a common beginner mistake?",
                                List.of("Writing clear names", firstOrDefault(implementation.getCommonMistakes(), "Ignoring the concept rules"), "Testing small examples", "Reading error messages"),
                                1,
                                firstOrDefault(implementation.getCommonMistakes(), "Beginners often miss the rules that make the concept reliable.")
                        ),
                        new Quiz.Question(
                                "q3",
                                "What is a good next step after learning this topic?",
                                List.of("Memorize without practicing", "Avoid examples", "Build a short practice solution", "Delete the code"),
                                2,
                                "Practice turns syntax knowledge into usable problem-solving skill."
                        )
                ));
                quizzes.add(quiz);
            }
        }
        practiceQuestionRepository.saveAll(practices);
        quizRepository.saveAll(quizzes);
    }

    private String practiceDifficulty(String conceptSlug) {
        return switch (conceptSlug) {
            case "arrays", "loops", "functions", "collections", "recursion", "oop", "classes", "inheritance", "exception-handling",
                    "java-arrays-2d", "java-constructors", "java-encapsulation", "java-polymorphism", "java-abstraction",
                    "java-interfaces", "java-packages", "java-file-handling", "java-generics", "java-lambda-streams" -> "Medium";
            default -> "Easy";
        };
    }

    private String practicePrompt(String conceptSlug, String conceptName, String skillName) {
        return switch (conceptSlug) {
            case "variables" -> "Read a learner name and score, then print a score sentence using " + skillName + ".";
            case "data-types" -> "Store a name, attempt count, CGPA, and active status, then print them using " + skillName + ".";
            case "operators" -> "Read theory and lab marks, add them, and print the total using " + skillName + ".";
            case "conditionals" -> "Read one score and print Pass when it is 40 or above using " + skillName + ".";
            case "strings" -> "Read a skill name and print it in a learning message using " + skillName + ".";
            case "arrays" -> "Read three marks, keep them in an array or list, and print the total using " + skillName + ".";
            case "loops" -> "Read a limit and print numbers from 1 to that limit using " + skillName + ".";
            case "functions" -> "Create a reusable add function and print the result using " + skillName + ".";
            case "collections" -> "Store three skills in a collection and print how many were added using " + skillName + ".";
            case "recursion" -> "Create a recursive factorial function and print factorial of 5 using " + skillName + ".";
            case "oop" -> "Create a student object and print its name using " + skillName + ".";
            case "classes" -> "Create a course class and print its label using " + skillName + ".";
            case "inheritance" -> "Create a specialized course type and print the inherited course name using " + skillName + ".";
            case "exception-handling" -> "Handle division by zero and print a clear error message using " + skillName + ".";
            case "java-introduction" -> "Write your first Java program and print a welcome message.";
            case "java-setup" -> "Create a Main.java style program that proves the JDK is ready.";
            case "java-program-structure" -> "Write a complete Java program that prints the start message.";
            case "java-input-output" -> "Read a name and score, then print the formatted result.";
            case "java-type-casting" -> "Convert integer total and count into a decimal average.";
            case "java-arrays-2d" -> "Store a 2x2 matrix and print the total of all values.";
            case "java-constructors" -> "Create a Course object with a constructor and print its label.";
            case "java-encapsulation" -> "Create a Student class with id and name, then print both values.";
            case "java-polymorphism" -> "Use a parent Course reference for an OnlineCourse object and print its type.";
            case "java-abstraction" -> "Create an abstract badge rule and print the awarded message from a child class.";
            case "java-interfaces" -> "Create a Trackable interface and a class that prints progress saved.";
            case "java-packages" -> "Show a small package-organized helper that returns a utility message.";
            case "java-file-handling" -> "Write a short note to a file and print the saved text.";
            case "java-generics" -> "Store Java in a type-safe list and print the first skill.";
            case "java-lambda-streams" -> "Filter Java and Spring from a skill list and print them together.";
            default -> "Create a focused " + conceptName.toLowerCase() + " example using " + skillName + ".";
        };
    }

    private String sampleInputFor(String conceptSlug) {
        return switch (conceptSlug) {
            case "variables" -> "Asha 95";
            case "data-types" -> "Asha 3 9.4 true";
            case "operators" -> "45 50";
            case "conditionals" -> "72";
            case "strings" -> "Java";
            case "arrays" -> "80 90 85";
            case "loops" -> "5";
            case "functions" -> "4 5";
            case "collections" -> "Java SQL AWS";
            case "recursion" -> "5";
            case "oop" -> "Asha";
            case "classes", "inheritance" -> "Java";
            case "exception-handling" -> "10 0";
            case "java-introduction", "java-setup", "java-program-structure" -> "no input";
            case "java-input-output" -> "Asha 95";
            case "java-type-casting" -> "95 2";
            case "java-arrays-2d" -> "1 2 3 4";
            case "java-constructors" -> "Java";
            case "java-encapsulation" -> "10 Alice";
            case "java-polymorphism" -> "Online";
            case "java-abstraction" -> "quiz";
            case "java-interfaces" -> "topic";
            case "java-packages" -> "helper";
            case "java-file-handling" -> "Saved notes";
            case "java-generics" -> "Java";
            case "java-lambda-streams" -> "Java SQL Spring";
            default -> "topic example";
        };
    }

    private List<String> practiceHints(String conceptSlug, String skillName) {
        String first = switch (conceptSlug) {
            case "variables" -> "Use one variable for the name and another for the score.";
            case "data-types" -> "Choose suitable data types instead of storing every value as text.";
            case "operators" -> "Use an arithmetic operator for the total.";
            case "conditionals" -> "Use an if/else branch and test the boundary value.";
            case "strings" -> "Apply a string operation such as uppercase formatting.";
            case "arrays" -> "Loop through the values or use a built-in sum helper.";
            case "loops" -> "Keep the loop start and end values clear.";
            case "functions" -> "Return the value from the function before printing it.";
            case "collections" -> "Choose a list, vector, array, map, or set based on the job.";
            case "recursion" -> "Write a base case before the recursive call.";
            case "oop" -> "Keep state and behavior inside the object.";
            case "classes" -> "Use a constructor to set the course name.";
            case "inheritance" -> "Use inheritance only when the child is truly a type of the parent.";
            case "exception-handling" -> "Catch the specific error instead of hiding every failure.";
            case "java-introduction" -> "Keep the code inside class Main and the main method.";
            case "java-setup" -> "Use the same class name that would match the file name.";
            case "java-program-structure" -> "Check braces, semicolons, and the main method spelling.";
            case "java-input-output" -> "Read the name before the integer score.";
            case "java-type-casting" -> "Cast before division so Java does not do integer division.";
            case "java-arrays-2d" -> "Use nested loops: one for rows and one for columns.";
            case "java-constructors" -> "The constructor name must exactly match the class name.";
            case "java-encapsulation" -> "Use direct fields in this beginner version, like the sample code.";
            case "java-polymorphism" -> "Override the parent method in the child class.";
            case "java-abstraction" -> "Implement every abstract method in the concrete class.";
            case "java-interfaces" -> "Use implements and make the method public.";
            case "java-packages" -> "Keep the package line at the top when using packages.";
            case "java-file-handling" -> "Handle file operations clearly because they can fail.";
            case "java-generics" -> "Use List<String> instead of a raw List.";
            case "java-lambda-streams" -> "Use stream filter and join the result text.";
            default -> "Use the topic rule shown on the lesson page.";
        };
        return List.of(first, "Match the sample output exactly.", "Check one " + skillName + " syntax mistake before submitting.");
    }

    private void seedBadges() {
        badgeRepository.saveAll(List.of(
                new Badge("Topic Completed", "Completed the first learning topic.", "check-circle", "Progress", "Complete any topic"),
                new Badge("Module Completed", "Finished every topic in a module.", "layers", "Progress", "Complete all topics in one module"),
                new Badge("Skill Completed", "Completed an entire skill roadmap.", "award", "Progress", "Complete every topic in a skill"),
                new Badge("7 Day Streak", "Practiced for seven active learning days.", "flame", "Consistency", "Maintain a seven-day streak"),
                new Badge("Quiz Master", "Scored at least 80 percent on a quiz.", "trophy", "Quiz", "Score 80 percent or more"),
                new Badge("Array Expert", "Finished the Arrays concept.", "grid", "Concept", "Complete Arrays"),
                new Badge("Loop Master", "Finished the Loops concept.", "repeat", "Concept", "Complete Loops"),
                new Badge("Java Beginner", "Started the Java roadmap.", "coffee", "Skill", "Select Java"),
                new Badge("Python Explorer", "Started the Python roadmap.", "compass", "Skill", "Select Python"),
                new Badge("Problem Solver", "Completed a practice challenge.", "terminal", "Practice", "Attempt practice")
        ));
    }

    private void seedDemoUser(Map<String, Skill> skills, Map<String, Concept> concepts) {
        User user = new User(
                "Code-Friendly Learner",
                "student@codefriendly.dev",
                passwordEncoder.encode("password123"),
                "Demo Engineering College",
                "Computer Science",
                "Third Year"
        );
        user.setSelectedSkillIds(new LinkedHashSet<>(List.of(skills.get("java").getId(), skills.get("python").getId())));
        User saved = userRepository.save(user);

        UserProgress javaProgress = new UserProgress(saved.getId(), skills.get("java").getId());
        javaProgress.getCompletedConceptIds().add(concepts.get("variables").getId());
        progressRepository.save(javaProgress);
        progressRepository.save(new UserProgress(saved.getId(), skills.get("python").getId()));
    }

    private Concept concept(String name, String slug, String category, String description) {
        return new Concept(name, slug, category, description);
    }

    private LearningModule module(Skill skill, String name, String description, int order, Map<String, Concept> concepts, String... slugs) {
        List<String> conceptIds = List.of(slugs).stream().map(slug -> concepts.get(slug).getId()).toList();
        return new LearningModule(skill.getId(), name, description, order, conceptIds);
    }

    private Concept find(List<Concept> concepts, String slug) {
        return concepts.stream()
                .filter(concept -> slug.equals(concept.getSlug()))
                .findFirst()
                .orElseThrow();
    }

    private Concept.TopicImplementation languageImplementation(Skill skill, String conceptSlug) {
        return switch (conceptSlug) {
            case "variables" -> variables(skill);
            case "data-types" -> dataTypes(skill);
            case "operators" -> operators(skill);
            case "conditionals" -> conditionals(skill);
            case "strings" -> strings(skill);
            case "arrays" -> arrays(skill);
            case "loops" -> loops(skill);
            case "functions" -> functions(skill);
            case "collections" -> collections(skill);
            case "recursion" -> recursion(skill);
            case "oop" -> oop(skill);
            case "classes" -> classes(skill);
            case "inheritance" -> inheritance(skill);
            case "exception-handling" -> exceptions(skill);
            default -> implementation(skill, "Learn the concept in " + skill.getName(), "concept syntax", "small example", "working output");
        };
    }

    private Concept.TopicImplementation javaImplementation(Skill skill, String conceptSlug) {
        return switch (conceptSlug) {
            case "java-introduction" -> implementation(skill,
                    "Java is a class-based, object-oriented programming language that runs on the Java Virtual Machine.",
                    "class Main { public static void main(String[] args) { ... } }",
                    """
                    class Main {
                        public static void main(String[] args) {
                            System.out.println("Welcome to Java");
                        }
                    }
                    """,
                    "Welcome to Java");
            case "java-setup" -> implementation(skill,
                    "JDK setup means installing the Java Development Kit so the computer can compile and run Java programs.",
                    "javac Main.java\njava Main",
                    """
                    class Main {
                        public static void main(String[] args) {
                            System.out.println("JDK is ready");
                        }
                    }
                    """,
                    "JDK is ready");
            case "java-program-structure" -> implementation(skill,
                    "A Java program is organized with classes, a main method, statements, blocks, and semicolons.",
                    "public static void main(String[] args)",
                    """
                    class Main {
                        public static void main(String[] args) {
                            System.out.println("Program started");
                            System.out.println("Ready to learn");
                        }
                    }
                    """,
                    "Program started\nReady to learn");
            case "java-input-output" -> implementation(skill,
                    "Input and output let a Java program read values from the user and print results to the console.",
                    "Scanner input = new Scanner(System.in);",
                    """
                    import java.util.Scanner;

                    class Main {
                        public static void main(String[] args) {
                            Scanner input = new Scanner(System.in);
                            String name = input.next();
                            int score = input.nextInt();
                            System.out.println(name + " scored " + score);
                        }
                    }
                    """,
                    "Asha scored 95");
            case "java-type-casting" -> implementation(skill,
                    "Type casting converts a value from one data type to another, either automatically or manually.",
                    "double average = (double) total / count;",
                    "int total = 95;\nint count = 2;\ndouble average = (double) total / count;\nSystem.out.println(\"Average: \" + average);",
                    "Average: 47.5");
            case "java-arrays-2d" -> implementation(skill,
                    "A 2D array stores values in rows and columns, like a table or matrix.",
                    "int[][] matrix = {{1, 2}, {3, 4}};",
                    "int[][] matrix = {{1, 2}, {3, 4}};\nint total = 0;\nfor (int row = 0; row < matrix.length; row++) {\n    for (int col = 0; col < matrix[row].length; col++) {\n        total += matrix[row][col];\n    }\n}\nSystem.out.println(\"Matrix total: \" + total);",
                    "Matrix total: 10");
            case "java-constructors" -> implementation(skill,
                    "A constructor is a special class block that runs when an object is created.",
                    "Course(String name) { this.name = name; }",
                    "class Course {\n    String name;\n    Course(String name) {\n        this.name = name;\n    }\n}\nCourse course = new Course(\"Java\");\nSystem.out.println(\"Course: \" + course.name);",
                    "Course: Java");
            case "java-encapsulation" -> implementation(skill,
                    "Encapsulation means keeping related data and behavior together inside one class.",
                    "class Student {\n    int id;\n    String name;\n}",
                    "class Student {\n    int id;\n    String name;\n\n    Student(int id, String name) {\n        this.id = id;\n        this.name = name;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(10, \"Alice\");\n        System.out.println(s1.id);\n        System.out.println(s1.name);\n    }\n}",
                    "10\nAlice");
            case "java-polymorphism" -> implementation(skill,
                    "Polymorphism lets one reference type call behavior that changes based on the actual object.",
                    "Course course = new OnlineCourse();",
                    "class Course {\n    String type() { return \"Course\"; }\n}\nclass OnlineCourse extends Course {\n    @Override\n    String type() { return \"Online course\"; }\n}\nCourse course = new OnlineCourse();\nSystem.out.println(course.type());",
                    "Online course");
            case "java-abstraction" -> implementation(skill,
                    "Abstraction shows what an object can do while hiding how the work is completed.",
                    "abstract class BadgeRule { abstract String award(); }",
                    "abstract class BadgeRule {\n    abstract String award();\n}\nclass QuizBadge extends BadgeRule {\n    String award() { return \"Badge awarded\"; }\n}\nBadgeRule rule = new QuizBadge();\nSystem.out.println(rule.award());",
                    "Badge awarded");
            case "java-interfaces" -> implementation(skill,
                    "An interface defines a contract of methods that implementing classes promise to provide.",
                    "interface Trackable { void save(); }",
                    "interface Trackable {\n    void save();\n}\nclass TopicProgress implements Trackable {\n    public void save() {\n        System.out.println(\"Progress saved\");\n    }\n}\nTrackable progress = new TopicProgress();\nprogress.save();",
                    "Progress saved");
            case "java-packages" -> implementation(skill,
                    "Packages organize Java classes into named groups that match folders in a project.",
                    "package com.codefriendly.learning;",
                    "package com.codefriendly.learning;\n\nclass TopicHelper {\n    String status() {\n        return \"Utility ready\";\n    }\n}",
                    "Utility ready");
            case "java-file-handling" -> implementation(skill,
                    "File handling lets Java programs read from and write to files on the computer.",
                    "Files.writeString(Path.of(\"notes.txt\"), text);",
                    "import java.nio.file.Files;\nimport java.nio.file.Path;\n\nPath file = Path.of(\"notes.txt\");\nFiles.writeString(file, \"Saved notes\");\nSystem.out.println(Files.readString(file));",
                    "Saved notes");
            case "java-generics" -> implementation(skill,
                    "Generics let Java code work with a specific type while staying reusable and type-safe.",
                    "List<String> skills = new ArrayList<>();",
                    "import java.util.ArrayList;\nimport java.util.List;\n\nList<String> skills = new ArrayList<>();\nskills.add(\"Java\");\nSystem.out.println(skills.get(0));",
                    "Java");
            case "java-lambda-streams" -> implementation(skill,
                    "Lambda expressions and streams let Java process collections with concise functional-style operations.",
                    "skills.stream().filter(skill -> skill.startsWith(\"J\"))",
                    "import java.util.List;\nimport java.util.stream.Collectors;\n\nList<String> skills = List.of(\"Java\", \"SQL\", \"Spring\");\nString result = skills.stream()\n    .filter(item -> item.contains(\"Java\") || item.contains(\"Spring\"))\n    .collect(Collectors.joining(\", \"));\nSystem.out.println(result);",
                    "Java, Spring");
            default -> implementation(skill, "Learn Java through a focused beginner topic.", "class Main { ... }", "System.out.println(\"Java topic\");", "Java topic");
        };
    }

    private Concept.TopicImplementation variables(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "A Python variable is a name that points to a value and can change during execution.", "score = 95", "score = 95\nname = \"Asha\"\nprint(name, score)", "Asha 95");
            case "javascript" -> implementation(skill, "A JavaScript variable stores a value using let, const, or var.", "let score = 95;", "const name = \"Asha\";\nlet score = 95;\nconsole.log(`${name} scored ${score}`);", "Asha scored 95");
            case "c-plus-plus" -> implementation(skill, "A C++ variable is a typed storage location declared before use.", "int score = 95;", "int score = 95;\nstring name = \"Asha\";\ncout << name << \" \" << score;", "Asha 95");
            default -> implementation(skill, "A Java variable is a typed name that stores a value in memory.", "int score = 95;", "int score = 95;\nString name = \"Asha\";\nSystem.out.println(name + \" \" + score);", "Asha 95");
        };
    }

    private Concept.TopicImplementation dataTypes(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python data types describe the current value, such as int, float, str, bool, list, and dict.", "attempts = 3\ncgpa = 9.4\nactive = True", "name = \"Asha\"\nattempts = 3\ncgpa = 9.4\nactive = True\nprint(name, attempts, cgpa, active)", "Asha 3 9.4 True");
            case "javascript" -> implementation(skill, "JavaScript data types include number, string, boolean, object, array, null, and undefined.", "const attempts = 3;\nconst active = true;", "const name = \"Asha\";\nconst attempts = 3;\nconst cgpa = 9.4;\nconst active = true;\nconsole.log(name, attempts, cgpa, active);", "Asha 3 9.4 true");
            case "c-plus-plus" -> implementation(skill, "C++ data types are declared before use and include int, double, bool, char, string, and custom types.", "int attempts = 3;\ndouble cgpa = 9.4;\nbool active = true;", "string name = \"Asha\";\nint attempts = 3;\ndouble cgpa = 9.4;\nbool active = true;\ncout << name << \" \" << attempts << \" \" << cgpa << \" \" << boolalpha << active;", "Asha 3 9.4 true");
            default -> implementation(skill, "Java data types define what kind of value a variable can hold, from primitives to objects.", "int attempts = 3;\ndouble cgpa = 9.4;\nboolean active = true;", "String name = \"Asha\";\nint attempts = 3;\ndouble cgpa = 9.4;\nboolean active = true;\nSystem.out.println(name + \" \" + attempts + \" \" + cgpa + \" \" + active);", "Asha 3 9.4 true");
        };
    }

    private Concept.TopicImplementation operators(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python operators calculate, compare, assign, and combine expressions.", "total = theory + lab", "theory = 45\nlab = 50\ntotal = theory + lab\nprint(f\"Total: {total}\")", "Total: 95");
            case "javascript" -> implementation(skill, "JavaScript operators handle arithmetic, comparison, assignment, and logical checks.", "const total = theory + lab;", "const theory = 45;\nconst lab = 50;\nconst total = theory + lab;\nconsole.log(`Total: ${total}`);", "Total: 95");
            case "c-plus-plus" -> implementation(skill, "C++ operators perform typed arithmetic, comparisons, assignment, and logical checks.", "int total = theory + lab;", "int theory = 45;\nint lab = 50;\nint total = theory + lab;\ncout << \"Total: \" << total;", "Total: 95");
            default -> implementation(skill, "Java operators calculate, compare, assign, and combine values in expressions.", "int total = theory + lab;", "int theory = 45;\nint lab = 50;\nint total = theory + lab;\nSystem.out.println(\"Total: \" + total);", "Total: 95");
        };
    }

    private Concept.TopicImplementation conditionals(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python conditionals choose code paths with if, elif, and else.", "if score >= 40:\n    ...", "score = 72\nif score >= 40:\n    print(\"Pass\")\nelse:\n    print(\"Improve\")", "Pass");
            case "javascript" -> implementation(skill, "JavaScript conditionals choose code paths with if, else if, else, switch, and ternary expressions.", "if (score >= 40) { ... } else { ... }", "const score = 72;\nif (score >= 40) {\n    console.log(\"Pass\");\n} else {\n    console.log(\"Improve\");\n}", "Pass");
            case "c-plus-plus" -> implementation(skill, "C++ conditionals choose code paths with if, else if, else, switch, and ternary expressions.", "if (score >= 40) { ... } else { ... }", "int score = 72;\nif (score >= 40) {\n    cout << \"Pass\";\n} else {\n    cout << \"Improve\";\n}", "Pass");
            default -> implementation(skill, "Java conditionals choose code paths with if, else if, else, switch, and ternary expressions.", "if (score >= 40) { ... } else { ... }", "int score = 72;\nif (score >= 40) {\n    System.out.println(\"Pass\");\n} else {\n    System.out.println(\"Improve\");\n}", "Pass");
        };
    }

    private Concept.TopicImplementation strings(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python strings store text and offer methods for formatting, searching, splitting, and casing.", "skill.upper()", "skill = \"Python\"\nprint(f\"Learning {skill.upper()}\")", "Learning PYTHON");
            case "javascript" -> implementation(skill, "JavaScript strings store text and provide methods for casing, searching, slicing, and templates.", "skill.toUpperCase()", "const skill = \"JavaScript\";\nconsole.log(`Learning ${skill.toUpperCase()}`);", "Learning JAVASCRIPT");
            case "c-plus-plus" -> implementation(skill, "C++ strings store text through the standard library string type.", "string skill = \"C++\";", "string skill = \"C++\";\ncout << \"Learning \" << skill;", "Learning C++");
            default -> implementation(skill, "Java strings are immutable text objects with methods for formatting, searching, splitting, and casing.", "skill.toUpperCase()", "String skill = \"Java\";\nSystem.out.println(\"Learning \" + skill.toUpperCase());", "Learning JAVA");
        };
    }

    private Concept.TopicImplementation arrays(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python uses lists as dynamic array-like collections for ordered values.", "marks = [85, 90, 95]", "marks = [85, 90, 95]\nfor mark in marks:\n    print(mark)", "85\n90\n95");
            case "javascript" -> implementation(skill, "A JavaScript array is a dynamic ordered collection with helpful built-in methods.", "const marks = [85, 90, 95];", "const marks = [85, 90, 95];\nmarks.forEach(mark => console.log(mark));", "85\n90\n95");
            case "c-plus-plus" -> implementation(skill, "A C++ array stores fixed-size values of the same type in contiguous memory.", "int marks[] = {85, 90, 95};", "int marks[] = {85, 90, 95};\nfor (int mark : marks) {\n    cout << mark << endl;\n}", "85\n90\n95");
            default -> implementation(skill, "A Java array stores a fixed number of same-type values and is accessed by index.", "int[] marks = {85, 90, 95};", "int[] marks = {85, 90, 95};\nfor (int mark : marks) {\n    System.out.println(mark);\n}", "85\n90\n95");
        };
    }

    private Concept.TopicImplementation loops(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python loops repeat code over a sequence or while a condition remains true.", "for item in items:", "for day in range(1, 4):\n    print(f\"Day {day}\")", "Day 1\nDay 2\nDay 3");
            case "javascript" -> implementation(skill, "JavaScript loops repeat code with for, while, for...of, and array methods.", "for (const item of items) { ... }", "for (let day = 1; day <= 3; day++) {\n    console.log(`Day ${day}`);\n}", "Day 1\nDay 2\nDay 3");
            case "c-plus-plus" -> implementation(skill, "C++ loops repeat code with for, while, and range-based for statements.", "for (int i = 0; i < n; i++)", "for (int day = 1; day <= 3; day++) {\n    cout << \"Day \" << day << endl;\n}", "Day 1\nDay 2\nDay 3");
            default -> implementation(skill, "Java loops repeat code using for, while, do-while, or enhanced for syntax.", "for (int i = 0; i < n; i++)", "for (int day = 1; day <= 3; day++) {\n    System.out.println(\"Day \" + day);\n}", "Day 1\nDay 2\nDay 3");
        };
    }

    private Concept.TopicImplementation functions(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "A Python function is reusable logic defined with def.", "def add(a, b):", "def add(a, b):\n    return a + b\n\nprint(add(4, 5))", "9");
            case "javascript" -> implementation(skill, "A JavaScript function packages reusable behavior and can be declared or assigned.", "function add(a, b) { return a + b; }", "function add(a, b) {\n    return a + b;\n}\nconsole.log(add(4, 5));", "9");
            case "c-plus-plus" -> implementation(skill, "A C++ function has a return type, name, parameters, and body.", "int add(int a, int b)", "int add(int a, int b) {\n    return a + b;\n}\ncout << add(4, 5);", "9");
            default -> implementation(skill, "A Java method is a function that belongs to a class or object.", "static int add(int a, int b)", "static int add(int a, int b) {\n    return a + b;\n}\nSystem.out.println(add(4, 5));", "9");
        };
    }

    private Concept.TopicImplementation collections(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python collections include lists, dictionaries, sets, and tuples for flexible data storage.", "skills = [\"Python\", \"SQL\", \"AWS\"]", "skills = [\"Python\", \"SQL\", \"AWS\"]\nprint(f\"Skills added: {len(skills)}\")", "Skills added: 3");
            case "javascript" -> implementation(skill, "JavaScript collections include arrays, objects, Map, Set, WeakMap, and WeakSet.", "const skills = [\"JavaScript\", \"SQL\", \"AWS\"];", "const skills = [\"JavaScript\", \"SQL\", \"AWS\"];\nconsole.log(`Skills added: ${skills.length}`);", "Skills added: 3");
            case "c-plus-plus" -> implementation(skill, "C++ standard library collections include vector, map, set, queue, stack, and unordered containers.", "vector<string> skills = {\"C++\", \"SQL\", \"AWS\"};", "vector<string> skills = {\"C++\", \"SQL\", \"AWS\"};\ncout << \"Skills added: \" << skills.size();", "Skills added: 3");
            default -> implementation(skill, "Java collections include List, Set, Map, Queue, and Deque for flexible data handling.", "List<String> skills = new ArrayList<>();", "List<String> skills = new ArrayList<>();\nskills.add(\"Java\");\nskills.add(\"SQL\");\nskills.add(\"AWS\");\nSystem.out.println(\"Skills added: \" + skills.size());", "Skills added: 3");
        };
    }

    private Concept.TopicImplementation recursion(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python recursion lets a function call itself with a smaller input until a base case is reached.", "def factorial(n):", "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(f\"Factorial: {factorial(5)}\")", "Factorial: 120");
            case "javascript" -> implementation(skill, "JavaScript recursion lets a function call itself with a smaller input until a base case is reached.", "function factorial(n) { ... }", "function factorial(n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\nconsole.log(`Factorial: ${factorial(5)}`);", "Factorial: 120");
            case "c-plus-plus" -> implementation(skill, "C++ recursion lets a function call itself with a smaller input until a base case is reached.", "int factorial(int n) { ... }", "int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\ncout << \"Factorial: \" << factorial(5);", "Factorial: 120");
            default -> implementation(skill, "Java recursion lets a method call itself with a smaller input until a base case is reached.", "static int factorial(int n) { ... }", "static int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\nSystem.out.println(\"Factorial: \" + factorial(5));", "Factorial: 120");
        };
    }

    private Concept.TopicImplementation oop(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python OOP uses classes and objects to group data with behavior.", "class Student:", "class Student:\n    def __init__(self, name):\n        self.name = name\n\nstudent = Student(\"Asha\")\nprint(student.name)", "Asha");
            case "javascript" -> implementation(skill, "JavaScript supports OOP with classes and prototype-based objects.", "class Student { constructor(name) { ... } }", "class Student {\n    constructor(name) { this.name = name; }\n}\nconsole.log(new Student(\"Asha\").name);", "Asha");
            case "c-plus-plus" -> implementation(skill, "C++ OOP uses classes, objects, access modifiers, and constructors.", "class Student { ... };", "class Student {\npublic:\n    string name;\n    Student(string value) { name = value; }\n};", "Student object created");
            default -> implementation(skill, "Java OOP models data and behavior with classes, objects, constructors, and methods.", "class Student { ... }", "class Student {\n    String name;\n    Student(String name) { this.name = name; }\n}", "Student object created");
        };
    }

    private Concept.TopicImplementation classes(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "A Python class is a blueprint for objects with attributes and methods.", "class Course:", "class Course:\n    def __init__(self, name):\n        self.name = name\n    def label(self):\n        return f\"Course: {self.name}\"\n\nprint(Course(\"Python\").label())", "Course: Python");
            case "javascript" -> implementation(skill, "A JavaScript class is syntax for creating object blueprints with constructors and methods.", "class Course { constructor(name) { ... } }", "class Course {\n    constructor(name) { this.name = name; }\n    label() { return `Course: ${this.name}`; }\n}\nconsole.log(new Course(\"JavaScript\").label());", "Course: JavaScript");
            case "c-plus-plus" -> implementation(skill, "A C++ class defines data members, methods, constructors, and access rules.", "class Course { public: Course(string name); };", "class Course {\npublic:\n    string name;\n    Course(string value) { name = value; }\n    string label() { return \"Course: \" + name; }\n};\ncout << Course(\"C++\").label();", "Course: C++");
            default -> implementation(skill, "A Java class is a blueprint for objects with fields, constructors, and methods.", "class Course { Course(String name) { ... } }", "class Course {\n    String name;\n    Course(String name) { this.name = name; }\n    String label() { return \"Course: \" + name; }\n}\nSystem.out.println(new Course(\"Java\").label());", "Course: Java");
        };
    }

    private Concept.TopicImplementation inheritance(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python inheritance lets a child class reuse and specialize behavior from a parent class.", "class OnlineCourse(Course):", "class Course:\n    name = \"Python\"\nclass OnlineCourse(Course):\n    def label(self):\n        return f\"Course: {self.name}\"\nprint(OnlineCourse().label())", "Course: Python");
            case "javascript" -> implementation(skill, "JavaScript inheritance uses extends to reuse and specialize class behavior.", "class OnlineCourse extends Course { ... }", "class Course { constructor() { this.name = \"JavaScript\"; } }\nclass OnlineCourse extends Course {\n    label() { return `Course: ${this.name}`; }\n}\nconsole.log(new OnlineCourse().label());", "Course: JavaScript");
            case "c-plus-plus" -> implementation(skill, "C++ inheritance lets a derived class reuse and specialize a base class.", "class OnlineCourse : public Course { ... };", "class Course { public: string name = \"C++\"; };\nclass OnlineCourse : public Course {\npublic:\n    string label() { return \"Course: \" + name; }\n};\ncout << OnlineCourse().label();", "Course: C++");
            default -> implementation(skill, "Java inheritance lets a subclass reuse and specialize behavior from a superclass.", "class OnlineCourse extends Course { ... }", "class Course { String name = \"Java\"; }\nclass OnlineCourse extends Course {\n    String label() { return \"Course: \" + name; }\n}\nSystem.out.println(new OnlineCourse().label());", "Course: Java");
        };
    }

    private Concept.TopicImplementation exceptions(Skill skill) {
        return switch (skill.getSlug()) {
            case "python" -> implementation(skill, "Python exceptions are handled with try and except blocks.", "try: ... except ValueError:", "try:\n    number = int(\"abc\")\nexcept ValueError:\n    print(\"Invalid number\")", "Invalid number");
            case "javascript" -> implementation(skill, "JavaScript handles runtime errors with try, catch, and finally.", "try { ... } catch (error) { ... }", "try {\n    JSON.parse(\"bad json\");\n} catch (error) {\n    console.log(\"Invalid JSON\");\n}", "Invalid JSON");
            case "c-plus-plus" -> implementation(skill, "C++ handles exceptions with try, catch, and throw.", "try { ... } catch (const exception& e) { ... }", "try {\n    throw runtime_error(\"Invalid input\");\n} catch (const exception& error) {\n    cout << error.what();\n}", "Invalid input");
            default -> implementation(skill, "Java exception handling uses try, catch, finally, and typed exception classes.", "try { ... } catch (Exception ex) { ... }", "try {\n    int result = 10 / 0;\n} catch (ArithmeticException ex) {\n    System.out.println(\"Cannot divide by zero\");\n}", "Cannot divide by zero");
        };
    }

    private Concept.TopicImplementation implementation(Skill skill, String definition, String syntax, String codeExample, String output) {
        Concept.TopicImplementation implementation = new Concept.TopicImplementation(skill.getId(), skill.getSlug(), skill.getName());
        implementation.setDefinition(definition);
        implementation.setSyntax(syntax);
        implementation.setExplanation("Study the syntax, trace the example, then rebuild it in a small program. Focus on why the concept exists, what problem it solves, and how the output proves the idea works.");
        implementation.setRealWorldExample("In Code-Friendly, this concept appears in learner dashboards, roadmaps, progress tracking, quizzes, guided practice, and badge workflows.");
        implementation.setCodeExample(codeExample);
        implementation.setOutput(output);
        implementation.setAdvantages(List.of("Improves structure and readability", "Supports reuse in larger programs", "Makes practice easier to test and review"));
        implementation.setDisadvantages(List.of("Syntax differs between skills", "Beginners may overuse it before understanding the basics", "Small mistakes can change the program output"));
        implementation.setCommonMistakes(List.of("Skipping small examples before larger tasks", "Using unclear names or mixed responsibilities", "Ignoring error messages and failed sample outputs"));
        implementation.setInterviewQuestions(List.of(
                "Why is this concept useful?",
                "How does " + skill.getName() + " implement it?",
                "What mistake would you avoid in production code?"
        ));
        return implementation;
    }

    private String firstOrDefault(List<String> values, String fallback) {
        return values == null || values.isEmpty() ? fallback : values.get(0);
    }
}
