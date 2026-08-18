window.CF = (() => {
  const tokenKey = "cf_token";
  const userKey = "cf_user";
  const apiBaseKey = "cf_api_base";
  const demoUsersKey = "cf_demo_users";
  const demoProgressKey = "cf_demo_progress";
  const liveSkillsKey = "cf_live_skills";
  const onboardingKey = "cf_student_onboarding";

  const state = {
    apiBase: localStorage.getItem(apiBaseKey) || "http://localhost:8080/api",
    mode: "live"
  };

  const skills = [
    skill("c", "C", "Build first-year programming confidence with syntax, memory basics, arrays, and functions.", "Beginner", "#0891B2"),
    skill("java", "Java", "Build strong programming fundamentals with Java 21 and OOP.", "Beginner", "#2563EB"),
    skill("python", "Python", "Learn clean scripting, problem solving, and automation basics.", "Beginner", "#16A34A"),
    skill("problem-solving", "Problem Solving", "Practice logic building, patterns, dry runs, and step-by-step coding thinking.", "Beginner", "#DC2626"),
    skill("git-basics", "Git Basics", "Learn version control, commits, branches, and project history basics.", "Beginner", "#F97316"),
    skill("javascript", "JavaScript", "Understand browser logic, DOM behavior, and modern web basics.", "Beginner", "#F59E0B"),
    skill("c-plus-plus", "C++", "Practice performance-aware coding, memory basics, and STL thinking.", "Intermediate", "#7C3AED"),
    skill("dbms", "DBMS", "Understand database design, tables, keys, normalization, and relationships.", "Beginner", "#0D9488"),
    skill("oop-skill", "OOP", "Learn classes, objects, constructors, inheritance, and clean object thinking.", "Beginner", "#4F46E5"),
    skill("spring-boot", "Spring Boot", "Create REST APIs with dependency injection, security, and MongoDB.", "Intermediate", "#22C55E"),
    skill("react", "React", "Build modern frontend interfaces with components, props, state, and hooks.", "Intermediate", "#06B6D4"),
    skill("sql", "SQL", "Learn relational thinking, queries, joins, and data modeling.", "Beginner", "#0F766E"),
    skill("aws", "AWS", "Start cloud fundamentals with compute, storage, and deployment concepts.", "Beginner", "#EA580C"),
    skill("ai-ml", "AI/ML", "Learn model training, supervised learning, and evaluation basics.", "Intermediate", "#DB2777"),
    skill("dsa-revision", "DSA Revision", "Revise arrays, strings, recursion, collections, and interview coding patterns.", "Intermediate", "#9333EA"),
    skill("interview-preparation", "Interview Preparation", "Prepare coding rounds, HR questions, technical answers, and mock interview habits.", "Intermediate", "#BE123C"),
    skill("projects", "Projects", "Plan, build, document, and deploy portfolio-ready student projects.", "Intermediate", "#15803D"),
    skill("resume", "Resume Builder", "Create a clean fresher resume with skills, projects, links, and ATS-friendly structure.", "Beginner", "#475569")
  ];

  const concepts = [
    concept("variables", "Variables", "Programming Basics", "Store and reuse values while solving problems."),
    concept("data-types", "Data Types", "Programming Basics", "Choose the right kind of value for text, numbers, booleans, and objects."),
    concept("operators", "Operators", "Programming Basics", "Calculate, compare, and combine values in expressions."),
    concept("conditionals", "Conditionals", "Control Flow", "Run different code paths when a condition is true or false."),
    concept("arrays", "Arrays", "Data Structures", "Keep multiple related values under one name."),
    concept("strings", "Strings", "Programming Basics", "Work with text, characters, formatting, and common text operations."),
    concept("loops", "Loops", "Control Flow", "Repeat work predictably without duplicate code."),
    concept("functions", "Functions", "Code Organization", "Group reusable logic behind a clear name."),
    concept("oop", "OOP", "Object-Oriented Programming", "Model behavior with classes, objects, and methods."),
    concept("classes", "Classes", "Object-Oriented Programming", "Design a blueprint that groups state and behavior."),
    concept("inheritance", "Inheritance", "Object-Oriented Programming", "Reuse and specialize behavior from an existing type."),
    concept("collections", "Collections", "Data Structures", "Use flexible built-in containers for lists, maps, sets, and queues."),
    concept("recursion", "Recursion", "Problem Solving", "Solve a problem by breaking it into smaller versions of itself."),
    concept("exception-handling", "Exception Handling", "Reliability", "Handle runtime problems without crashing the full program."),
    concept("java-introduction", "Java Introduction", "Java Basics", "Understand what Java is, where it runs, and why students use it."),
    concept("java-setup", "JDK Setup", "Java Basics", "Install the JDK and understand compile-and-run commands."),
    concept("java-program-structure", "Program Structure", "Java Basics", "Read the class, main method, statements, braces, and semicolons in a Java file."),
    concept("java-input-output", "Input And Output", "Java Basics", "Read learner input and print clear program output."),
    concept("java-type-casting", "Type Casting", "Java Basics", "Convert values between compatible Java data types safely."),
    concept("java-arrays-2d", "2D Arrays", "Java Data Structures", "Store rows and columns of values in a matrix-like structure."),
    concept("java-constructors", "Constructors", "Java OOP", "Initialize objects with required starting values."),
    concept("java-encapsulation", "Encapsulation", "Java OOP", "Group related data and behavior inside one easy-to-understand class."),
    concept("java-polymorphism", "Polymorphism", "Java OOP", "Use one parent reference to call behavior from different child objects."),
    concept("java-abstraction", "Abstraction", "Java OOP", "Hide implementation details behind abstract classes or methods."),
    concept("java-interfaces", "Interfaces", "Java OOP", "Define behavior contracts that multiple classes can implement."),
    concept("java-packages", "Packages", "Java Project Structure", "Organize Java classes into folders and namespaces."),
    concept("java-file-handling", "File Handling", "Java Practical Skills", "Read and write files using Java library classes."),
    concept("java-generics", "Generics", "Java Practical Skills", "Write type-safe reusable classes, methods, and collections."),
    concept("java-lambda-streams", "Lambda And Streams", "Java Practical Skills", "Process collections with concise functional-style Java."),
    concept("memory-basics", "Memory Basics", "C Programming", "Understand variables, addresses, and simple memory thinking."),
    concept("pointers", "Pointers", "C Programming", "Store and use memory addresses carefully."),
    concept("dry-run", "Dry Run", "Problem Solving", "Trace code by hand before running it."),
    concept("patterns", "Patterns", "Problem Solving", "Build loops for number, star, and table patterns."),
    concept("git-init", "Git Init", "Version Control", "Start tracking a project with Git."),
    concept("commits", "Commits", "Version Control", "Save meaningful snapshots of project work."),
    concept("branches", "Branches", "Version Control", "Work on changes without disturbing the main project."),
    concept("dbms-basics", "DBMS Basics", "Database Basics", "Understand databases, records, keys, and relationships."),
    concept("normalization", "Normalization", "Database Design", "Reduce duplicate data with cleaner table design."),
    concept("react-components", "Components", "React", "Break a UI into reusable pieces."),
    concept("jsx", "JSX", "React", "Write HTML-like UI inside JavaScript."),
    concept("props-state", "Props And State", "React", "Pass data into components and manage changing UI values."),
    concept("hooks", "Hooks", "React", "Use built-in React functions such as useState and useEffect."),
    concept("coding-patterns", "Coding Patterns", "Interview Prep", "Recognize common array, string, recursion, and search patterns."),
    concept("mock-interviews", "Mock Interviews", "Interview Prep", "Practice explaining solutions under interview timing."),
    concept("hr-questions", "HR Questions", "Interview Prep", "Prepare clear answers about goals, strengths, projects, and teamwork."),
    concept("project-planning", "Project Planning", "Projects", "Choose a problem, define features, and plan milestones."),
    concept("portfolio-project", "Portfolio Project", "Projects", "Build a complete project that proves practical skill."),
    concept("deployment", "Deployment", "Projects", "Put a project online so others can use it."),
    concept("resume-basics", "Resume Basics", "Resume", "Write a clear one-page fresher resume."),
    concept("ats-format", "ATS Format", "Resume", "Use simple sections and keywords that resume scanners can read."),
    concept("project-descriptions", "Project Descriptions", "Resume", "Explain project impact, stack, and your contribution clearly."),
    concept("rest-api", "REST API", "Backend", "Expose resources through predictable HTTP endpoints."),
    concept("dependency-injection", "Dependency Injection", "Backend", "Provide dependencies from the framework."),
    concept("spring-security", "Spring Security", "Backend Security", "Protect APIs with authentication and filters."),
    concept("tables", "Tables", "Database Basics", "Organize structured records into rows and columns."),
    concept("queries", "Queries", "Database Basics", "Read and filter useful information from stored data."),
    concept("joins", "Joins", "Database Relationships", "Combine related records from more than one table."),
    concept("cloud-basics", "Cloud Basics", "Cloud", "Understand on-demand infrastructure and managed services."),
    concept("ec2", "EC2", "Cloud Compute", "Run virtual servers for backend workloads."),
    concept("s3", "S3", "Cloud Storage", "Store files and static assets in durable object storage."),
    concept("supervised-learning", "Supervised Learning", "Machine Learning", "Train from examples that include correct answers."),
    concept("model-training", "Model Training", "Machine Learning", "Fit a model to data so it can make predictions."),
    concept("evaluation", "Evaluation", "Machine Learning", "Measure how well a model performs on unseen data.")
  ];

  const modules = [
    module("c", "C Foundations", "Start with values, decisions, loops, arrays, functions, and memory basics.", 1, ["variables", "data-types", "operators", "conditionals", "loops", "arrays", "functions", "memory-basics", "pointers"]),
    module("java", "Java Getting Started", "Understand Java, the JDK, program structure, and console input/output.", 1, ["java-introduction", "java-setup", "java-program-structure", "java-input-output"]),
    module("java", "Java Fundamentals", "Start with values, types, calculations, decisions, and safe conversions.", 2, ["variables", "data-types", "operators", "conditionals", "java-type-casting"]),
    module("java", "Java Problem Solving", "Practice text, arrays, 2D arrays, loops, methods, collections, and recursion.", 3, ["strings", "arrays", "java-arrays-2d", "loops", "functions", "collections", "recursion"]),
    module("java", "Java OOP Deep Dive", "Move into objects, classes, constructors, encapsulation, inheritance, polymorphism, abstraction, and interfaces.", 4, ["oop", "classes", "java-constructors", "java-encapsulation", "inheritance", "java-polymorphism", "java-abstraction", "java-interfaces"]),
    module("java", "Java Practical Skills", "Handle exceptions, organize packages, work with files, use generics, and process data with streams.", 5, ["exception-handling", "java-packages", "java-file-handling", "java-generics", "java-lambda-streams"]),
    module("python", "Python Fundamentals", "Use readable syntax for values, types, calculations, and decisions.", 1, ["variables", "data-types", "operators", "conditionals"]),
    module("python", "Python Problem Solving", "Practice text, lists, loops, functions, collections, and recursion.", 2, ["strings", "arrays", "loops", "functions", "collections", "recursion"]),
    module("python", "Python OOP and Reliability", "Organize larger scripts with objects, classes, inheritance, and exceptions.", 3, ["oop", "classes", "inheritance", "exception-handling"]),
    module("problem-solving", "Logic Building", "Learn dry runs, patterns, conditionals, loops, arrays, and recursion.", 1, ["dry-run", "patterns", "conditionals", "loops", "arrays", "functions", "recursion"]),
    module("git-basics", "Git Foundations", "Track project work with init, commits, branches, and clean history habits.", 1, ["git-init", "commits", "branches"]),
    module("javascript", "JavaScript Fundamentals", "Learn values, types, expressions, and browser-friendly decision logic.", 1, ["variables", "data-types", "operators", "conditionals"]),
    module("javascript", "JavaScript Problem Solving", "Practice strings, arrays, loops, functions, collections, and recursion.", 2, ["strings", "arrays", "loops", "functions", "collections", "recursion"]),
    module("javascript", "JavaScript OOP and Reliability", "Use objects, classes, inheritance, and runtime error handling.", 3, ["oop", "classes", "inheritance", "exception-handling"]),
    module("c-plus-plus", "C++ Fundamentals", "Practice typed values, operators, decisions, and efficient basics.", 1, ["variables", "data-types", "operators", "conditionals"]),
    module("c-plus-plus", "C++ Problem Solving", "Use strings, arrays, loops, functions, STL containers, and recursion.", 2, ["strings", "arrays", "loops", "functions", "collections", "recursion"]),
    module("c-plus-plus", "C++ OOP and Reliability", "Build classes, inheritance, and careful runtime handling.", 3, ["oop", "classes", "inheritance", "exception-handling"]),
    module("dbms", "DBMS Foundations", "Understand database purpose, tables, keys, normalization, and relationships.", 1, ["dbms-basics", "tables", "normalization", "joins"]),
    module("oop-skill", "OOP Foundations", "Move from classes and objects to constructors, inheritance, polymorphism, abstraction, and interfaces.", 1, ["oop", "classes", "java-constructors", "java-encapsulation", "inheritance", "java-polymorphism", "java-abstraction", "java-interfaces"]),
    module("spring-boot", "REST Backend", "Build clean HTTP APIs with Spring Boot.", 1, ["rest-api", "dependency-injection"]),
    module("spring-boot", "Secure Backend", "Protect APIs using Spring Security.", 2, ["spring-security"]),
    module("react", "React Frontend", "Build UI with JSX, components, props, state, hooks, and API-connected screens.", 1, ["jsx", "react-components", "props-state", "hooks", "rest-api"]),
    module("sql", "Database Basics", "Create structures and ask useful questions of data.", 1, ["tables", "queries"]),
    module("sql", "Relationships", "Connect related records with joins.", 2, ["joins"]),
    module("aws", "Cloud Foundations", "Understand services used to host web projects.", 1, ["cloud-basics", "ec2", "s3"]),
    module("ai-ml", "ML Foundations", "Learn the training and evaluation loop.", 1, ["supervised-learning", "model-training", "evaluation"]),
    module("dsa-revision", "DSA Revision Path", "Revise the most useful interview problem-solving topics.", 1, ["arrays", "strings", "collections", "recursion", "coding-patterns"]),
    module("interview-preparation", "Interview Readiness", "Prepare coding rounds, explanations, mock interviews, and HR answers.", 1, ["coding-patterns", "mock-interviews", "hr-questions"]),
    module("projects", "Project Roadmap", "Plan, build, document, and deploy portfolio projects.", 1, ["project-planning", "portfolio-project", "deployment", "git-init"]),
    module("resume", "Resume Roadmap", "Create a fresher resume that clearly shows skills, projects, and proof of work.", 1, ["resume-basics", "ats-format", "project-descriptions"])
  ];

  const yearPlans = {
    "First Year": {
      label: "First Year",
      goalPrompt: "Build programming comfort and college lab confidence.",
      skillIds: ["c", "python", "problem-solving", "git-basics"]
    },
    "Second Year": {
      label: "Second Year",
      goalPrompt: "Strengthen Java, databases, SQL, OOP, and resume-building foundations.",
      skillIds: ["java", "dbms", "sql", "oop-skill", "resume"]
    },
    "Third Year": {
      label: "Third Year",
      goalPrompt: "Build full-stack and cloud-ready project skills.",
      skillIds: ["spring-boot", "react", "aws"]
    },
    "Fourth Year": {
      label: "Fourth Year",
      goalPrompt: "Prepare for placements with revision, projects, and resume polish.",
      skillIds: ["dsa-revision", "interview-preparation", "projects", "resume"]
    }
  };

  const goals = [
    "Placement Preparation",
    "Build Projects",
    "Improve Programming Basics",
    "Full Stack Developer",
    "Cloud And DevOps",
    "Interview Ready"
  ];

  function token() {
    return localStorage.getItem(tokenKey);
  }

  function user() {
    const raw = localStorage.getItem(userKey);
    return raw ? JSON.parse(raw) : null;
  }

  function onboardingDefaults() {
    const current = user();
    return {
      userId: current?.id || "",
      profileCompleted: false,
      profile: {
        name: current?.name || "",
        college: current?.college || "",
        branch: current?.branch || ""
      },
      year: "",
      goal: "",
      skillsCompleted: false
    };
  }

  function onboarding() {
    const current = user();
    const defaults = onboardingDefaults();
    try {
      const saved = JSON.parse(localStorage.getItem(onboardingKey) || "{}");
      if (saved.userId && current?.id && saved.userId !== current.id) return defaults;
      return {
        ...defaults,
        ...saved,
        userId: current?.id || saved.userId || "",
        profile: {
          ...defaults.profile,
          ...(saved.profile || {})
        }
      };
    } catch {
      return defaults;
    }
  }

  function saveOnboarding(update = {}) {
    const before = onboarding();
    const current = user();
    const next = {
      ...before,
      ...update,
      userId: current?.id || before.userId || "",
      profile: {
        ...before.profile,
        ...(update.profile || {})
      }
    };
    localStorage.setItem(onboardingKey, JSON.stringify(next));
    syncStoredUser(next);
    return next;
  }

  function syncStoredUser(data = onboarding()) {
    const current = user();
    if (!current) return;
    const updated = {
      ...current,
      name: data.profile?.name || current.name,
      college: data.profile?.college || current.college,
      branch: data.profile?.branch || current.branch,
      year: data.year || current.year,
      goal: data.goal || current.goal
    };
    localStorage.setItem(userKey, JSON.stringify(updated));
    try {
      const users = demoUsers().map((candidate) => candidate.id === updated.id ? { ...candidate, ...updated } : candidate);
      saveDemoUsers(users);
    } catch {
      // Live backend data is mirrored locally for the onboarding flow.
    }
  }

  function enrichedUser(base = user()) {
    if (!base) return null;
    const data = onboarding();
    return {
      ...base,
      name: data.profile?.name || base.name,
      college: data.profile?.college || base.college,
      branch: data.profile?.branch || base.branch,
      year: data.year || base.year,
      goal: data.goal || base.goal
    };
  }

  function yearPlan(year = onboarding().year) {
    return yearPlans[year] || yearPlans["First Year"];
  }

  function allYearPlans() {
    return Object.values(yearPlans);
  }

  function allGoals() {
    return goals;
  }

  function nextOnboardingUrl() {
    const current = enrichedUser();
    const data = onboarding();
    if (!current) return "login.html";
    if (!data.profileCompleted) return "profile-setup.html";
    if (!data.year) return "choose-year.html";
    if (!data.goal) return "choose-goal.html";
    if (!data.skillsCompleted) return "skills.html";
    return "dashboard.html";
  }

  function ensureOnboarding(currentPage) {
    const next = nextOnboardingUrl();
    const page = currentPage || window.location.pathname.split("/").pop() || "index.html";
    if (next !== "dashboard.html" && page !== next) {
      window.location.href = next;
      return false;
    }
    return true;
  }

  function setAuth(response) {
    localStorage.setItem(tokenKey, response.token);
    localStorage.setItem(userKey, JSON.stringify(response.user));
    saveOnboarding({ userId: response.user.id });
  }

  function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
    localStorage.removeItem(onboardingKey);
    window.location.href = "index.html";
  }

  async function request(path, options = {}) {
    try {
      const data = await liveRequest(path, options);
      state.mode = "live";
      if (path === "/skills" && Array.isArray(data)) {
        const mergedSkills = mergeSkills(data);
        localStorage.setItem(liveSkillsKey, JSON.stringify(mergedSkills));
        return mergedSkills;
      }
      if (path === "/auth/me" && data) {
        const mergedUser = mergeLiveUser(data);
        localStorage.setItem(userKey, JSON.stringify(mergedUser));
        return mergedUser;
      }
      if (path === "/skills/select" && (options.method || "GET") === "POST") {
        syncSelectedSkills(selectedSkillIdsFromResponse(data, options.body?.skillIds || []));
      }
      if (path === "/progress" && Array.isArray(data)) {
        const selected = user()?.selectedSkillIds || [];
        if (!data.length && selected.length) {
          state.mode = "demo";
          return demoRequest(path, options);
        }
      }
      if (path.startsWith("/topics/") && data) {
        return enrichTopicResponse(data, path);
      }
      return data;
    } catch (error) {
      if (!isNetworkError(error) && !canUseDemoFallback(path, options)) {
        throw error;
      }
      state.mode = "demo";
      return demoRequest(path, options);
    }
  }

  async function liveRequest(path, options = {}) {
    const headers = {
      Accept: "application/json",
      ...(options.headers || {})
    };
    if (options.body !== undefined) {
      headers["Content-Type"] = "application/json";
    }
    if (token()) {
      headers.Authorization = `Bearer ${token()}`;
    }

    const response = await fetch(`${state.apiBase}${path}`, {
      method: options.method || "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(userKey);
      }
      const message = data?.message || "Request failed";
      const error = new Error(message);
      error.status = response.status;
      throw error;
    }
    return data;
  }

  function demoRequest(path, options = {}) {
    seedDemoStorage();
    const method = options.method || "GET";
    const body = options.body || {};
    const url = new URL(path, "http://code-friendly.local");
    const parts = url.pathname.split("/").filter(Boolean);

    if (method === "GET" && url.pathname === "/skills") return skills;
    if (method === "POST" && url.pathname === "/auth/login") return demoLogin(body);
    if (method === "POST" && url.pathname === "/auth/register") return demoRegister(body);
    if (method === "GET" && url.pathname === "/auth/me") return requireDemoUser();
    if (method === "POST" && url.pathname === "/skills/select") return demoSelectSkills(body.skillIds || []);
    if (method === "GET" && parts[0] === "skills" && parts[2] === "roadmap") return demoRoadmap(parts[1]);
    if (method === "GET" && parts[0] === "topics") return demoTopic(parts[1], parts[2]);
    if (method === "GET" && parts[0] === "practice") return [demoPractice(parts[1], parts[2])];
    if (method === "GET" && parts[0] === "quizzes") return demoQuiz(parts[1], parts[2], false);
    if (method === "POST" && url.pathname === "/quizzes/submit") return demoSubmitQuiz(body);
    if (method === "GET" && url.pathname === "/progress") return requireDemoUser().selectedSkillIds.map((skillId) => demoProgressSummary(skillId));
    if (method === "GET" && parts[0] === "progress" && parts[1]) return demoProgressSummary(parts[1]);
    if (method === "POST" && url.pathname === "/progress/complete-topic") return demoCompleteTopic(body.skillId, body.conceptId);
    if (method === "GET" && url.pathname === "/compare") return demoCompare(url.searchParams.get("concept") || "arrays", url.searchParams.get("skillIds") || "");
    if (method === "GET" && url.pathname === "/profile") return demoProfile();

    throw new Error("This website action is not available yet.");
  }

  function requireAuth() {
    if (!token()) {
      window.location.href = `login.html?next=${encodeURIComponent(window.location.pathname.split("/").pop() + window.location.search)}`;
      return false;
    }
    return true;
  }

  function queryParam(name, fallback = "") {
    return new URLSearchParams(window.location.search).get(name) || fallback;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function toast(message, type = "info") {
    let area = document.querySelector(".toast-area");
    if (!area) {
      area = document.createElement("div");
      area.className = "toast-area";
      document.body.appendChild(area);
    }
    const item = document.createElement("div");
    item.className = `cf-toast ${type === "error" ? "error" : ""}`;
    item.textContent = message;
    area.appendChild(item);
    setTimeout(() => item.remove(), 4200);
  }

  function setApiBase(value) {
    state.apiBase = value;
    localStorage.setItem(apiBaseKey, value);
  }

  function isNetworkError(error) {
    return error instanceof TypeError
      || /Failed to fetch|NetworkError|Load failed|fetch/i.test(error.message || "");
  }

  function canUseDemoFallback(path, options = {}) {
    const method = options.method || "GET";
    if (method === "POST") {
      return path === "/skills/select"
        || path === "/progress/complete-topic"
        || path === "/quizzes/submit";
    }
    if (method !== "GET") return false;
    return path === "/skills"
      || path.startsWith("/skills/")
      || path.startsWith("/topics/")
      || path.startsWith("/practice/")
      || path.startsWith("/quizzes/")
      || path.startsWith("/progress")
      || path === "/profile"
      || path.startsWith("/compare");
  }

  function mergeSkills(liveSkills = []) {
    const seen = new Set();
    return [...liveSkills, ...skills].filter((item) => {
      const key = item.slug || item.id || item.name;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function mergeLiveUser(liveUser) {
    const localUser = user();
    return {
      ...liveUser,
      selectedSkillIds: localUser?.selectedSkillIds?.length ? localUser.selectedSkillIds : (liveUser.selectedSkillIds || [])
    };
  }

  function selectedSkillIdsFromResponse(response, fallback = []) {
    if (!Array.isArray(response)) return fallback;
    return response.map((item) => item.slug || item.id || item.name).filter(Boolean);
  }

  function syncSelectedSkills(skillIds = []) {
    const current = user();
    if (!current) return;
    localStorage.setItem(userKey, JSON.stringify({ ...current, selectedSkillIds: skillIds }));
    try {
      const users = demoUsers();
      const exists = users.some((candidate) => candidate.id === current.id);
      const updated = exists
        ? users.map((candidate) => candidate.id === current.id ? { ...candidate, selectedSkillIds: skillIds } : candidate)
        : [...users, { ...current, selectedSkillIds: skillIds }];
      saveDemoUsers(updated);
    } catch {
      // Selection is still saved on the current browser profile.
    }
  }

  function seedDemoStorage() {
    if (!localStorage.getItem(demoUsersKey)) {
      const demoUser = {
        id: "demo-user",
        name: "Code-Friendly Learner",
        email: "student@codefriendly.dev",
        password: "password123",
        college: "Demo Engineering College",
        branch: "Computer Science",
        year: "Third Year",
        roles: ["LEARNER"],
        selectedSkillIds: ["java", "python"]
      };
      localStorage.setItem(demoUsersKey, JSON.stringify([demoUser]));
    }
    if (!localStorage.getItem(demoProgressKey)) {
      localStorage.setItem(demoProgressKey, JSON.stringify({
        "demo-user": {
          java: {
            completedConceptIds: ["variables"],
            completedModuleIds: [],
            quizScores: {},
            badges: ["Topic Completed"],
            streakDays: 1
          },
          python: {
            completedConceptIds: [],
            completedModuleIds: [],
            quizScores: {},
            badges: [],
            streakDays: 0
          }
        }
      }));
    }
  }

  function demoLogin(body) {
    const users = demoUsers();
    const found = users.find((candidate) => candidate.email.toLowerCase() === String(body.email || "").toLowerCase());
    if (!found || found.password !== body.password) {
      throw new Error("Invalid email or password");
    }
    return { token: `demo-token-${found.id}`, user: publicUser(found) };
  }

  function demoRegister(body) {
    const users = demoUsers();
    const email = String(body.email || "").trim().toLowerCase();
    if (users.some((candidate) => candidate.email.toLowerCase() === email)) {
      throw new Error("An account already exists for this email");
    }
    const created = {
      id: `user-${Date.now()}`,
      name: body.name || "Learner",
      email,
      password: body.password,
      college: body.college || "",
      branch: body.branch || "",
      year: body.year || "",
      roles: ["LEARNER"],
      selectedSkillIds: []
    };
    users.push(created);
    saveDemoUsers(users);
    const progress = demoProgress();
    progress[created.id] = {};
    saveDemoProgress(progress);
    return { token: `demo-token-${created.id}`, user: publicUser(created) };
  }

  function requireDemoUser() {
    const current = user();
    if (!current) throw new Error("Please login first.");
    const fullUser = demoUsers().find((candidate) => candidate.id === current.id) || current;
    return publicUser(fullUser);
  }

  function demoSelectSkills(skillIds) {
    const current = requireDemoUser();
    const validSkillIds = skillIds.map((value) => findSkill(value).id);
    const users = demoUsers().map((candidate) => candidate.id === current.id ? { ...candidate, selectedSkillIds: validSkillIds } : candidate);
    saveDemoUsers(users);
    localStorage.setItem(userKey, JSON.stringify({ ...current, selectedSkillIds: validSkillIds }));
    const progress = demoProgress();
    progress[current.id] ||= {};
    validSkillIds.forEach((skillId) => {
      progress[current.id][skillId] ||= emptyProgress();
    });
    saveDemoProgress(progress);
    return validSkillIds.map(findSkill);
  }

  function demoRoadmap(skillIdentifier) {
    const foundSkill = findSkill(skillIdentifier);
    const progress = token() && user() ? progressFor(foundSkill.id) : emptyProgress();
    const roadmapModules = modules
      .filter((item) => item.skillId === foundSkill.id)
      .map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        orderIndex: item.orderIndex,
        concepts: item.conceptIds.map((conceptId) => {
          const foundConcept = findConcept(conceptId);
          return { ...foundConcept, completed: progress.completedConceptIds.includes(conceptId) };
        }),
        completed: progress.completedModuleIds.includes(item.id)
      }));
    return {
      skill: foundSkill,
      modules: roadmapModules,
      totalConcepts: new Set(roadmapModules.flatMap((item) => item.concepts.map((entry) => entry.id))).size
    };
  }

  function demoTopic(skillIdentifier, conceptIdentifier) {
    const foundSkill = findSkill(skillIdentifier);
    const foundConcept = findConcept(conceptIdentifier);
    const impl = implementationFor(foundSkill, foundConcept);
    const rich = richTopicFor(foundSkill, foundConcept, impl);
    return {
      conceptId: foundConcept.id,
      conceptName: foundConcept.name,
      conceptSlug: foundConcept.slug,
      skillId: foundSkill.id,
      skillName: foundSkill.name,
      ...impl,
      ...rich,
      practiceQuestions: [demoPractice(foundSkill.id, foundConcept.id)],
      quiz: demoQuiz(foundSkill.id, foundConcept.id, false)
    };
  }

  function demoPractice(skillIdentifier, conceptIdentifier) {
    const foundSkill = findSkill(skillIdentifier);
    const foundConcept = findConcept(conceptIdentifier);
    const impl = implementationFor(foundSkill, foundConcept);
    const challenge = practiceChallengeFor(foundSkill, foundConcept, impl);
    return {
      id: `${foundSkill.id}-${foundConcept.id}-practice`,
      title: `Practice ${foundConcept.name} in ${foundSkill.name}`,
      difficulty: challenge.difficulty,
      prompt: challenge.prompt,
      sampleInput: challenge.sampleInput,
      sampleOutput: challenge.sampleOutput,
      expectedOutput: challenge.expectedOutput,
      hints: challenge.hints
    };
  }

  function demoQuiz(skillIdentifier, conceptIdentifier, includeAnswers = true) {
    const foundSkill = findSkill(skillIdentifier);
    const foundConcept = findConcept(conceptIdentifier);
    const impl = implementationFor(foundSkill, foundConcept);
    const questions = [
      {
        id: "q1",
        text: `What is the main purpose of ${foundConcept.name}?`,
        options: [impl.definition, "To decorate a page visually", "To replace authentication", "To skip testing"],
        correctOptionIndex: 0,
        explanation: impl.definition
      },
      {
        id: "q2",
        text: "Which item is a common beginner mistake?",
        options: ["Writing clear names", impl.commonMistakes[0], "Testing small examples", "Reading error messages"],
        correctOptionIndex: 1,
        explanation: impl.commonMistakes[0]
      },
      {
        id: "q3",
        text: "What is a good next step after learning this topic?",
        options: ["Memorize without practicing", "Avoid examples", "Build a short practice solution", "Delete the code"],
        correctOptionIndex: 2,
        explanation: "Practice turns syntax knowledge into usable problem-solving skill."
      }
    ];
    return {
      id: `${foundSkill.id}-${foundConcept.id}-quiz`,
      title: `${foundConcept.name} Quiz`,
      questions: includeAnswers ? questions : questions.map(({ correctOptionIndex, explanation, ...question }) => question)
    };
  }

  function demoSubmitQuiz(body) {
    const [skillId, conceptId] = String(body.quizId || "").replace("-quiz", "").split(/-(?=[a-z])/);
    const foundSkill = findSkill(body.skillId || skillId);
    const foundConcept = findConcept(body.conceptId || conceptId || "variables");
    const quiz = demoQuiz(foundSkill.id, foundConcept.id, true);
    let score = 0;
    const answers = quiz.questions.map((question) => {
      const correct = Number(body.answers?.[question.id]) === question.correctOptionIndex;
      if (correct) score++;
      return {
        questionId: question.id,
        correct,
        correctOptionIndex: question.correctOptionIndex,
        explanation: question.explanation
      };
    });
    const percentage = Math.round((score * 100) / quiz.questions.length);
    const progress = setProgress(foundSkill.id, (current) => {
      current.quizScores[foundConcept.id] = percentage;
      if (percentage >= 80 && !current.badges.includes("Quiz Master")) current.badges.push("Quiz Master");
      return current;
    });
    saveDemoProgress(progress.all);
    return { score, total: quiz.questions.length, percentage, answers };
  }

  function demoCompleteTopic(skillIdentifier, conceptIdentifier) {
    const foundSkill = findSkill(skillIdentifier);
    const foundConcept = findConcept(conceptIdentifier);
    const updated = setProgress(foundSkill.id, (current) => {
      if (!current.completedConceptIds.includes(foundConcept.id)) current.completedConceptIds.push(foundConcept.id);
      if (!current.badges.includes("Topic Completed")) current.badges.push("Topic Completed");
      if (foundConcept.id === "arrays" && !current.badges.includes("Array Expert")) current.badges.push("Array Expert");
      if (foundConcept.id === "loops" && !current.badges.includes("Loop Master")) current.badges.push("Loop Master");
      current.streakDays = Math.max(1, current.streakDays || 0);
      current.completedModuleIds = completedModuleIds(foundSkill.id, current.completedConceptIds);
      if (current.completedModuleIds.length && !current.badges.includes("Module Completed")) current.badges.push("Module Completed");
      if (allConceptIds(foundSkill.id).every((id) => current.completedConceptIds.includes(id)) && !current.badges.includes("Skill Completed")) {
        current.badges.push("Skill Completed");
      }
      return current;
    });
    saveDemoProgress(updated.all);
    return demoProgressSummary(foundSkill.id);
  }

  function demoProgressSummary(skillIdentifier) {
    const foundSkill = findSkill(skillIdentifier);
    const current = progressFor(foundSkill.id);
    const conceptIds = allConceptIds(foundSkill.id);
    const completedTopics = current.completedConceptIds.filter((id) => conceptIds.includes(id)).length;
    const quizValues = Object.values(current.quizScores || {});
    const quizAverage = quizValues.length ? Math.round(quizValues.reduce((sum, value) => sum + value, 0) / quizValues.length) : 0;
    return {
      skillId: foundSkill.id,
      skillName: foundSkill.name,
      totalTopics: conceptIds.length,
      completedTopics,
      learningPercentage: conceptIds.length ? Math.round((completedTopics * 100) / conceptIds.length) : 0,
      completedModules: current.completedModuleIds.length,
      quizAverage,
      badges: (current.badges || []).map(badgeView),
      streakDays: current.streakDays || 0,
      currentTopic: nextTopicName(foundSkill.id, current.completedConceptIds)
    };
  }

  function demoCompare(conceptIdentifier, skillIdsCsv) {
    const foundConcept = findConcept(conceptIdentifier);
    const selected = skillIdsCsv
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map(findSkill);
    const compareSkills = selected.length ? selected : [findSkill("java"), findSkill("python")];
    return {
      conceptName: foundConcept.name,
      conceptSlug: foundConcept.slug,
      items: compareSkills.map((foundSkill) => {
        const impl = implementationFor(foundSkill, foundConcept);
        return {
          skillId: foundSkill.id,
          skillName: foundSkill.name,
          definition: impl.definition,
          syntax: impl.syntax,
          codeExample: impl.codeExample,
          output: impl.output,
          advantages: impl.advantages,
          disadvantages: impl.disadvantages,
          commonMistakes: impl.commonMistakes,
          interviewQuestions: impl.interviewQuestions
        };
      }),
      similarities: [
        "The problem-solving idea stays the same across skills.",
        "Syntax changes, but the concept helps structure logic.",
        "Practice makes language-specific differences easier to remember."
      ],
      differences: [
        "Typing rules differ between Java, Python, JavaScript, and C++.",
        "Built-in methods and library support vary by language.",
        "Error behavior and runtime checks are not exactly the same."
      ]
    };
  }

  function demoProfile() {
    const current = enrichedUser(requireDemoUser());
    const selectedSkillIds = current.selectedSkillIds || [];
    return {
      user: current,
      selectedSkills: selectedSkillIds.map(findSkill),
      progress: selectedSkillIds.map(demoProgressSummary),
      badges: [...new Set(selectedSkillIds.flatMap((skillId) => progressFor(skillId).badges || []))].map(badgeView)
    };
  }

  function implementationFor(foundSkill, foundConcept) {
    const language = foundSkill.slug;
    const generic = {
      definition: `${foundConcept.name} helps ${foundSkill.name} learners solve problems in a more structured way.`,
      syntax: `${foundConcept.slug} concept syntax in ${foundSkill.name}`,
      explanation: "Use this concept when you want code or technical thinking to be easier to understand, reuse, test, or scale.",
      realWorldExample: "In Code-Friendly, this concept helps learners move from theory to a working portfolio-ready project.",
      codeExample: `// ${foundSkill.name}: ${foundConcept.name}\n// Build a small example and test it step by step.`,
      output: "Working result",
      advantages: ["Improves structure", "Supports reuse", "Makes practice easier to review"],
      disadvantages: ["Syntax differs between skills", "Beginners may overuse it before understanding the basics"],
      commonMistakes: ["Skipping small examples", "Using unclear names", "Ignoring error messages"],
      interviewQuestions: [`Why is ${foundConcept.name} useful?`, `How does ${foundSkill.name} implement it?`, "What mistake would you avoid in production code?"]
    };

    const programming = programmingImplementationFor(foundSkill, foundConcept);
    if (programming) return { ...generic, ...programming };

    const cOnly = cOnlyImplementationFor(foundSkill, foundConcept);
    if (cOnly) return { ...generic, ...cOnly };

    const examples = {
      variables: {
        java: ["A Java variable is a typed name that stores a value in memory.", "int score = 95;", "int score = 95;\nString name = \"Asha\";\nSystem.out.println(name + \" \" + score);", "Asha 95"],
        python: ["A Python variable is a name that points to a value and can change during execution.", "score = 95", "score = 95\nname = \"Asha\"\nprint(name, score)", "Asha 95"],
        javascript: ["A JavaScript variable stores a value using let, const, or var.", "let score = 95;", "const name = \"Asha\";\nlet score = 95;\nconsole.log(`${name} scored ${score}`);", "Asha scored 95"],
        "c-plus-plus": ["A C++ variable is a typed storage location declared before use.", "int score = 95;", "int score = 95;\nstring name = \"Asha\";\ncout << name << \" \" << score;", "Asha 95"]
      },
      arrays: {
        java: ["A Java array stores a fixed number of same-type values and is accessed by index.", "int[] marks = {85, 90, 95};", "int[] marks = {85, 90, 95};\nfor (int mark : marks) {\n    System.out.println(mark);\n}", "85\n90\n95"],
        python: ["Python uses lists as dynamic array-like collections for ordered values.", "marks = [85, 90, 95]", "marks = [85, 90, 95]\nfor mark in marks:\n    print(mark)", "85\n90\n95"],
        javascript: ["A JavaScript array is a dynamic ordered collection with helpful built-in methods.", "const marks = [85, 90, 95];", "const marks = [85, 90, 95];\nmarks.forEach(mark => console.log(mark));", "85\n90\n95"],
        "c-plus-plus": ["A C++ array stores fixed-size values of the same type in contiguous memory.", "int marks[] = {85, 90, 95};", "int marks[] = {85, 90, 95};\nfor (int mark : marks) {\n    cout << mark << endl;\n}", "85\n90\n95"]
      },
      loops: {
        java: ["Java loops repeat code using for, while, do-while, or enhanced for syntax.", "for (int i = 0; i < n; i++)", "for (int day = 1; day <= 3; day++) {\n    System.out.println(\"Day \" + day);\n}", "Day 1\nDay 2\nDay 3"],
        python: ["Python loops repeat code over a sequence or while a condition remains true.", "for item in items:", "for day in range(1, 4):\n    print(f\"Day {day}\")", "Day 1\nDay 2\nDay 3"],
        javascript: ["JavaScript loops repeat code with for, while, for...of, and array methods.", "for (const item of items) { ... }", "for (let day = 1; day <= 3; day++) {\n    console.log(`Day ${day}`);\n}", "Day 1\nDay 2\nDay 3"],
        "c-plus-plus": ["C++ loops repeat code with for, while, and range-based for statements.", "for (int i = 0; i < n; i++)", "for (int day = 1; day <= 3; day++) {\n    cout << \"Day \" << day << endl;\n}", "Day 1\nDay 2\nDay 3"]
      },
      functions: {
        java: ["A Java method is a function that belongs to a class or object.", "static int add(int a, int b)", "static int add(int a, int b) {\n    return a + b;\n}\nSystem.out.println(add(4, 5));", "9"],
        python: ["A Python function is reusable logic defined with def.", "def add(a, b):", "def add(a, b):\n    return a + b\n\nprint(add(4, 5))", "9"],
        javascript: ["A JavaScript function packages reusable behavior and can be declared or assigned.", "function add(a, b) { return a + b; }", "function add(a, b) {\n    return a + b;\n}\nconsole.log(add(4, 5));", "9"],
        "c-plus-plus": ["A C++ function has a return type, name, parameters, and body.", "int add(int a, int b)", "int add(int a, int b) {\n    return a + b;\n}\ncout << add(4, 5);", "9"]
      }
    };

    const match = examples[foundConcept.slug]?.[language];
    if (!match) return generic;
    return { ...generic, definition: match[0], syntax: match[1], codeExample: match[2], output: match[3] };
  }

  function enrichTopicResponse(topic, path) {
    const parts = new URL(path, "http://code-friendly.local").pathname.split("/").filter(Boolean);
    const foundSkill = findSkill(topic.skillSlug || topic.skillId || parts[1]);
    const foundConcept = findConcept(topic.conceptSlug || parts[2] || topic.conceptId);
    const localImpl = implementationFor(foundSkill, foundConcept);
    const merged = {
      ...localImpl,
      ...topic,
      conceptId: foundConcept.id,
      conceptName: topic.conceptName || foundConcept.name,
      conceptSlug: foundConcept.slug,
      skillId: foundSkill.id,
      skillName: topic.skillName || foundSkill.name
    };
    return { ...merged, ...richTopicFor(foundSkill, foundConcept, merged) };
  }

  function richTopicFor(foundSkill, foundConcept, impl) {
    const conceptName = foundConcept.name;
    const skillName = foundSkill.name;
    const challenge = practiceChallengeFor(foundSkill, foundConcept, impl);
    return {
      definitionDetails: [
        `${conceptName} is important in ${skillName} because it gives learners a repeatable way to think about code instead of memorizing isolated lines. A student should first understand what problem the topic solves, then learn the syntax, and only then write small examples.`,
        `In exams, labs, projects, and interviews, this topic usually appears as a small rule hidden inside a larger question. The learner's job is to recognize the topic, choose the correct syntax, and produce output that matches the requirement exactly.`,
        `The safest learning method is to connect every line of code with one visible result. If the learner can explain the input, stored values, processing step, and output, the concept is becoming practical knowledge.`
      ],
      explanationDetails: [
        `Start by reading the goal of the program in plain English. Next, identify the values involved, the operation performed on those values, and the final result expected on the screen. This prevents students from writing code blindly.`,
        `After reading the syntax, trace the example from top to bottom. Notice where values are created, where they change, and which line finally prints or returns the answer. This habit makes errors easier to locate.`,
        `When practicing ${conceptName}, change one value in the example and predict the new output before running it. That small prediction step builds real confidence because the learner is not only copying code; they are understanding behavior.`
      ],
      learningSteps: [
        `Read the ${conceptName} definition and say it in your own words.`,
        `Look at the syntax and identify the keywords, names, values, and symbols.`,
        `Run through the first example line by line and match each line to the output.`,
        `Change one input or value and predict the result before checking it.`,
        `Write the same idea again without looking at the example.`
      ],
      checkpoints: [
        `Can you explain why ${conceptName} is needed in ${skillName}?`,
        "Can you point to the exact line where the main work happens?",
        "Can you predict the output when one value changes?",
        "Can you avoid the common mistakes listed on this page?"
      ],
      examples: topicExamplesFor(foundSkill, foundConcept, impl, challenge)
    };
  }

  function topicExamplesFor(foundSkill, foundConcept, impl, challenge) {
    const specific = specificLearningExamples(foundSkill, foundConcept);
    if (specific.length) return specific;
    return [
      {
        title: `Example 1: Basic ${foundConcept.name}`,
        input: challenge.sampleInput || "No input",
        code: impl.codeExample,
        output: impl.output,
        explanation: `This first example keeps the idea small. Focus on the line where ${foundConcept.name.toLowerCase()} is actually used, then connect that line to the output.`
      },
      {
        title: `Example 2: Change One Value`,
        input: "Change one value from the first example",
        code: changedValueExampleFor(foundSkill, foundConcept, impl),
        output: changedOutputFor(impl.output),
        explanation: "This example teaches prediction. A learner should change one value, pause, guess the result, and then compare the guess with the output."
      },
      {
        title: `Example 3: Mini Project Use`,
        input: challenge.sampleInput || "Small learner data",
        code: projectStyleExampleFor(foundSkill, foundConcept, impl),
        output: challenge.sampleOutput || impl.output,
        explanation: `This example connects ${foundConcept.name.toLowerCase()} to a small learning-project situation so the topic feels useful outside a single syntax exercise.`
      }
    ];
  }

  function changedValueExampleFor(foundSkill, foundConcept, impl) {
    const code = String(impl.codeExample || "");
    if (foundSkill.slug === "c" && foundConcept.slug === "variables") {
      return codeBlock(
        "#include <stdio.h>",
        "",
        "int main() {",
        "    int score = 80;",
        "    int bonus = 5;",
        "    int finalScore = score + bonus;",
        "    printf(\"Final score: %d\", finalScore);",
        "    return 0;",
        "}"
      );
    }
    if (/\b95\b/.test(code)) return code.replaceAll("95", "80");
    if (/\bJava\b/.test(code)) return code.replaceAll("Java", foundSkill.name);
    return `${code}\n\n// Now change one value and predict the new output before running again.`;
  }

  function changedOutputFor(output) {
    const value = String(output || "Updated result");
    if (value.includes("95")) return value.replaceAll("95", "80");
    if (value.includes("Java")) return value.replaceAll("Java", "Updated skill");
    return value;
  }

  function projectStyleExampleFor(foundSkill, foundConcept, impl) {
    if (foundSkill.slug === "c" && foundConcept.slug === "variables") {
      return codeBlock(
        "#include <stdio.h>",
        "",
        "int main() {",
        "    int completedTopics = 3;",
        "    int totalTopics = 9;",
        "    int remainingTopics = totalTopics - completedTopics;",
        "",
        "    printf(\"Completed: %d\\n\", completedTopics);",
        "    printf(\"Remaining: %d\", remainingTopics);",
        "    return 0;",
        "}"
      );
    }
    const comment = codeCommentFor(foundSkill.slug);
    return codeBlock(
      `${comment} Mini project idea for ${foundConcept.name}`,
      `${comment} Use this concept in a learner progress screen.`,
      impl.codeExample
    );
  }

  function codeCommentFor(language) {
    return language === "python" ? "#" : language === "sql" ? "--" : "//";
  }

  function specificLearningExamples(foundSkill, foundConcept) {
    if (foundSkill.slug === "c" && foundConcept.slug === "variables") {
      return [
        {
          title: "Example 1: Store Student Details",
          input: "No input",
          code: codeBlock(
            "#include <stdio.h>",
            "",
            "int main() {",
            "    int id = 10;",
            "    int marks = 95;",
            "",
            "    printf(\"Student id: %d\\n\", id);",
            "    printf(\"Marks: %d\", marks);",
            "    return 0;",
            "}"
          ),
          output: "Student id: 10\nMarks: 95",
          explanation: "Here id and marks are variables. They store numbers with meaningful names, so the print lines are easy to understand."
        },
        {
          title: "Example 2: Update A Variable",
          input: "No input",
          code: codeBlock(
            "#include <stdio.h>",
            "",
            "int main() {",
            "    int score = 70;",
            "    score = score + 10;",
            "",
            "    printf(\"Updated score: %d\", score);",
            "    return 0;",
            "}"
          ),
          output: "Updated score: 80",
          explanation: "The first line creates score with value 70. The next line reads the old value, adds 10, and stores the new value back into score."
        },
        {
          title: "Example 3: Calculate Remaining Topics",
          input: "No input",
          code: codeBlock(
            "#include <stdio.h>",
            "",
            "int main() {",
            "    int totalTopics = 9;",
            "    int completedTopics = 3;",
            "    int remainingTopics = totalTopics - completedTopics;",
            "",
            "    printf(\"Remaining topics: %d\", remainingTopics);",
            "    return 0;",
            "}"
          ),
          output: "Remaining topics: 6",
          explanation: "This looks like a real learning-dashboard calculation. The variables make the formula readable: total minus completed gives remaining."
        }
      ];
    }
    return [];
  }

  function programmingImplementationFor(foundSkill, foundConcept) {
    const topic = programmingTopics()[foundConcept.slug];
    const example = topic?.examples?.[foundSkill.slug] || cProgrammingExampleFor(foundSkill, foundConcept);
    if (!topic || !example) return null;
    return {
      definition: `${topic.definition} In ${foundSkill.name}, this topic has its own syntax and standard library habits.`,
      syntax: example.syntax,
      explanation: topic.explanation,
      realWorldExample: topic.realWorldExample,
      codeExample: example.code,
      output: example.output,
      advantages: topic.advantages,
      disadvantages: topic.disadvantages,
      commonMistakes: topic.commonMistakes,
      interviewQuestions: topic.interviewQuestions.map((question) => question.replaceAll("{skill}", foundSkill.name))
    };
  }

  function cProgrammingExampleFor(foundSkill, foundConcept) {
    if (foundSkill.slug !== "c") return null;
    const examples = {
      variables: {
        syntax: "int score = 95;\nchar grade = 'A';",
        code: codeBlock("#include <stdio.h>", "", "int main() {", "    int score = 95;", "    char grade = 'A';", "    printf(\"Score: %d\\n\", score);", "    printf(\"Grade: %c\", grade);", "    return 0;", "}"),
        output: "Score: 95\nGrade: A"
      },
      "data-types": {
        syntax: "int age = 18;\nfloat cgpa = 8.7;\nchar section = 'B';",
        code: codeBlock("#include <stdio.h>", "", "int main() {", "    int age = 18;", "    float cgpa = 8.7;", "    char section = 'B';", "    printf(\"Age: %d\\n\", age);", "    printf(\"CGPA: %.1f\\n\", cgpa);", "    printf(\"Section: %c\", section);", "    return 0;", "}"),
        output: "Age: 18\nCGPA: 8.7\nSection: B"
      },
      operators: {
        syntax: "int total = theory + lab;",
        code: codeBlock("#include <stdio.h>", "", "int main() {", "    int theory = 45;", "    int lab = 50;", "    int total = theory + lab;", "    printf(\"Total: %d\", total);", "    return 0;", "}"),
        output: "Total: 95"
      },
      conditionals: {
        syntax: "if (score >= 40) { ... } else { ... }",
        code: codeBlock("#include <stdio.h>", "", "int main() {", "    int score = 72;", "    if (score >= 40) {", "        printf(\"Pass\");", "    } else {", "        printf(\"Improve\");", "    }", "    return 0;", "}"),
        output: "Pass"
      },
      strings: {
        syntax: "char name[] = \"Asha\";",
        code: codeBlock("#include <stdio.h>", "", "int main() {", "    char name[] = \"Asha\";", "    printf(\"Hello %s\", name);", "    return 0;", "}"),
        output: "Hello Asha"
      },
      arrays: {
        syntax: "int marks[] = {80, 90, 85};",
        code: codeBlock("#include <stdio.h>", "", "int main() {", "    int marks[] = {80, 90, 85};", "    int total = 0;", "    for (int i = 0; i < 3; i++) {", "        total = total + marks[i];", "    }", "    printf(\"Total marks: %d\", total);", "    return 0;", "}"),
        output: "Total marks: 255"
      },
      loops: {
        syntax: "for (int i = 1; i <= 5; i++)",
        code: codeBlock("#include <stdio.h>", "", "int main() {", "    for (int i = 1; i <= 5; i++) {", "        printf(\"%d\", i);", "        if (i < 5) printf(\" \");", "    }", "    return 0;", "}"),
        output: "1 2 3 4 5"
      },
      functions: {
        syntax: "int add(int a, int b) { return a + b; }",
        code: codeBlock("#include <stdio.h>", "", "int add(int a, int b) {", "    return a + b;", "}", "", "int main() {", "    printf(\"Sum: %d\", add(4, 5));", "    return 0;", "}"),
        output: "Sum: 9"
      },
      recursion: {
        syntax: "int factorial(int n) { ... }",
        code: codeBlock("#include <stdio.h>", "", "int factorial(int n) {", "    if (n <= 1) return 1;", "    return n * factorial(n - 1);", "}", "", "int main() {", "    printf(\"Factorial: %d\", factorial(5));", "    return 0;", "}"),
        output: "Factorial: 120"
      }
    };
    return examples[foundConcept.slug] || null;
  }

  function cOnlyImplementationFor(foundSkill, foundConcept) {
    if (foundSkill.slug !== "c") return null;
    const topics = {
      "memory-basics": {
        definition: "Memory basics in C means understanding that every variable occupies space in memory and has an address.",
        syntax: "int score = 95;\nprintf(\"%p\", &score);",
        explanation: "C gives students a closer view of memory than many beginner languages. The & operator shows the address of a variable, and this prepares learners for pointers.",
        realWorldExample: "When a C program stores marks, each mark lives somewhere in memory. Knowing this helps students understand why arrays and pointers are powerful.",
        codeExample: codeBlock("#include <stdio.h>", "", "int main() {", "    int score = 95;", "    printf(\"Value: %d\\n\", score);", "    printf(\"Address exists for score\");", "    return 0;", "}"),
        output: "Value: 95\nAddress exists for score",
        advantages: ["Builds strong C fundamentals", "Prepares learners for pointers", "Explains why data size matters"],
        disadvantages: ["Memory addresses can look confusing at first", "Wrong memory use can cause hard bugs", "Beginners may focus on addresses before values"],
        commonMistakes: ["Confusing a value with its address", "Printing addresses with the wrong format", "Forgetting that every variable has a type and size"],
        interviewQuestions: ["What is a memory address?", "Why does C expose memory more directly?", "How is a variable value different from its address?"]
      },
      pointers: {
        definition: "A pointer is a C variable that stores the memory address of another variable.",
        syntax: "int score = 95;\nint *ptr = &score;",
        explanation: "Pointers become easier when read in two parts: & gets the address of a variable, and * can declare a pointer or read the value at the stored address.",
        realWorldExample: "Functions can use pointers to update original values, which is common in C input, arrays, strings, and memory work.",
        codeExample: codeBlock("#include <stdio.h>", "", "int main() {", "    int score = 95;", "    int *ptr = &score;", "", "    printf(\"Score: %d\\n\", score);", "    printf(\"Through pointer: %d\", *ptr);", "    return 0;", "}"),
        output: "Score: 95\nThrough pointer: 95",
        advantages: ["Allows direct memory access", "Supports efficient array and string handling", "Lets functions update original values"],
        disadvantages: ["Invalid pointers can crash programs", "Syntax takes practice", "Memory bugs can be difficult to trace"],
        commonMistakes: ["Using a pointer before assigning an address", "Confusing ptr with *ptr", "Forgetting & when storing an address"],
        interviewQuestions: ["What does a pointer store?", "What is the difference between &score and *ptr?", "Why are pointers important in C?"]
      }
    };
    return topics[foundConcept.slug] || null;
  }

  function programmingTopics() {
    const commonInterview = [
      "How does {skill} implement this concept?",
      "What mistake would you watch for when using it?",
      "Where would you use it in a real project?"
    ];
    return {
      "variables": {
        definition: "Variables are named storage for values that a program reads, changes, and reuses.",
        explanation: "Use variables when a value has meaning and will be reused. Good variable names make code easier to read and debug.",
        realWorldExample: "A learning dashboard stores the learner name, current score, selected skill, and progress percentage in variables before showing them on screen.",
        advantages: ["Makes values reusable", "Improves readability", "Reduces repeated literals"],
        disadvantages: ["Wrong type choices can cause errors", "Unclear names hide meaning", "Changing shared values can create bugs"],
        commonMistakes: ["Using names like x for meaningful data", "Reusing one variable for unrelated values", "Forgetting that some variables cannot be reassigned"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "String name = \"Asha\";\nint score = 95;", code: codeBlock("String name = \"Asha\";", "int score = 95;", "System.out.println(name + \" scored \" + score);"), output: "Asha scored 95" },
          python: { syntax: "name = \"Asha\"\nscore = 95", code: codeBlock("name = \"Asha\"", "score = 95", "print(f\"{name} scored {score}\")"), output: "Asha scored 95" },
          javascript: { syntax: "const name = \"Asha\";\nlet score = 95;", code: codeBlock("const name = \"Asha\";", "let score = 95;", "console.log(`${name} scored ${score}`);"), output: "Asha scored 95" },
          "c-plus-plus": { syntax: "string name = \"Asha\";\nint score = 95;", code: codeBlock("string name = \"Asha\";", "int score = 95;", "cout << name << \" scored \" << score;"), output: "Asha scored 95" }
        }
      },
      "data-types": {
        definition: "Data types describe what kind of value a variable can hold, such as numbers, text, booleans, objects, or collections.",
        explanation: "Choose data types deliberately so the program knows what operations are allowed and what memory or runtime behavior to expect.",
        realWorldExample: "A student profile uses text for name, numbers for marks, booleans for completion status, and lists for selected skills.",
        advantages: ["Prevents invalid operations", "Clarifies intent", "Helps tools catch mistakes early"],
        disadvantages: ["Strict types need more upfront decisions", "Conversions can be confusing", "Dynamic types can hide mistakes until runtime"],
        commonMistakes: ["Mixing text and numbers without conversion", "Using floating point values for exact money-like data", "Assuming every language treats types the same way"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "int attempts = 3;\ndouble cgpa = 9.4;\nboolean active = true;", code: codeBlock("String name = \"Asha\";", "int attempts = 3;", "double cgpa = 9.4;", "boolean active = true;", "System.out.println(name + \" \" + attempts + \" \" + cgpa + \" \" + active);"), output: "Asha 3 9.4 true" },
          python: { syntax: "attempts = 3\ncgpa = 9.4\nactive = True", code: codeBlock("name = \"Asha\"", "attempts = 3", "cgpa = 9.4", "active = True", "print(name, attempts, cgpa, active)"), output: "Asha 3 9.4 True" },
          javascript: { syntax: "const attempts = 3;\nconst cgpa = 9.4;\nconst active = true;", code: codeBlock("const name = \"Asha\";", "const attempts = 3;", "const cgpa = 9.4;", "const active = true;", "console.log(name, attempts, cgpa, active);"), output: "Asha 3 9.4 true" },
          "c-plus-plus": { syntax: "int attempts = 3;\ndouble cgpa = 9.4;\nbool active = true;", code: codeBlock("string name = \"Asha\";", "int attempts = 3;", "double cgpa = 9.4;", "bool active = true;", "cout << name << \" \" << attempts << \" \" << cgpa << \" \" << boolalpha << active;"), output: "Asha 3 9.4 true" }
        }
      },
      "operators": {
        definition: "Operators are symbols or keywords that perform calculations, comparisons, assignments, and logical checks.",
        explanation: "Use arithmetic operators for totals, comparison operators for decisions, and logical operators when multiple conditions must be combined.",
        realWorldExample: "A quiz engine uses operators to calculate percentages and decide whether the learner earned a badge.",
        advantages: ["Keeps calculations concise", "Supports decision making", "Combines conditions clearly"],
        disadvantages: ["Operator precedence can surprise beginners", "Integer division differs by language", "Assignment and comparison can be confused"],
        commonMistakes: ["Using assignment when comparison was intended", "Forgetting parentheses around mixed operations", "Expecting string addition to behave the same in every language"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "int total = a + b;\nboolean passed = total >= 80;", code: codeBlock("int theory = 45;", "int lab = 50;", "int total = theory + lab;", "System.out.println(\"Total: \" + total);"), output: "Total: 95" },
          python: { syntax: "total = a + b\npassed = total >= 80", code: codeBlock("theory = 45", "lab = 50", "total = theory + lab", "print(f\"Total: {total}\")"), output: "Total: 95" },
          javascript: { syntax: "const total = a + b;\nconst passed = total >= 80;", code: codeBlock("const theory = 45;", "const lab = 50;", "const total = theory + lab;", "console.log(`Total: ${total}`);"), output: "Total: 95" },
          "c-plus-plus": { syntax: "int total = a + b;\nbool passed = total >= 80;", code: codeBlock("int theory = 45;", "int lab = 50;", "int total = theory + lab;", "cout << \"Total: \" << total;"), output: "Total: 95" }
        }
      },
      "conditionals": {
        definition: "Conditionals let a program choose between paths based on true or false expressions.",
        explanation: "Use conditionals to handle rules, validations, permissions, score ranges, and feature decisions.",
        realWorldExample: "A learning app checks whether a quiz score is at least 80 percent before awarding a Quiz Master badge.",
        advantages: ["Models real rules", "Handles alternate outcomes", "Keeps validation readable"],
        disadvantages: ["Too many nested conditions become hard to scan", "Boundary values are easy to miss", "Condition order matters"],
        commonMistakes: ["Missing the else case", "Using the wrong comparison operator", "Forgetting to test edge values"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "if (score >= 40) { ... } else { ... }", code: codeBlock("int score = 72;", "if (score >= 40) {", "    System.out.println(\"Pass\");", "} else {", "    System.out.println(\"Improve\");", "}"), output: "Pass" },
          python: { syntax: "if score >= 40:\n    ...\nelse:\n    ...", code: codeBlock("score = 72", "if score >= 40:", "    print(\"Pass\")", "else:", "    print(\"Improve\")"), output: "Pass" },
          javascript: { syntax: "if (score >= 40) { ... } else { ... }", code: codeBlock("const score = 72;", "if (score >= 40) {", "    console.log(\"Pass\");", "} else {", "    console.log(\"Improve\");", "}"), output: "Pass" },
          "c-plus-plus": { syntax: "if (score >= 40) { ... } else { ... }", code: codeBlock("int score = 72;", "if (score >= 40) {", "    cout << \"Pass\";", "} else {", "    cout << \"Improve\";", "}"), output: "Pass" }
        }
      },
      "strings": {
        definition: "Strings store and process text such as names, labels, messages, and user input.",
        explanation: "Use string operations for formatting, validation, search, splitting, joining, and display text.",
        realWorldExample: "The site builds messages like 'Asha completed Java' from learner and skill names.",
        advantages: ["Handles user-facing text", "Supports search and formatting", "Works naturally with input/output"],
        disadvantages: ["Case sensitivity can cause mismatches", "Concatenation can get messy", "Indexes and substrings are easy to miscount"],
        commonMistakes: ["Comparing text incorrectly", "Forgetting trim/case normalization", "Building long text without formatting helpers"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "String skill = \"Java\";\nskill.toUpperCase();", code: codeBlock("String skill = \"Java\";", "System.out.println(\"Learning \" + skill.toUpperCase());"), output: "Learning JAVA" },
          python: { syntax: "skill = \"Python\"\nskill.upper()", code: codeBlock("skill = \"Python\"", "print(f\"Learning {skill.upper()}\")"), output: "Learning PYTHON" },
          javascript: { syntax: "const skill = \"JavaScript\";\nskill.toUpperCase();", code: codeBlock("const skill = \"JavaScript\";", "console.log(`Learning ${skill.toUpperCase()}`);"), output: "Learning JAVASCRIPT" },
          "c-plus-plus": { syntax: "string skill = \"C++\";", code: codeBlock("string skill = \"C++\";", "cout << \"Learning \" << skill;"), output: "Learning C++" }
        }
      },
      "arrays": {
        definition: "Arrays and lists store ordered groups of related values under one name.",
        explanation: "Use arrays when the same operation must run across many values, such as marks, topics, or selected skills.",
        realWorldExample: "A roadmap stores concept names in an ordered list so the page can render each step.",
        advantages: ["Stores many values together", "Works well with loops", "Keeps related data organized"],
        disadvantages: ["Index errors are common", "Fixed-size arrays are less flexible", "Mixed data can reduce clarity"],
        commonMistakes: ["Starting from the wrong index", "Changing a list while looping over it", "Forgetting language-specific array size rules"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "int[] marks = {80, 90, 85};", code: codeBlock("int[] marks = {80, 90, 85};", "int total = 0;", "for (int mark : marks) {", "    total += mark;", "}", "System.out.println(\"Total marks: \" + total);"), output: "Total marks: 255" },
          python: { syntax: "marks = [80, 90, 85]", code: codeBlock("marks = [80, 90, 85]", "total = sum(marks)", "print(f\"Total marks: {total}\")"), output: "Total marks: 255" },
          javascript: { syntax: "const marks = [80, 90, 85];", code: codeBlock("const marks = [80, 90, 85];", "const total = marks.reduce((sum, mark) => sum + mark, 0);", "console.log(`Total marks: ${total}`);"), output: "Total marks: 255" },
          "c-plus-plus": { syntax: "int marks[] = {80, 90, 85};", code: codeBlock("int marks[] = {80, 90, 85};", "int total = 0;", "for (int mark : marks) {", "    total += mark;", "}", "cout << \"Total marks: \" << total;"), output: "Total marks: 255" }
        }
      },
      "loops": {
        definition: "Loops repeat a block of work while counting, reading a sequence, or waiting for a condition to change.",
        explanation: "Use loops when repeated code would otherwise be copied. Keep the stopping rule clear.",
        realWorldExample: "A skill page loops through roadmap concepts and creates one visible row per concept.",
        advantages: ["Removes duplicate code", "Processes collections efficiently", "Makes repeated workflows predictable"],
        disadvantages: ["Wrong stop conditions can create infinite loops", "Nested loops can become slow", "Loop variables can be accidentally changed"],
        commonMistakes: ["Using the wrong start or end value", "Forgetting to update a while-loop condition", "Doing too much unrelated work inside the loop"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "for (int i = 1; i <= 5; i++) { ... }", code: codeBlock("for (int i = 1; i <= 5; i++) {", "    System.out.print(i + (i < 5 ? \" \" : \"\"));", "}"), output: "1 2 3 4 5" },
          python: { syntax: "for i in range(1, 6):", code: codeBlock("for i in range(1, 6):", "    print(i, end=\" \" if i < 5 else \"\")"), output: "1 2 3 4 5" },
          javascript: { syntax: "for (let i = 1; i <= 5; i++) { ... }", code: codeBlock("const values = [];", "for (let i = 1; i <= 5; i++) {", "    values.push(i);", "}", "console.log(values.join(\" \"));"), output: "1 2 3 4 5" },
          "c-plus-plus": { syntax: "for (int i = 1; i <= 5; i++) { ... }", code: codeBlock("for (int i = 1; i <= 5; i++) {", "    cout << i << (i < 5 ? \" \" : \"\");", "}"), output: "1 2 3 4 5" }
        }
      },
      "functions": {
        definition: "Functions package reusable logic behind a clear name and optional inputs.",
        explanation: "Use functions to avoid repetition, make code testable, and keep each block focused on one job.",
        realWorldExample: "The website uses functions to load skills, render cards, and calculate progress consistently.",
        advantages: ["Improves reuse", "Makes testing easier", "Breaks large problems into smaller parts"],
        disadvantages: ["Too many tiny functions can be noisy", "Poor names hide intent", "Side effects make functions harder to reason about"],
        commonMistakes: ["Forgetting to return a value", "Mixing too many tasks into one function", "Using unclear parameter names"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "static int add(int a, int b) { return a + b; }", code: codeBlock("static int add(int a, int b) {", "    return a + b;", "}", "System.out.println(\"Sum: \" + add(4, 5));"), output: "Sum: 9" },
          python: { syntax: "def add(a, b):\n    return a + b", code: codeBlock("def add(a, b):", "    return a + b", "", "print(f\"Sum: {add(4, 5)}\")"), output: "Sum: 9" },
          javascript: { syntax: "function add(a, b) { return a + b; }", code: codeBlock("function add(a, b) {", "    return a + b;", "}", "console.log(`Sum: ${add(4, 5)}`);"), output: "Sum: 9" },
          "c-plus-plus": { syntax: "int add(int a, int b) { return a + b; }", code: codeBlock("int add(int a, int b) {", "    return a + b;", "}", "cout << \"Sum: \" << add(4, 5);"), output: "Sum: 9" }
        }
      },
      "collections": {
        definition: "Collections are flexible containers such as lists, maps, sets, vectors, and dictionaries.",
        explanation: "Use collections when data needs to grow, be searched by key, avoid duplicates, or be processed with library helpers.",
        realWorldExample: "A profile stores selected skill IDs in a collection so progress can be tracked for each selected roadmap.",
        advantages: ["More flexible than plain arrays", "Provides useful built-in operations", "Supports real application data structures"],
        disadvantages: ["Choosing the wrong collection hurts clarity or speed", "Mutation can surprise other code", "Ordering rules differ by collection"],
        commonMistakes: ["Using a list when key lookup is needed", "Assuming every collection keeps insertion order", "Forgetting duplicate rules in sets"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "List<String> skills = new ArrayList<>();", code: codeBlock("List<String> skills = new ArrayList<>();", "skills.add(\"Java\");", "skills.add(\"SQL\");", "skills.add(\"AWS\");", "System.out.println(\"Skills added: \" + skills.size());"), output: "Skills added: 3" },
          python: { syntax: "skills = [\"Python\", \"SQL\", \"AWS\"]", code: codeBlock("skills = [\"Python\", \"SQL\", \"AWS\"]", "print(f\"Skills added: {len(skills)}\")"), output: "Skills added: 3" },
          javascript: { syntax: "const skills = [\"JavaScript\", \"SQL\", \"AWS\"];", code: codeBlock("const skills = [\"JavaScript\", \"SQL\", \"AWS\"];", "console.log(`Skills added: ${skills.length}`);"), output: "Skills added: 3" },
          "c-plus-plus": { syntax: "vector<string> skills = {\"C++\", \"SQL\", \"AWS\"};", code: codeBlock("vector<string> skills = {\"C++\", \"SQL\", \"AWS\"};", "cout << \"Skills added: \" << skills.size();"), output: "Skills added: 3" }
        }
      },
      "recursion": {
        definition: "Recursion solves a problem by letting a function call itself with a smaller input.",
        explanation: "Use recursion when a problem naturally breaks into repeated smaller subproblems. Always define a base case.",
        realWorldExample: "A nested topic tree can be rendered recursively by drawing one topic and then drawing its child topics.",
        advantages: ["Matches tree-like problems", "Can make divide-and-conquer logic clear", "Encourages base-case thinking"],
        disadvantages: ["Missing base cases cause endless calls", "Deep recursion can overflow the call stack", "Iteration may be simpler for basic loops"],
        commonMistakes: ["Forgetting the base case", "Not reducing the input", "Using recursion where a simple loop is clearer"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "static int factorial(int n) { ... }", code: codeBlock("static int factorial(int n) {", "    if (n <= 1) return 1;", "    return n * factorial(n - 1);", "}", "System.out.println(\"Factorial: \" + factorial(5));"), output: "Factorial: 120" },
          python: { syntax: "def factorial(n):", code: codeBlock("def factorial(n):", "    if n <= 1:", "        return 1", "    return n * factorial(n - 1)", "", "print(f\"Factorial: {factorial(5)}\")"), output: "Factorial: 120" },
          javascript: { syntax: "function factorial(n) { ... }", code: codeBlock("function factorial(n) {", "    if (n <= 1) return 1;", "    return n * factorial(n - 1);", "}", "console.log(`Factorial: ${factorial(5)}`);"), output: "Factorial: 120" },
          "c-plus-plus": { syntax: "int factorial(int n) { ... }", code: codeBlock("int factorial(int n) {", "    if (n <= 1) return 1;", "    return n * factorial(n - 1);", "}", "cout << \"Factorial: \" << factorial(5);"), output: "Factorial: 120" }
        }
      },
      "oop": {
        definition: "Object-oriented programming groups data and behavior into objects that model a real concept.",
        explanation: "Use OOP when related state and actions belong together, such as a learner with name, branch, progress, and methods.",
        realWorldExample: "A User object can hold profile fields and provide behavior such as checking whether a skill is selected.",
        advantages: ["Groups related data and behavior", "Supports larger application structure", "Improves domain modeling"],
        disadvantages: ["Overusing objects can add ceremony", "Shared mutable state can be confusing", "Inheritance-heavy designs can become rigid"],
        commonMistakes: ["Creating classes without useful behavior", "Making every field public", "Using inheritance where composition is simpler"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "class Student { String name; void show() { ... } }", code: codeBlock("class Student {", "    String name;", "    Student(String name) { this.name = name; }", "    void show() { System.out.println(\"Student \" + name); }", "}", "new Student(\"Asha\").show();"), output: "Student Asha" },
          python: { syntax: "class Student:", code: codeBlock("class Student:", "    def __init__(self, name):", "        self.name = name", "    def show(self):", "        print(f\"Student {self.name}\")", "", "Student(\"Asha\").show()"), output: "Student Asha" },
          javascript: { syntax: "class Student { constructor(name) { ... } }", code: codeBlock("class Student {", "    constructor(name) { this.name = name; }", "    show() { console.log(`Student ${this.name}`); }", "}", "new Student(\"Asha\").show();"), output: "Student Asha" },
          "c-plus-plus": { syntax: "class Student { public: void show(); };", code: codeBlock("class Student {", "public:", "    string name;", "    Student(string value) { name = value; }", "    void show() { cout << \"Student \" << name; }", "};", "Student(\"Asha\").show();"), output: "Student Asha" }
        }
      },
      "classes": {
        definition: "Classes are blueprints that define fields, constructors, and behavior for objects.",
        explanation: "Use classes to create consistent objects with the same shape and rules.",
        realWorldExample: "A Skill class defines every skill card with name, difficulty, color, and description.",
        advantages: ["Creates reusable object blueprints", "Keeps related behavior close to data", "Makes domain models easier to maintain"],
        disadvantages: ["Poorly designed classes become cluttered", "Large classes are hard to test", "Public fields can break encapsulation"],
        commonMistakes: ["Putting unrelated behavior in one class", "Skipping constructors or validation", "Using static members for object data"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "class Course { Course(String name) { ... } }", code: codeBlock("class Course {", "    String name;", "    Course(String name) { this.name = name; }", "    String label() { return \"Course: \" + name; }", "}", "System.out.println(new Course(\"Java\").label());"), output: "Course: Java" },
          python: { syntax: "class Course:", code: codeBlock("class Course:", "    def __init__(self, name):", "        self.name = name", "    def label(self):", "        return f\"Course: {self.name}\"", "", "print(Course(\"Python\").label())"), output: "Course: Python" },
          javascript: { syntax: "class Course { constructor(name) { ... } }", code: codeBlock("class Course {", "    constructor(name) { this.name = name; }", "    label() { return `Course: ${this.name}`; }", "}", "console.log(new Course(\"JavaScript\").label());"), output: "Course: JavaScript" },
          "c-plus-plus": { syntax: "class Course { public: Course(string name); };", code: codeBlock("class Course {", "public:", "    string name;", "    Course(string value) { name = value; }", "    string label() { return \"Course: \" + name; }", "};", "cout << Course(\"C++\").label();"), output: "Course: C++" }
        }
      },
      "inheritance": {
        definition: "Inheritance lets one type reuse and specialize behavior from another type.",
        explanation: "Use inheritance carefully when a child type truly is a specialized version of a parent type.",
        realWorldExample: "A PremiumLearner can reuse Learner details while adding certificate access behavior.",
        advantages: ["Reuses common behavior", "Supports specialized types", "Can simplify shared contracts"],
        disadvantages: ["Deep inheritance chains are hard to change", "Wrong parent-child relationships create rigid code", "Composition is often simpler"],
        commonMistakes: ["Using inheritance only to avoid copying code", "Overriding behavior without respecting the parent contract", "Creating too many hierarchy levels"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "class OnlineCourse extends Course { ... }", code: codeBlock("class Course { String name = \"Java\"; }", "class OnlineCourse extends Course {", "    String label() { return \"Course: \" + name; }", "}", "System.out.println(new OnlineCourse().label());"), output: "Course: Java" },
          python: { syntax: "class OnlineCourse(Course):", code: codeBlock("class Course:", "    name = \"Python\"", "class OnlineCourse(Course):", "    def label(self):", "        return f\"Course: {self.name}\"", "print(OnlineCourse().label())"), output: "Course: Python" },
          javascript: { syntax: "class OnlineCourse extends Course { ... }", code: codeBlock("class Course { constructor() { this.name = \"JavaScript\"; } }", "class OnlineCourse extends Course {", "    label() { return `Course: ${this.name}`; }", "}", "console.log(new OnlineCourse().label());"), output: "Course: JavaScript" },
          "c-plus-plus": { syntax: "class OnlineCourse : public Course { ... };", code: codeBlock("class Course { public: string name = \"C++\"; };", "class OnlineCourse : public Course {", "public:", "    string label() { return \"Course: \" + name; }", "};", "cout << OnlineCourse().label();"), output: "Course: C++" }
        }
      },
      "exception-handling": {
        definition: "Exception handling catches runtime failures so the program can recover or show a clear message.",
        explanation: "Use exceptions around risky operations such as parsing, division, file access, API calls, and database work.",
        realWorldExample: "A login API catches invalid credentials and returns a clear error instead of crashing the server.",
        advantages: ["Protects the program from abrupt crashes", "Separates normal logic from error handling", "Improves user-facing messages"],
        disadvantages: ["Catching too broadly hides real bugs", "Ignoring exceptions makes failures silent", "Different languages have different exception models"],
        commonMistakes: ["Catching every error without logging", "Leaving risky code outside try blocks", "Using exceptions for normal control flow"],
        interviewQuestions: commonInterview,
        examples: {
          java: { syntax: "try { ... } catch (ArithmeticException ex) { ... }", code: codeBlock("try {", "    int result = 10 / 0;", "    System.out.println(result);", "} catch (ArithmeticException ex) {", "    System.out.println(\"Cannot divide by zero\");", "}"), output: "Cannot divide by zero" },
          python: { syntax: "try:\n    ...\nexcept ZeroDivisionError:", code: codeBlock("try:", "    result = 10 / 0", "    print(result)", "except ZeroDivisionError:", "    print(\"Cannot divide by zero\")"), output: "Cannot divide by zero" },
          javascript: { syntax: "try { ... } catch (error) { ... }", code: codeBlock("try {", "    throw new Error(\"Cannot divide by zero\");", "} catch (error) {", "    console.log(error.message);", "}"), output: "Cannot divide by zero" },
          "c-plus-plus": { syntax: "try { ... } catch (const exception& error) { ... }", code: codeBlock("try {", "    throw runtime_error(\"Cannot divide by zero\");", "} catch (const exception& error) {", "    cout << error.what();", "}"), output: "Cannot divide by zero" }
        }
      },
      "java-introduction": {
        definition: "Java is a class-based, object-oriented programming language that runs on the Java Virtual Machine.",
        explanation: "Learn Java first by understanding that source code is written in .java files, compiled into bytecode, and then run by the JVM. This makes Java common in college programming, backend systems, Android foundations, and enterprise applications.",
        realWorldExample: "A Code-Friendly backend can use Java classes for users, skills, progress, quizzes, and badges, then run the same compiled application on different operating systems.",
        advantages: ["Works across many platforms through the JVM", "Strong typing catches many mistakes early", "Large ecosystem for backend, desktop, Android, and tools"],
        disadvantages: ["Requires more structure than scripting languages", "Compilation is a separate step", "Beginners must learn classes before writing larger programs"],
        commonMistakes: ["Writing code outside a class", "Forgetting that Java is case-sensitive", "Confusing source code with compiled bytecode"],
        interviewQuestions: ["What is the JVM?", "Why is Java called platform independent?", "What happens between writing a .java file and running the program?"],
        examples: {
          java: { syntax: "class Main { public static void main(String[] args) { ... } }", code: codeBlock("class Main {", "    public static void main(String[] args) {", "        System.out.println(\"Welcome to Java\");", "    }", "}"), output: "Welcome to Java" }
        }
      },
      "java-setup": {
        definition: "JDK setup means installing the Java Development Kit so the computer can compile and run Java programs.",
        explanation: "The JDK provides javac for compiling code and java for running compiled classes. A beginner should know the simple cycle: save Main.java, compile it, fix errors, then run Main.",
        realWorldExample: "Before a student submits a Java assignment, the JDK checks syntax and creates the class file that the JVM can execute.",
        advantages: ["Gives access to compiler and runtime tools", "Matches how Java is used in college labs", "Helps students understand compile-time feedback"],
        disadvantages: ["Wrong path setup can stop commands from working", "File name and public class name must match", "Different machines may have different JDK versions"],
        commonMistakes: ["Saving the file with the wrong name", "Running java before compiling with javac", "Installing only the runtime instead of the full JDK"],
        interviewQuestions: ["What is the difference between JDK, JRE, and JVM?", "Why do we compile Java before running it?", "Why should the file name match the public class name?"],
        examples: {
          java: { syntax: "javac Main.java\njava Main", code: codeBlock("// Save this file as Main.java", "class Main {", "    public static void main(String[] args) {", "        System.out.println(\"JDK is ready\");", "    }", "}"), output: "JDK is ready" }
        }
      },
      "java-program-structure": {
        definition: "A Java program is organized with classes, a main method, statements, blocks, and semicolons.",
        explanation: "The main method is the starting point for a basic Java program. Braces group code into blocks, semicolons finish statements, and indentation makes the structure readable.",
        realWorldExample: "Every Java console exercise starts from a main method, while larger projects split work into many classes and methods.",
        advantages: ["Makes the entry point clear", "Keeps code organized inside classes and methods", "Teaches disciplined syntax from the beginning"],
        disadvantages: ["The main method line looks long to beginners", "Missing braces can create confusing errors", "Semicolons are easy to forget"],
        commonMistakes: ["Writing Main instead of main", "Forgetting String[] args", "Putting print statements outside the method body"],
        interviewQuestions: ["What is the purpose of the main method?", "Why does Java code live inside classes?", "What is a block in Java?"],
        examples: {
          java: { syntax: "public static void main(String[] args)", code: codeBlock("class Main {", "    public static void main(String[] args) {", "        System.out.println(\"Program started\");", "        System.out.println(\"Ready to learn\");", "    }", "}"), output: "Program started\nReady to learn" }
        }
      },
      "java-input-output": {
        definition: "Input and output let a Java program read values from the user and print results to the console.",
        explanation: "Use Scanner for beginner console input and System.out.println for output. Read values in the same order as the sample input, store them in variables, then print the required format.",
        realWorldExample: "A practice program can read a learner name and score, then print a formatted result like 'Asha scored 95'.",
        advantages: ["Makes programs interactive", "Supports practice problems with sample input and output", "Builds confidence in reading typed data"],
        disadvantages: ["Scanner methods must match the input type", "Mixing nextLine with other reads needs care", "Output must match exactly in coding platforms"],
        commonMistakes: ["Reading input in the wrong order", "Using nextInt for text input", "Printing extra spaces or missing labels"],
        interviewQuestions: ["How does Scanner read input in Java?", "What is the difference between print and println?", "Why should output match the expected format exactly?"],
        examples: {
          java: { syntax: "Scanner input = new Scanner(System.in);\nString name = input.next();", code: codeBlock("import java.util.Scanner;", "", "class Main {", "    public static void main(String[] args) {", "        Scanner input = new Scanner(System.in);", "        String name = input.next();", "        int score = input.nextInt();", "        System.out.println(name + \" scored \" + score);", "    }", "}"), output: "Asha scored 95" }
        }
      },
      "java-type-casting": {
        definition: "Type casting converts a value from one data type to another, either automatically or manually.",
        explanation: "Java widens smaller compatible types automatically, such as int to double. Narrowing conversions, such as double to int, require an explicit cast because information can be lost.",
        realWorldExample: "A marks program can convert integer totals into double values before calculating an average with decimal precision.",
        advantages: ["Allows compatible values to work together", "Controls decimal and integer behavior", "Makes conversions visible in code"],
        disadvantages: ["Narrowing can lose decimal data", "Invalid casts can fail at runtime with objects", "Hidden integer division can produce wrong averages"],
        commonMistakes: ["Casting after integer division has already happened", "Assuming every text value can become a number", "Ignoring precision loss"],
        interviewQuestions: ["What is widening casting?", "When is explicit casting required?", "Why can narrowing conversions lose data?"],
        examples: {
          java: { syntax: "double average = (double) total / count;", code: codeBlock("int total = 95;", "int count = 2;", "double average = (double) total / count;", "System.out.println(\"Average: \" + average);"), output: "Average: 47.5" }
        }
      },
      "java-arrays-2d": {
        definition: "A 2D array stores values in rows and columns, like a table or matrix.",
        explanation: "Use two indexes: the first for the row and the second for the column. Nested loops are common because one loop moves through rows and another moves through columns.",
        realWorldExample: "A marks table can store scores for multiple students across multiple subjects.",
        advantages: ["Models tables and grids naturally", "Works well with nested loops", "Keeps matrix-like data together"],
        disadvantages: ["Two indexes can be confused", "Rows may have different lengths in Java", "Nested loops need careful bounds"],
        commonMistakes: ["Using row length for every column loop", "Starting from index 1 instead of 0", "Mixing row and column positions"],
        interviewQuestions: ["How do you access an element in a 2D array?", "Why do nested loops fit 2D arrays?", "What is the difference between rows and columns?"],
        examples: {
          java: { syntax: "int[][] matrix = {{1, 2}, {3, 4}};", code: codeBlock("int[][] matrix = {{1, 2}, {3, 4}};", "int total = 0;", "for (int row = 0; row < matrix.length; row++) {", "    for (int col = 0; col < matrix[row].length; col++) {", "        total += matrix[row][col];", "    }", "}", "System.out.println(\"Matrix total: \" + total);"), output: "Matrix total: 10" }
        }
      },
      "java-constructors": {
        definition: "A constructor is a special class block that runs when an object is created.",
        explanation: "Use constructors to require important starting values and keep objects valid from the beginning. A constructor has the same name as the class and no return type.",
        realWorldExample: "A Course object can require a course name when it is created so every course card has a label.",
        advantages: ["Initializes objects clearly", "Prevents missing required data", "Keeps setup logic in one place"],
        disadvantages: ["Too many constructor parameters become hard to read", "Forgetting this can assign the wrong variable", "Constructor overloads can become confusing"],
        commonMistakes: ["Adding a return type to a constructor", "Not matching the class name exactly", "Forgetting to initialize required fields"],
        interviewQuestions: ["How is a constructor different from a method?", "When does a constructor run?", "What is constructor overloading?"],
        examples: {
          java: { syntax: "Course(String name) { this.name = name; }", code: codeBlock("class Course {", "    String name;", "    Course(String name) {", "        this.name = name;", "    }", "}", "", "Course course = new Course(\"Java\");", "System.out.println(\"Course: \" + course.name);"), output: "Course: Java" }
        }
      },
      "java-encapsulation": {
        definition: "Encapsulation means keeping related data and behavior together inside one class.",
        explanation: "For beginners, first understand that a class can hold fields, a constructor can fill those fields, and an object can use the stored values.",
        realWorldExample: "A Student object can keep an id and name together, then the program can print both values from the same object.",
        advantages: ["Keeps related values in one object", "Makes object creation easy to understand", "Prepares students for private fields later"],
        disadvantages: ["Direct fields are simple but less protected", "Large classes can become messy", "Real projects usually add access control later"],
        commonMistakes: ["Forgetting to use new when creating an object", "Not assigning constructor values with this", "Confusing class name and object name"],
        interviewQuestions: ["What is stored inside a Java object?", "Why do we use a constructor?", "What does this.id mean in a class?"],
        examples: {
          java: { syntax: "class Student {\n    int id;\n    String name;\n}", code: codeBlock("class Student {", "    int id;", "    String name;", "", "    Student(int id, String name) {", "        this.id = id;", "        this.name = name;", "    }", "}", "", "public class Main {", "    public static void main(String[] args) {", "        Student s1 = new Student(10, \"Alice\");", "        System.out.println(s1.id);", "        System.out.println(s1.name);", "    }", "}"), output: "10\nAlice" }
        }
      },
      "java-polymorphism": {
        definition: "Polymorphism lets one reference type call behavior that changes based on the actual object.",
        explanation: "Use a parent class or interface reference when different child classes should be treated through the same contract. Java chooses the overridden method at runtime.",
        realWorldExample: "A Course reference can point to VideoCourse or TextCourse, and each can describe itself differently.",
        advantages: ["Supports flexible designs", "Reduces condition-heavy code", "Works naturally with inheritance and interfaces"],
        disadvantages: ["Runtime behavior can be hard to trace at first", "Bad parent contracts cause weak designs", "Overriding mistakes can hide expected behavior"],
        commonMistakes: ["Confusing overloading with overriding", "Forgetting the @Override annotation", "Expecting fields to behave polymorphically like methods"],
        interviewQuestions: ["What is method overriding?", "How is polymorphism useful in Java?", "What is the difference between overloading and overriding?"],
        examples: {
          java: { syntax: "Course course = new OnlineCourse();\ncourse.type();", code: codeBlock("class Course {", "    String type() { return \"Course\"; }", "}", "class OnlineCourse extends Course {", "    @Override", "    String type() { return \"Online course\"; }", "}", "", "Course course = new OnlineCourse();", "System.out.println(course.type());"), output: "Online course" }
        }
      },
      "java-abstraction": {
        definition: "Abstraction shows what an object can do while hiding how the work is completed.",
        explanation: "Use abstract classes when common structure exists but some behavior must be supplied by child classes. Abstract methods define required behavior without a body.",
        realWorldExample: "A BadgeRule can define an award method while each specific badge decides its own condition.",
        advantages: ["Focuses on essential behavior", "Creates reusable base designs", "Reduces details seen by calling code"],
        disadvantages: ["Too much abstraction hides simple logic", "Abstract classes still create inheritance coupling", "Beginners may struggle to know what belongs in the base"],
        commonMistakes: ["Trying to instantiate an abstract class", "Forgetting to implement abstract methods", "Using abstraction before the repeated pattern is clear"],
        interviewQuestions: ["What is an abstract class?", "Why can an abstract method have no body?", "How does abstraction differ from encapsulation?"],
        examples: {
          java: { syntax: "abstract class BadgeRule { abstract String award(); }", code: codeBlock("abstract class BadgeRule {", "    abstract String award();", "}", "class QuizBadge extends BadgeRule {", "    String award() { return \"Badge awarded\"; }", "}", "", "BadgeRule rule = new QuizBadge();", "System.out.println(rule.award());"), output: "Badge awarded" }
        }
      },
      "java-interfaces": {
        definition: "An interface defines a contract of methods that implementing classes promise to provide.",
        explanation: "Use interfaces when different classes need to share behavior without forcing one common parent class. Interfaces are central to Java collections, services, and clean backend design.",
        realWorldExample: "A Trackable interface can be implemented by QuizProgress and TopicProgress so both can save progress.",
        advantages: ["Supports loose coupling", "Allows multiple behavior contracts", "Makes code easier to test and replace"],
        disadvantages: ["Too many tiny interfaces can clutter design", "Default methods should be used carefully", "Method contracts must be clear"],
        commonMistakes: ["Putting object state directly in an interface", "Creating interfaces for only one class without a reason", "Forgetting to implement every required method"],
        interviewQuestions: ["Why use an interface in Java?", "Can a class implement multiple interfaces?", "How is an interface different from an abstract class?"],
        examples: {
          java: { syntax: "interface Trackable { void save(); }", code: codeBlock("interface Trackable {", "    void save();", "}", "class TopicProgress implements Trackable {", "    public void save() {", "        System.out.println(\"Progress saved\");", "    }", "}", "", "Trackable progress = new TopicProgress();", "progress.save();"), output: "Progress saved" }
        }
      },
      "java-packages": {
        definition: "Packages organize Java classes into named groups that match folders in a project.",
        explanation: "Use packages to avoid name conflicts and keep code by feature or layer. The package statement appears at the top of the file, and import statements bring other classes into scope.",
        realWorldExample: "A backend can keep controllers, services, repositories, and models in separate packages so the project stays readable.",
        advantages: ["Organizes large projects", "Prevents class name conflicts", "Makes imports and ownership clearer"],
        disadvantages: ["Wrong folder/package mismatch causes confusion", "Too many packages can fragment small projects", "Imports must be maintained as classes move"],
        commonMistakes: ["Writing the package statement below imports", "Using folder names that do not match package names", "Importing classes that are not needed"],
        interviewQuestions: ["Why do Java projects use packages?", "Where does the package statement go?", "What is the purpose of import?"],
        examples: {
          java: { syntax: "package com.codefriendly.learning;\nimport java.util.List;", code: codeBlock("package com.codefriendly.learning;", "", "class TopicHelper {", "    String status() {", "        return \"Utility ready\";", "    }", "}"), output: "Utility ready" }
        }
      },
      "java-file-handling": {
        definition: "File handling lets Java programs read from and write to files on the computer.",
        explanation: "Use java.nio.file classes such as Path and Files for simple modern file work. File operations can fail, so real programs handle exceptions clearly.",
        realWorldExample: "A learning app can export progress notes or read saved practice data from a file.",
        advantages: ["Persists data after the program ends", "Supports reports and logs", "Uses standard library tools"],
        disadvantages: ["File paths differ by operating system", "Reading or writing can fail because of permissions", "Large files need careful memory handling"],
        commonMistakes: ["Ignoring IOException", "Using the wrong file path", "Reading a whole large file when streaming is safer"],
        interviewQuestions: ["Why can file operations throw exceptions?", "What is Path used for?", "When should a program close file resources?"],
        examples: {
          java: { syntax: "Files.writeString(Path.of(\"notes.txt\"), text);", code: codeBlock("import java.nio.file.Files;", "import java.nio.file.Path;", "", "Path file = Path.of(\"notes.txt\");", "Files.writeString(file, \"Saved notes\");", "System.out.println(Files.readString(file));"), output: "Saved notes" }
        }
      },
      "java-generics": {
        definition: "Generics let Java code work with a specific type while staying reusable and type-safe.",
        explanation: "Use generics with collections and helper classes so Java can catch type mistakes at compile time. For example, List<String> should contain only strings.",
        realWorldExample: "A List<String> can store skill names, while a List<Integer> can store quiz scores without mixing the two.",
        advantages: ["Catches type mistakes early", "Removes many manual casts", "Creates reusable classes and methods"],
        disadvantages: ["Generic syntax can look complex", "Type erasure limits some runtime checks", "Wildcards take practice"],
        commonMistakes: ["Using raw List instead of List<String>", "Mixing unrelated types in one collection", "Assuming generic type information is fully available at runtime"],
        interviewQuestions: ["Why are generics useful in Java?", "What is a raw type?", "How do generics improve collection safety?"],
        examples: {
          java: { syntax: "List<String> skills = new ArrayList<>();", code: codeBlock("import java.util.ArrayList;", "import java.util.List;", "", "List<String> skills = new ArrayList<>();", "skills.add(\"Java\");", "System.out.println(skills.get(0));"), output: "Java" }
        }
      },
      "java-lambda-streams": {
        definition: "Lambda expressions and streams let Java process collections with concise functional-style operations.",
        explanation: "Use lambdas for short behavior blocks and streams for filtering, mapping, sorting, and collecting data. They are useful after students understand loops and collections.",
        realWorldExample: "A skill list can be filtered to show only Java-related topics and then joined into one display string.",
        advantages: ["Makes collection processing concise", "Works well with filter/map/reduce operations", "Reduces temporary variables for simple pipelines"],
        disadvantages: ["Long stream chains can become hard to debug", "Beginners may use streams before understanding loops", "Side effects inside streams reduce clarity"],
        commonMistakes: ["Changing external state inside a stream", "Using streams for very simple code where a loop is clearer", "Forgetting to collect or consume the stream"],
        interviewQuestions: ["What is a lambda expression?", "What does stream filter do?", "When would a loop be clearer than a stream?"],
        examples: {
          java: { syntax: "skills.stream().filter(skill -> skill.startsWith(\"J\"))", code: codeBlock("import java.util.List;", "import java.util.stream.Collectors;", "", "List<String> skills = List.of(\"Java\", \"SQL\", \"Spring\");", "String result = skills.stream()", "    .filter(skill -> skill.contains(\"Java\") || skill.contains(\"Spring\"))", "    .collect(Collectors.joining(\", \"));", "System.out.println(result);"), output: "Java, Spring" }
        }
      }
    };
  }

  function practiceChallengeFor(foundSkill, foundConcept, impl) {
    const challenges = {
      "variables": ["Read a learner name and score, then print a score sentence.", "Asha 95", "Asha scored 95", "Use a variable for the name and another for the score."],
      "data-types": ["Store a name, attempt count, CGPA, and active status, then print them.", "Asha 3 9.4 true", "Asha 3 9.4 true", "Use suitable data types instead of storing everything as text."],
      "operators": ["Read theory and lab marks, add them, and print the total.", "45 50", "Total: 95", "Use an arithmetic operator for the sum."],
      "conditionals": ["Read one score and print Pass when it is 40 or above.", "72", "Pass", "Use an if/else condition and test the boundary value."],
      "strings": ["Read a skill name and print it in a learning message.", "Java", "Learning JAVA", "Apply a string operation such as uppercase formatting."],
      "arrays": ["Read three marks, keep them in an array/list, and print the total.", "80 90 85", "Total marks: 255", "Loop through the values or use a built-in sum helper."],
      "loops": ["Read a limit and print numbers from 1 to that limit.", "5", "1 2 3 4 5", "Keep the loop start and end values clear."],
      "functions": ["Create a reusable add function and print the result for two numbers.", "4 5", "Sum: 9", "Return the value from the function before printing."],
      "collections": ["Store three skills in a collection and print how many were added.", "Java SQL AWS", "Skills added: 3", "Choose a list/vector/array when order matters."],
      "recursion": ["Create a recursive factorial function and print factorial of 5.", "5", "Factorial: 120", "Write a base case before the recursive call."],
      "oop": ["Create a student object and print its name.", "Asha", "Student Asha", "Keep state and behavior inside the object."],
      "classes": ["Create a course class and print its label.", "Java", "Course: Java", "Use a constructor to set the course name."],
      "inheritance": ["Create a specialized course type and print the inherited course name.", "Java", "Course: Java", "Use inheritance only when the child is truly a type of the parent."],
      "exception-handling": ["Handle division by zero and print a clear error message.", "10 0", "Cannot divide by zero", "Catch the specific error instead of hiding all failures."],
      "java-introduction": ["Write your first Java program and print a welcome message.", "no input", "Welcome to Java", "Keep the code inside class Main and the main method."],
      "java-setup": ["Create a Main.java style program that proves the JDK is ready.", "no input", "JDK is ready", "Use the same class name that would match the file name."],
      "java-program-structure": ["Write a complete Java program that prints the start message.", "no input", "Program started", "Check braces, semicolons, and the main method spelling."],
      "java-input-output": ["Read a name and score, then print the formatted result.", "Asha 95", "Asha scored 95", "Read the name before the integer score."],
      "java-type-casting": ["Convert integer total and count into a decimal average.", "95 2", "Average: 47.5", "Cast before division so Java does not do integer division."],
      "java-arrays-2d": ["Store a 2x2 matrix and print the total of all values.", "1 2 3 4", "Matrix total: 10", "Use nested loops: one for rows and one for columns."],
      "java-constructors": ["Create a Course object with a constructor and print its label.", "Java", "Course: Java", "The constructor name must exactly match the class name."],
      "java-encapsulation": ["Create a Student class with id and name, then print both values.", "10 Alice", "10\nAlice", "Use direct fields in this beginner version, like the sample code."],
      "java-polymorphism": ["Use a parent Course reference for an OnlineCourse object and print its type.", "Online", "Online course", "Override the parent method in the child class."],
      "java-abstraction": ["Create an abstract badge rule and print the awarded message from a child class.", "quiz", "Badge awarded", "Implement every abstract method in the concrete class."],
      "java-interfaces": ["Create a Trackable interface and a class that prints progress saved.", "topic", "Progress saved", "Use implements and make the method public."],
      "java-packages": ["Show a small package-organized helper that returns a utility message.", "helper", "Utility ready", "Keep the package line at the top when using packages."],
      "java-file-handling": ["Write a short note to a file and print the saved text.", "Saved notes", "Saved notes", "Handle file operations clearly because they can fail."],
      "java-generics": ["Store Java in a type-safe list and print the first skill.", "Java", "Java", "Use List<String> instead of a raw List."],
      "java-lambda-streams": ["Filter Java and Spring from a skill list and print them together.", "Java SQL Spring", "Java, Spring", "Use stream filter and join the result text."]
    };
    const [prompt, sampleInput, sampleOutput, hint] = challenges[foundConcept.slug] || [
      `Create a focused ${foundConcept.name.toLowerCase()} example in ${foundSkill.name}.`,
      "topic example",
      impl.output,
      "Use the topic rule shown on the lesson page."
    ];
    return {
      difficulty: ["arrays", "loops", "functions", "collections", "recursion", "oop", "classes", "inheritance", "exception-handling", "java-arrays-2d", "java-constructors", "java-encapsulation", "java-polymorphism", "java-abstraction", "java-interfaces", "java-packages", "java-file-handling", "java-generics", "java-lambda-streams"].includes(foundConcept.slug) ? "Medium" : "Easy",
      prompt: `${prompt} Use ${foundSkill.name} syntax.`,
      sampleInput,
      sampleOutput,
      expectedOutput: `${foundSkill.name} solution that prints exactly: ${sampleOutput}`,
      hints: [hint, "Match the sample output exactly.", `Check one ${foundSkill.name} syntax mistake before submitting.`]
    };
  }

  function codeBlock(...lines) {
    return lines.join("\n");
  }

  function findSkill(identifier) {
    const value = String(identifier || "");
    const found = skills.find((item) => item.id === value || item.slug === value || item.name === value);
    if (found) return found;

    const cached = cachedLiveSkills().find((item) => item.id === value || item.slug === value || item.name === value);
    if (cached?.slug) {
      const bySlug = skills.find((item) => item.slug === cached.slug);
      if (bySlug) return bySlug;
    }

    const selected = user()?.selectedSkillIds || [];
    const selectedMatch = selected
      .map((item) => skills.find((skill) => skill.id === item || skill.slug === item))
      .find(Boolean);
    if (selectedMatch) return selectedMatch;

    if (/^[a-f0-9]{16,}$/i.test(value)) return skills[0];
    throw new Error(`Skill not found: ${identifier}`);
  }

  function cachedLiveSkills() {
    try {
      return JSON.parse(localStorage.getItem(liveSkillsKey) || "[]");
    } catch {
      return [];
    }
  }

  function findConcept(identifier) {
    const found = concepts.find((item) => item.id === identifier || item.slug === identifier);
    if (!found) throw new Error(`Concept not found: ${identifier}`);
    return found;
  }

  function demoUsers() {
    return JSON.parse(localStorage.getItem(demoUsersKey) || "[]");
  }

  function saveDemoUsers(users) {
    localStorage.setItem(demoUsersKey, JSON.stringify(users));
  }

  function demoProgress() {
    return JSON.parse(localStorage.getItem(demoProgressKey) || "{}");
  }

  function saveDemoProgress(progress) {
    localStorage.setItem(demoProgressKey, JSON.stringify(progress));
  }

  function progressFor(skillId) {
    const current = requireDemoUser();
    const progress = demoProgress();
    progress[current.id] ||= {};
    progress[current.id][skillId] ||= emptyProgress();
    saveDemoProgress(progress);
    return progress[current.id][skillId];
  }

  function setProgress(skillId, updater) {
    const current = requireDemoUser();
    const all = demoProgress();
    all[current.id] ||= {};
    all[current.id][skillId] = updater(all[current.id][skillId] || emptyProgress());
    return { all, current: all[current.id][skillId] };
  }

  function emptyProgress() {
    return { completedConceptIds: [], completedModuleIds: [], quizScores: {}, badges: [], streakDays: 0 };
  }

  function allConceptIds(skillId) {
    return modules.filter((item) => item.skillId === skillId).flatMap((item) => item.conceptIds);
  }

  function completedModuleIds(skillId, completedConceptIds) {
    return modules
      .filter((item) => item.skillId === skillId)
      .filter((item) => item.conceptIds.every((conceptId) => completedConceptIds.includes(conceptId)))
      .map((item) => item.id);
  }

  function nextTopicName(skillId, completedConceptIds) {
    const next = allConceptIds(skillId).find((conceptId) => !completedConceptIds.includes(conceptId));
    return next ? findConcept(next).name : "Skill completed";
  }

  function badgeView(name) {
    const icons = {
      "Topic Completed": "check-circle",
      "Module Completed": "layers",
      "Skill Completed": "award",
      "7 Day Streak": "fire",
      "Quiz Master": "trophy",
      "Array Expert": "grid",
      "Loop Master": "repeat"
    };
    return {
      id: name.toLowerCase().replaceAll(" ", "-"),
      name,
      description: `${name} badge earned through learning progress.`,
      icon: icons[name] || "award",
      type: "Progress",
      awardedAt: new Date().toISOString()
    };
  }

  function publicUser(fullUser) {
    const { password, ...safeUser } = fullUser;
    return safeUser;
  }

  function skill(id, name, description, difficulty, color) {
    return { id, slug: id, name, description, difficulty, imageUrl: "", color };
  }

  function concept(id, name, category, description) {
    return { id, slug: id, name, category, description };
  }

  function module(skillId, name, description, orderIndex, conceptIds) {
    return { id: `${skillId}-${orderIndex}`, skillId, name, description, orderIndex, conceptIds };
  }

  function conceptDifficulty(conceptId) {
    if (["recursion", "pointers", "java-polymorphism", "java-abstraction", "java-generics", "java-lambda-streams", "normalization", "hooks", "coding-patterns"].includes(conceptId)) return "Hard";
    if (["arrays", "loops", "functions", "collections", "oop", "classes", "inheritance", "exception-handling", "java-arrays-2d", "java-constructors", "java-encapsulation", "java-interfaces", "joins", "rest-api", "deployment"].includes(conceptId)) return "Medium";
    return "Easy";
  }

  function estimatedMinutes(conceptId) {
    const difficulty = conceptDifficulty(conceptId);
    if (difficulty === "Hard") return 60;
    if (difficulty === "Medium") return 45;
    return 30;
  }

  function practiceCatalog(skillIdentifier = user()?.selectedSkillIds?.[0] || "java") {
    const foundSkill = findSkill(skillIdentifier);
    const conceptIds = allConceptIds(foundSkill.id);
    return conceptIds.map((conceptId, index) => {
      const foundConcept = findConcept(conceptId);
      const impl = implementationFor(foundSkill, foundConcept);
      const challenge = practiceChallengeFor(foundSkill, foundConcept, impl);
      const difficulty = index % 3 === 2 ? "Hard" : challenge.difficulty;
      return {
        id: `${foundSkill.id}-${foundConcept.id}-${index}`,
        skillId: foundSkill.id,
        skillName: foundSkill.name,
        conceptId: foundConcept.id,
        conceptName: foundConcept.name,
        title: `${foundConcept.name} Practice`,
        question: challenge.prompt,
        difficulty,
        expectedTime: `${difficulty === "Hard" ? 50 : difficulty === "Medium" ? 35 : 20} Minutes`,
        topic: foundConcept.name,
        hints: challenge.hints,
        solution: impl.codeExample,
        expectedOutput: challenge.sampleOutput || impl.output
      };
    });
  }

  function searchCatalog() {
    const skillItems = skills.map((item) => ({
      type: "Skill",
      title: item.name,
      subtitle: item.description,
      url: `roadmap.html?skill=${encodeURIComponent(item.slug)}`
    }));
    const moduleItems = modules.map((item) => ({
      type: "Module",
      title: item.name,
      subtitle: item.description,
      url: `roadmap.html?skill=${encodeURIComponent(item.skillId)}`
    }));
    const topicItems = modules.flatMap((item) => item.conceptIds.map((conceptId) => {
      const foundConcept = findConcept(conceptId);
      return {
        type: "Topic",
        title: foundConcept.name,
        subtitle: `${skillIdLabel(item.skillId)} - ${foundConcept.category}`,
        url: `topic.html?skill=${encodeURIComponent(item.skillId)}&concept=${encodeURIComponent(foundConcept.slug)}`
      };
    }));
    const practiceItems = topicItems.slice(0, 40).map((item) => ({
      ...item,
      type: "Practice",
      title: `${item.title} Practice`,
      url: item.url.replace("topic.html", "practice.html")
    }));
    const interviewItems = concepts.slice(0, 40).map((item) => ({
      type: "Interview",
      title: `${item.name} Interview Questions`,
      subtitle: item.description,
      url: `topic.html?skill=java&concept=${encodeURIComponent(item.slug)}#interview`
    }));
    const utilityItems = [
      {
        type: "Tool",
        title: "Resume Builder",
        subtitle: "Create a fresher resume with skills, projects, education, and achievements.",
        url: "resume-builder.html"
      },
      {
        type: "Dashboard",
        title: "Personal Learning Dashboard",
        subtitle: "Track selected skills, progress, badges, and next topics.",
        url: "dashboard.html"
      }
    ];
    return [...utilityItems, ...skillItems, ...moduleItems, ...topicItems, ...practiceItems, ...interviewItems];
  }

  function skillIdLabel(skillId) {
    const found = skills.find((item) => item.id === skillId || item.slug === skillId);
    return found?.name || skillId;
  }

  return {
    state,
    request,
    setAuth,
    logout,
    token,
    user,
    enrichedUser,
    onboarding,
    saveOnboarding,
    nextOnboardingUrl,
    ensureOnboarding,
    yearPlan,
    allYearPlans,
    allGoals,
    practiceCatalog,
    searchCatalog,
    conceptDifficulty,
    estimatedMinutes,
    requireAuth,
    queryParam,
    escapeHtml,
    toast,
    setApiBase
  };
})();
