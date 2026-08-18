document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderNav();
  const page = document.body.dataset.page;
  const initializers = {
    home: initHome,
    login: initLogin,
    register: initRegister,
    profileSetup: initProfileSetup,
    chooseYear: initChooseYear,
    chooseGoal: initChooseGoal,
    dashboard: initDashboard,
    skills: initSkills,
    roadmap: initRoadmap,
    topic: initTopic,
    practice: initPractice,
    quiz: initQuiz,
    compare: initCompare,
    resumeBuilder: initResumeBuilder,
    profile: initProfile
  };
  if (initializers[page]) {
    initializers[page]();
  }
});

function renderNav() {
  const target = document.getElementById("site-nav");
  if (!target) return;
  const loggedIn = Boolean(CF.token());
  const page = document.body.dataset.page || "home";
  target.innerHTML = `
    <nav class="navbar navbar-expand-lg sticky-top">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2 ${page === "home" ? "active" : ""}" href="index.html">
          <span class="brand-mark"><i class="bi bi-code-slash"></i></span>
          <span>Code-Friendly</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <div class="nav-search ms-lg-3 my-3 my-lg-0">
            <form id="globalSearchForm" autocomplete="off">
              <i class="bi bi-search"></i>
              <input id="globalSearchInput" type="search" placeholder="Search skills, topics, practice..." aria-label="Search Code-Friendly">
            </form>
            <div class="search-results" id="globalSearchResults"></div>
          </div>
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li class="nav-item"><a class="nav-link ${page === "about" ? "active" : ""}" href="about.html">About</a></li>
            <li class="nav-item"><a class="nav-link ${page === "skills" ? "active" : ""}" href="skills.html">Skills</a></li>
            <li class="nav-item"><a class="nav-link ${page === "practice" ? "active" : ""}" href="practice.html">Practice</a></li>
            <li class="nav-item"><a class="nav-link ${page === "compare" ? "active" : ""}" href="compare.html">Compare</a></li>
            <li class="nav-item"><a class="nav-link ${page === "resumeBuilder" ? "active" : ""}" href="resume-builder.html">Resume</a></li>
            <li class="nav-item"><button class="btn btn-sm btn-outline-primary btn-icon theme-toggle" id="themeToggle" type="button" aria-label="Toggle dark mode"><i class="bi bi-moon-stars"></i><span>Dark</span></button></li>
            ${loggedIn ? `
              <li class="nav-item"><a class="nav-link ${page === "dashboard" ? "active" : ""}" href="dashboard.html">Dashboard</a></li>
              <li class="nav-item"><a class="nav-link ${page === "profile" ? "active" : ""}" href="profile.html">Profile</a></li>
              <li class="nav-item"><button class="btn btn-sm btn-outline-primary btn-icon" id="logoutBtn"><i class="bi bi-box-arrow-right"></i><span>Logout</span></button></li>
            ` : `
              <li class="nav-item"><a class="nav-link ${page === "login" ? "active" : ""}" href="login.html">Login</a></li>
              <li class="nav-item"><a class="btn btn-sm btn-primary btn-icon" href="register.html"><i class="bi bi-person-plus"></i><span>Register</span></a></li>
            `}
          </ul>
        </div>
      </div>
    </nav>
  `;
  document.getElementById("logoutBtn")?.addEventListener("click", CF.logout);
  bindThemeToggle();
  bindGlobalSearch();
}

function initTheme() {
  const saved = localStorage.getItem("cf_theme") || "light";
  applyTheme(saved);
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("cf_theme", nextTheme);
  const button = document.getElementById("themeToggle");
  if (button) {
    const dark = nextTheme === "dark";
    button.innerHTML = `<i class="bi ${dark ? "bi-sun" : "bi-moon-stars"}"></i><span>${dark ? "Light" : "Dark"}</span>`;
    button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
}

function bindThemeToggle() {
  const button = document.getElementById("themeToggle");
  if (!button) return;
  applyTheme(document.documentElement.dataset.theme || localStorage.getItem("cf_theme") || "light");
  button.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
}

function bindGlobalSearch() {
  const form = document.getElementById("globalSearchForm");
  const input = document.getElementById("globalSearchInput");
  const results = document.getElementById("globalSearchResults");
  if (!form || !input || !results || !CF.searchCatalog) return;
  const catalog = CF.searchCatalog();
  const render = () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      results.innerHTML = "";
      results.classList.remove("show");
      return;
    }
    const matches = catalog
      .filter((item) => `${item.type} ${item.title} ${item.subtitle}`.toLowerCase().includes(query))
      .slice(0, 8);
    results.innerHTML = matches.length ? matches.map((item) => `
      <a href="${CF.escapeHtml(item.url)}">
        <span>${CF.escapeHtml(item.type)}</span>
        <strong>${CF.escapeHtml(item.title)}</strong>
        <small>${CF.escapeHtml(item.subtitle)}</small>
      </a>
    `).join("") : `<div class="search-empty">No matching topic found</div>`;
    results.classList.add("show");
  };
  input.addEventListener("input", render);
  input.addEventListener("focus", render);
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-search")) results.classList.remove("show");
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const first = results.querySelector("a");
    if (first) window.location.href = first.getAttribute("href");
  });
}

async function initHome() {
  const target = document.getElementById("popularSkills");
  try {
    const skills = await CF.request("/skills");
    target.innerHTML = skills.slice(0, 4).map(skillCard).join("");
  } catch (error) {
    target.innerHTML = emptyState("Start the backend to load live skill cards from MongoDB.");
  }
}

function initLogin() {
  const form = document.getElementById("loginForm");
  document.getElementById("demoLoginBtn")?.addEventListener("click", () => {
    form.email.value = "student@codefriendly.dev";
    form.password.value = "password123";
    form.requestSubmit();
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await CF.request("/auth/login", { method: "POST", body: payload });
      CF.setAuth(response);
      const next = CF.nextOnboardingUrl();
      window.location.href = next === "dashboard.html" ? CF.queryParam("next", "dashboard.html") : next;
    } catch (error) {
      CF.toast(error.message, "error");
    }
  });
}

function initRegister() {
  const form = document.getElementById("registerForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await CF.request("/auth/register", { method: "POST", body: payload });
      CF.setAuth(response);
      window.location.href = CF.nextOnboardingUrl();
    } catch (error) {
      CF.toast(error.message, "error");
    }
  });
}

function initProfileSetup() {
  if (!CF.requireAuth()) return;
  const form = document.getElementById("profileSetupForm");
  const learner = CF.enrichedUser();
  form.name.value = learner?.name || "";
  form.college.value = learner?.college || "";
  form.branch.value = learner?.branch || "";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    CF.saveOnboarding({
      profileCompleted: true,
      profile: {
        name: payload.name,
        college: payload.college,
        branch: payload.branch
      }
    });
    window.location.href = "choose-year.html";
  });
}

function initChooseYear() {
  if (!CF.requireAuth()) return;
  if (!CF.onboarding().profileCompleted) {
    window.location.href = "profile-setup.html";
    return;
  }
  const target = document.getElementById("yearChoices");
  const current = CF.onboarding().year;
  target.innerHTML = CF.allYearPlans().map((plan) => `
    <label class="choice-card ${current === plan.label ? "selected" : ""}">
      <input type="radio" name="year" value="${CF.escapeHtml(plan.label)}" ${current === plan.label ? "checked" : ""} required>
      <span class="choice-icon"><i class="bi bi-calendar3"></i></span>
      <strong>${CF.escapeHtml(plan.label)}</strong>
      <small>${CF.escapeHtml(plan.goalPrompt)}</small>
      <div class="year-skill-strip">
        ${plan.skillIds.map((skillId) => `<span>${CF.escapeHtml(skillIdLabel(skillId))}</span>`).join("")}
      </div>
    </label>
  `).join("");
  document.getElementById("yearForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = document.querySelector("input[name='year']:checked")?.value;
    if (!selected) return;
    CF.saveOnboarding({ year: selected });
    window.location.href = "choose-goal.html";
  });
  bindChoiceCards("yearChoices");
}

function initChooseGoal() {
  if (!CF.requireAuth()) return;
  const data = CF.onboarding();
  if (!data.profileCompleted) {
    window.location.href = "profile-setup.html";
    return;
  }
  if (!data.year) {
    window.location.href = "choose-year.html";
    return;
  }
  const plan = CF.yearPlan(data.year);
  document.getElementById("goalSubtitle").textContent = `${plan.label}: ${plan.goalPrompt}`;
  const target = document.getElementById("goalChoices");
  target.innerHTML = CF.allGoals().map((goal) => `
    <label class="choice-card ${data.goal === goal ? "selected" : ""}">
      <input type="radio" name="goal" value="${CF.escapeHtml(goal)}" ${data.goal === goal ? "checked" : ""} required>
      <span class="choice-icon"><i class="bi bi-bullseye"></i></span>
      <strong>${CF.escapeHtml(goal)}</strong>
      <small>${goalDescription(goal)}</small>
    </label>
  `).join("");
  document.getElementById("goalForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = document.querySelector("input[name='goal']:checked")?.value;
    if (!selected) return;
    CF.saveOnboarding({ goal: selected });
    window.location.href = "skills.html";
  });
  bindChoiceCards("goalChoices");
}

async function initDashboard() {
  if (!CF.requireAuth()) return;
  if (!CF.ensureOnboarding("dashboard.html")) return;
  const dashboard = document.getElementById("dashboardContent");
  dashboard.innerHTML = loadingState("Preparing your learning center...");
  try {
    const [me, progress] = await Promise.all([CF.request("/auth/me"), CF.request("/progress")]);
    const learner = CF.enrichedUser(me);
    if (document.getElementById("welcomeName")) document.getElementById("welcomeName").textContent = learner.name;
    if (!progress.length) {
      dashboard.innerHTML = emptyActionState("Choose a skill to begin your roadmap.", "Choose Skills", "skills.html", "bi-grid-3x3-gap");
      return;
    }
    const plan = CF.yearPlan(learner.year);
    const current = progress[0];
    const roadmap = await CF.request(`/skills/${encodeURIComponent(current.skillId)}/roadmap`);
    const today = nextRoadmapTopic(roadmap);
    const totalTopics = progress.reduce((sum, item) => sum + item.totalTopics, 0);
    const completedTopics = progress.reduce((sum, item) => sum + item.completedTopics, 0);
    const completedModules = progress.reduce((sum, item) => sum + item.completedModules, 0);
    const learningPercentage = totalTopics ? Math.round((completedTopics * 100) / totalTopics) : 0;
    const pendingTopics = Math.max(totalTopics - completedTopics, 0);
    const allBadges = progress.flatMap((item) => item.badges || []);
    const recentBadge = allBadges[allBadges.length - 1] || badgeFallback();
    dashboard.innerHTML = `
      <section class="mentor-hero mb-4">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-3">
          <div>
            <p class="text-uppercase fw-semibold text-primary mb-2">${CF.escapeHtml(todayDate())}</p>
            <h2 class="display-6 fw-bold mb-2">${greeting()}, ${CF.escapeHtml(learner.name || "Learner")}</h2>
            <p class="text-muted-soft mb-0">Current Learning Skill: <strong>${CF.escapeHtml(current.skillName)} Roadmap</strong></p>
          </div>
          <a class="btn btn-light btn-icon" href="skills.html"><i class="bi bi-sliders"></i><span>Edit Skills</span></a>
        </div>
        <div class="year-skill-strip mt-3">
          ${plan.skillIds.map((skillId) => `<span>${CF.escapeHtml(skillIdLabel(skillId))}</span>`).join("")}
        </div>
      </section>
      <div class="row g-4">
        <div class="col-lg-8">
          <section class="today-card">
            <div class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
              <div>
                <span class="section-eyebrow">Today's Topic</span>
                <h2 class="h3 mb-2">${CF.escapeHtml(today.name)}</h2>
                <p class="text-muted-soft mb-0">${CF.escapeHtml(today.description)}</p>
              </div>
              <span class="badge text-bg-primary">${CF.escapeHtml(today.statusLabel)}</span>
            </div>
            <div class="today-meta-grid">
              ${metaPill("Module", today.moduleName, "bi-layers")}
              ${metaPill("Estimated Time", `${today.time} Minutes`, "bi-clock")}
              ${metaPill("Difficulty", today.difficulty, "bi-speedometer")}
              ${metaPill("Topic Number", `${today.number}/${today.total}`, "bi-list-ol")}
            </div>
            <div class="d-flex flex-wrap gap-2 mt-4">
              <a class="btn btn-primary btn-icon" href="topic.html?skill=${encodeURIComponent(current.skillId)}&concept=${encodeURIComponent(today.slug)}"><i class="bi bi-play-fill"></i><span>Continue Learning</span></a>
              <a class="btn btn-outline-primary btn-icon" href="roadmap.html?skill=${encodeURIComponent(current.skillId)}"><i class="bi bi-map"></i><span>View Roadmap</span></a>
            </div>
          </section>
        </div>
        <div class="col-lg-4">
          <section class="surface h-100">
            <span class="section-eyebrow">Learning Streak</span>
            <div class="streak-display"><i class="bi bi-fire"></i><strong>${current.streakDays || 0}</strong><span>Day Streak</span></div>
            <div class="mini-stat-list">
              <div><span>Best Streak</span><strong>${Math.max(current.streakDays || 0, 7)} Days</strong></div>
              <div><span>Days Learned</span><strong>${Math.max(completedTopics, current.streakDays || 0)} Days</strong></div>
            </div>
          </section>
        </div>
      </div>
      <section class="surface mt-4">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
          <div>
            <span class="section-eyebrow">Learning Progress</span>
            <h2 class="h5 mb-1">Overall Progress</h2>
            <p class="text-muted-soft mb-0">${completedTopics} completed, ${pendingTopics} pending across selected skills.</p>
          </div>
          ${circleProgress(learningPercentage)}
        </div>
        <div class="dashboard-grid mb-3">
          ${metric("Completed Topics", `${completedTopics}/${totalTopics}`, "bi-check2-circle")}
          ${metric("Pending Topics", pendingTopics, "bi-hourglass-split")}
          ${metric("Completed Modules", completedModules, "bi-layers")}
          ${metric("Learning Percentage", `${learningPercentage}%`, "bi-bar-chart")}
        </div>
        <div class="progress"><div class="progress-bar" style="width:${learningPercentage}%"></div></div>
      </section>
      <div class="row g-4 mt-4">
        <div class="col-lg-4">
          <section class="surface h-100">
            <span class="section-eyebrow">Recent Badge</span>
            ${badgeSpotlight(recentBadge)}
          </section>
        </div>
        <div class="col-lg-8">
          <section class="surface h-100">
            <span class="section-eyebrow">Quick Actions</span>
            <div class="quick-action-grid mt-3">
              ${quickAction("Continue Learning", "Open today's lesson", "bi-play-circle", `topic.html?skill=${encodeURIComponent(current.skillId)}&concept=${encodeURIComponent(today.slug)}`)}
              ${quickAction("Practice Questions", "Solve topic exercises", "bi-code-square", `practice.html?skill=${encodeURIComponent(current.skillId)}&concept=${encodeURIComponent(today.slug)}`)}
              ${quickAction("Take Quiz", "Check understanding", "bi-ui-checks", `quiz.html?skill=${encodeURIComponent(current.skillId)}&concept=${encodeURIComponent(today.slug)}`)}
              ${quickAction("Compare Topics", "See language differences", "bi-columns-gap", "compare.html")}
              ${quickAction("Resume Builder", "Create resume-ready content", "bi-file-earmark-person", "resume-builder.html")}
              ${quickAction("Profile", "Badges and stats", "bi-person-circle", "profile.html")}
            </div>
          </section>
        </div>
      </div>
      <section class="surface mt-4">
        <h2 class="h5">Your Year Roadmap</h2>
        <p class="text-muted-soft">Follow these skills in order for ${CF.escapeHtml(plan.label)}.</p>
        <div class="dashboard-roadmap-list">
          ${progress.map((item, index) => progressRoadmapItem(item, index)).join("")}
        </div>
      </section>
      </div>
    `;
  } catch (error) {
    dashboard.innerHTML = emptyState(error.message);
  }
}

async function initSkills() {
  if (!CF.requireAuth()) return;
  if (!CF.ensureOnboarding("skills.html")) return;
  const target = document.getElementById("skillsGrid");
  try {
    const [skills, me] = await Promise.all([CF.request("/skills"), CF.request("/auth/me")]);
    const learner = CF.enrichedUser(me);
    const data = CF.onboarding();
    const plan = CF.yearPlan(learner.year);
    const recommended = new Set(plan.skillIds);
    const selected = new Set(data.skillsCompleted && (me.selectedSkillIds || []).length ? me.selectedSkillIds : plan.skillIds);
    const ordered = [
      ...skills.filter((skill) => recommended.has(skill.slug || skill.id)),
      ...skills.filter((skill) => !recommended.has(skill.slug || skill.id))
    ];
    document.getElementById("skillsTitle").textContent = `Choose Skills For ${plan.label}`;
    document.getElementById("skillsSubtitle").textContent = plan.goalPrompt;
    target.innerHTML = `
      <div class="surface mb-4">
        <div class="flow-steps compact">
          ${flowStep("1", "Landing", true)}
          ${flowStep("2", "Login", true)}
          ${flowStep("3", "Profile", true)}
          ${flowStep("4", "Year", true)}
          ${flowStep("5", "Goal", true)}
          ${flowStep("6", "Skills", true)}
          ${flowStep("7", "Dashboard", false)}
        </div>
      </div>
      <form id="skillsForm">
        <div class="row g-4">
          ${ordered.map((skill) => skillChoiceCard(skill, selected.has(skill.slug || skill.id), recommended.has(skill.slug || skill.id))).join("")}
        </div>
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
          <a class="btn btn-outline-primary btn-icon" href="choose-goal.html"><i class="bi bi-arrow-left"></i><span>Back</span></a>
          <button class="btn btn-primary btn-icon" type="submit"><i class="bi bi-speedometer2"></i><span>Open Dashboard</span></button>
        </div>
      </form>
    `;
    document.getElementById("skillsForm").addEventListener("submit", submitSelectedSkills);
    document.querySelectorAll(".skill-choice input").forEach((input) => {
      input.addEventListener("change", () => input.closest(".skill-choice")?.classList.toggle("selected", input.checked));
    });
  } catch (error) {
    target.innerHTML = emptyState(error.message);
  }
}

async function submitSelectedSkills(event) {
  event.preventDefault();
  const selected = Array.from(document.querySelectorAll("input[name='skillIds']:checked")).map((input) => input.value);
  if (!selected.length) {
    CF.toast("Select at least one skill.", "error");
    return;
  }
  try {
    await CF.request("/skills/select", { method: "POST", body: { skillIds: selected } });
    CF.saveOnboarding({ skillsCompleted: true });
    window.location.href = "dashboard.html";
  } catch (error) {
    CF.toast(error.message, "error");
  }
}

async function startSkill(skillId) {
  if (!CF.requireAuth()) return;
  try {
    const me = await CF.request("/auth/me");
    const selected = new Set(me.selectedSkillIds || []);
    selected.add(skillId);
    await CF.request("/skills/select", { method: "POST", body: { skillIds: Array.from(selected) } });
    window.location.href = `roadmap.html?skill=${encodeURIComponent(skillId)}`;
  } catch (error) {
    CF.toast(error.message, "error");
  }
}

async function initRoadmap() {
  const target = document.getElementById("roadmapContent");
  target.innerHTML = loadingState("Building your roadmap timeline...");
  try {
    const skill = await resolveSkill();
    const roadmap = await CF.request(`/skills/${encodeURIComponent(skill)}/roadmap`);
    const routeSkill = roadmap.skill.slug || roadmap.skill.id || skill;
    document.getElementById("roadmapTitle").textContent = `${roadmap.skill.name} Roadmap`;
    document.getElementById("roadmapSubtitle").textContent = roadmap.skill.description;
    target.innerHTML = roadmapTimeline(roadmap, routeSkill);
  } catch (error) {
    target.innerHTML = emptyState(error.message);
  }
}

async function initTopic() {
  const target = document.getElementById("topicContent");
  const skill = CF.queryParam("skill");
  const concept = CF.queryParam("concept");
  target.innerHTML = loadingState("Opening your lesson...");
  try {
    const [topic, roadmap] = await Promise.all([
      CF.request(`/topics/${encodeURIComponent(skill)}/${encodeURIComponent(concept)}`),
      CF.request(`/skills/${encodeURIComponent(skill)}/roadmap`).catch(() => null)
    ]);
    const nextTopic = nextTopicAfter(roadmap, concept);
    document.getElementById("topicTitle").textContent = topic.conceptName;
    document.getElementById("topicSubtitle").textContent = `${topic.skillName} learning topic`;
    target.innerHTML = topicTemplate({ ...topic, routeSkill: skill, routeConcept: concept, nextTopic });
    document.getElementById("completeTopicBtn")?.addEventListener("click", async (event) => {
      const result = await markComplete(topic.skillId, topic.conceptId);
      if (!result) return;
      event.currentTarget.classList.add("btn-success");
      event.currentTarget.innerHTML = `<i class="bi bi-check2-circle"></i><span>Completed</span>`;
      document.getElementById("completionBanner")?.classList.add("show");
    });
  } catch (error) {
    target.innerHTML = emptyState(error.message);
  }
}

async function initPractice() {
  if (!CF.requireAuth()) return;
  const target = document.getElementById("practiceContent");
  const skill = CF.queryParam("skill", CF.user()?.selectedSkillIds?.[0] || "java");
  const concept = CF.queryParam("concept");
  target.innerHTML = loadingState("Preparing practice questions...");
  try {
    const questions = CF.practiceCatalog(skill).filter((item) => !concept || item.conceptId === concept || item.conceptName.toLowerCase() === concept.toLowerCase());
    target.innerHTML = practiceTemplate(questions, skill);
    document.querySelectorAll("[data-practice-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-practice-filter]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.practiceFilter;
        document.querySelectorAll(".practice-question-card").forEach((card) => {
          card.hidden = filter !== "All" && card.dataset.difficulty !== filter;
        });
      });
    });
    document.querySelectorAll("[data-toggle-panel]").forEach((button) => {
      button.addEventListener("click", () => {
        const panel = document.getElementById(button.dataset.togglePanel);
        if (panel) panel.hidden = !panel.hidden;
      });
    });
    document.querySelectorAll("[data-complete-practice]").forEach((button) => {
      button.addEventListener("click", async () => {
        const [skillId, conceptId] = button.dataset.completePractice.split("|");
        await markComplete(skillId, conceptId);
        button.classList.add("btn-success");
        button.innerHTML = `<i class="bi bi-check2-circle"></i><span>Completed</span>`;
        updatePracticeProgress();
      });
    });
    updatePracticeProgress();
  } catch (error) {
    target.innerHTML = emptyState(error.message);
  }
}

function initResumeBuilder() {
  const form = document.getElementById("resumeBuilderForm");
  const preview = document.getElementById("resumePreview");
  if (!form || !preview) return;
  const saved = loadResumeDraft();
  const learner = CF.enrichedUser() || {};
  const defaults = {
    fullName: saved.fullName || learner.name || "Student Name",
    role: saved.role || "B.Tech Student | Aspiring Full Stack Developer",
    email: saved.email || learner.email || "student@email.com",
    phone: saved.phone || "+91 98765 43210",
    location: saved.location || "India",
    summary: saved.summary || "B.Tech student building strong programming, database, web development, and project skills through guided learning roadmaps.",
    skills: saved.skills || "Java, Python, SQL, DBMS, React, Spring Boot, Git, Problem Solving",
    projects: saved.projects || "Code-Friendly Learning Platform - Built a student roadmap website with login flow, year-wise skills, topic pages, quizzes, progress tracking, badges, dark mode, and resume builder.",
    education: saved.education || `${learner.branch || "Computer Science"} | ${learner.college || "Engineering College"} | ${learner.year || "Second Year"}`,
    achievements: saved.achievements || "Completed Java foundations roadmap\nBuilt portfolio-ready mini projects\nPracticed quizzes and topic revision consistently"
  };
  Object.entries(defaults).forEach(([name, value]) => {
    if (form.elements[name]) form.elements[name].value = value;
  });
  const render = () => {
    const data = resumeFormData(form);
    localStorage.setItem("cf_resume_builder", JSON.stringify(data));
    preview.innerHTML = resumePreviewTemplate(data);
  };
  form.addEventListener("input", render);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
    CF.toast("Resume preview updated.");
  });
  document.getElementById("resumeSampleBtn")?.addEventListener("click", () => {
    Object.entries(sampleResumeData()).forEach(([name, value]) => {
      if (form.elements[name]) form.elements[name].value = value;
    });
    render();
    CF.toast("Sample fresher resume loaded.");
  });
  document.getElementById("resumeCopyBtn")?.addEventListener("click", async () => {
    const data = resumeFormData(form);
    try {
      await navigator.clipboard.writeText(resumePlainText(data));
      CF.toast("Resume text copied.");
    } catch {
      CF.toast("Copy is blocked in this browser. Select the preview text manually.", "error");
    }
  });
  document.getElementById("resumePrintBtn")?.addEventListener("click", () => window.print());
  render();
}

async function initQuiz() {
  const target = document.getElementById("quizContent");
  const skill = CF.queryParam("skill");
  const concept = CF.queryParam("concept");
  target.innerHTML = loadingState("Loading quiz...");
  try {
    const quiz = await CF.request(`/quizzes/${encodeURIComponent(skill)}/${encodeURIComponent(concept)}`);
    if (!quiz) {
      target.innerHTML = emptyState("No quiz is available for this topic yet.");
      return;
    }
    target.innerHTML = quizTemplate(quiz);
    document.querySelectorAll("[data-quiz-choice]").forEach((input) => {
      input.addEventListener("change", () => {
        const answered = new Set(Array.from(document.querySelectorAll("[data-quiz-choice]:checked")).map((item) => item.name)).size;
        const percent = Math.round((answered * 100) / quiz.questions.length);
        const bar = document.getElementById("quizProgress");
        if (bar) bar.style.width = `${percent}%`;
      });
    });
    document.getElementById("quizForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!CF.requireAuth()) return;
      const answers = {};
      quiz.questions.forEach((question) => {
        const selected = document.querySelector(`input[name="${question.id}"]:checked`);
        if (selected) answers[question.id] = Number(selected.value);
      });
      try {
        const result = await CF.request("/quizzes/submit", {
          method: "POST",
          body: { quizId: quiz.id, skillId: skill, conceptId: concept, answers }
        });
        document.getElementById("quizResult").innerHTML = quizResult(result);
      } catch (error) {
        CF.toast(error.message, "error");
      }
    });
  } catch (error) {
    target.innerHTML = emptyState(error.message);
  }
}

async function initCompare() {
  const picker = document.getElementById("skillComparePicker");
  document.getElementById("compareResult").innerHTML = loadingState("Preparing compare mode...");
  try {
    const skills = await CF.request("/skills");
    const compareSkills = skills.filter((skill) => ["c", "java", "python", "javascript", "c-plus-plus"].includes(skill.slug));
    picker.innerHTML = compareSkills.map((skill, index) => `
      <label class="btn btn-outline-primary">
        <input type="checkbox" class="form-check-input me-1" value="${skill.slug}" ${index < 2 ? "checked" : ""}>
        <i class="bi ${languageIcon(skill.slug)}"></i> ${CF.escapeHtml(skill.name)}
      </label>
    `).join("");
    document.getElementById("compareForm").addEventListener("submit", (event) => {
      event.preventDefault();
      runCompare();
    });
    document.getElementById("conceptCompareSelect").addEventListener("change", runCompare);
    document.querySelectorAll("#skillComparePicker input").forEach((input) => input.addEventListener("change", runCompare));
    runCompare();
  } catch (error) {
    document.getElementById("compareResult").innerHTML = emptyState(error.message);
  }
}

async function runCompare() {
  const concept = document.getElementById("conceptCompareSelect").value;
  const selected = Array.from(document.querySelectorAll("#skillComparePicker input:checked")).map((input) => input.value);
  try {
    const result = await CF.request(`/compare?concept=${encodeURIComponent(concept)}&skillIds=${encodeURIComponent(selected.join(","))}`);
    document.getElementById("compareResult").innerHTML = compareTemplate(result);
  } catch (error) {
    document.getElementById("compareResult").innerHTML = emptyState(error.message);
  }
}

async function initProfile() {
  if (!CF.requireAuth()) return;
  const target = document.getElementById("profileContent");
  target.innerHTML = loadingState("Loading profile...");
  try {
    const profile = await CF.request("/profile");
    const learner = CF.enrichedUser(profile.user);
    const stats = profileStats(profile);
    target.innerHTML = `
      <div class="row g-4">
        <div class="col-lg-4">
          <div class="surface profile-card">
            <div class="profile-avatar">${initials(learner.name || "Learner")}</div>
            <h2 class="h5">${CF.escapeHtml(learner.name)}</h2>
            <p class="text-muted-soft mb-1">${CF.escapeHtml(learner.email)}</p>
            <p class="mb-0">${CF.escapeHtml(learner.college || "College not added")}</p>
            <p class="text-muted-soft mb-2">${CF.escapeHtml([learner.branch, learner.year].filter(Boolean).join(" - "))}</p>
            <span class="badge text-bg-primary">${CF.escapeHtml(learner.goal || "Goal not selected")}</span>
            <div class="d-grid mt-4">
              <a class="btn btn-outline-primary btn-icon justify-content-center" href="profile-setup.html"><i class="bi bi-pencil-square"></i><span>Edit Profile</span></a>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="surface mb-4">
            <h2 class="h5">Learning Statistics</h2>
            <div class="dashboard-grid">
              ${metric("Completed Topics", stats.completedTopics, "bi-check2-circle")}
              ${metric("Completed Modules", stats.completedModules, "bi-layers")}
              ${metric("Quiz Score", `${stats.quizScore}%`, "bi-ui-checks")}
              ${metric("Current Streak", `${stats.currentStreak} Days`, "bi-fire")}
              ${metric("Badges Earned", stats.badgesEarned, "bi-award")}
              ${metric("Learning Hours", `${stats.learningHours}h`, "bi-clock-history")}
            </div>
          </div>
          <div class="surface mb-4">
            <h2 class="h5">Skill Progress</h2>
            <div class="row g-3">${profile.selectedSkills.map(skillCard).join("") || "<p class='text-muted-soft mb-0'>No selected skills yet.</p>"}</div>
          </div>
          <div class="surface">
            <h2 class="h5">Badge Gallery</h2>
            ${badgeGallery(profile.badges)}
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    target.innerHTML = emptyState(error.message);
  }
}

async function resolveSkill() {
  const fromQuery = CF.queryParam("skill");
  if (fromQuery) return fromQuery;
  if (CF.token()) {
    const me = await CF.request("/auth/me");
    if (me.selectedSkillIds?.length) return me.selectedSkillIds[0];
  }
  const skills = await CF.request("/skills");
  return skills[0].id;
}

async function markComplete(skillId, conceptId) {
  if (!CF.requireAuth()) return;
  try {
    const result = await CF.request("/progress/complete-topic", {
      method: "POST",
      body: { skillId, conceptId }
    });
    CF.toast("Topic marked complete. Badge progress updated.");
    return result;
  } catch (error) {
    CF.toast(error.message, "error");
    return null;
  }
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function todayDate() {
  return new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function nextRoadmapTopic(roadmap) {
  const flat = flattenRoadmap(roadmap);
  const current = flat.find((item) => !item.completed) || flat[flat.length - 1];
  return {
    ...current,
    number: current?.number || 1,
    total: flat.length || 1,
    difficulty: CF.conceptDifficulty(current?.slug || current?.id),
    time: CF.estimatedMinutes(current?.slug || current?.id),
    statusLabel: current?.completed ? "Completed" : "Current"
  };
}

function flattenRoadmap(roadmap) {
  let counter = 0;
  return (roadmap?.modules || []).flatMap((module) => module.concepts.map((concept) => {
    counter += 1;
    return {
      ...concept,
      moduleName: module.name,
      moduleDescription: module.description,
      number: counter
    };
  }));
}

function nextTopicAfter(roadmap, conceptSlug) {
  const flat = flattenRoadmap(roadmap);
  const index = flat.findIndex((item) => item.slug === conceptSlug || item.id === conceptSlug);
  return index >= 0 ? flat[index + 1] : null;
}

function metaPill(label, value, icon) {
  return `
    <div class="meta-pill">
      <i class="bi ${icon}"></i>
      <span>${label}</span>
      <strong>${CF.escapeHtml(value)}</strong>
    </div>
  `;
}

function circleProgress(value) {
  const percent = Math.max(0, Math.min(100, Number(value) || 0));
  return `<div class="circle-progress" style="--value:${percent}"><strong>${percent}%</strong><span>Complete</span></div>`;
}

function badgeFallback() {
  return {
    name: "First Topic",
    description: "Complete a topic to unlock your first learning badge.",
    icon: "award"
  };
}

function badgeSpotlight(badge) {
  return `
    <div class="badge-spotlight">
      <span><i class="bi bi-${CF.escapeHtml(badge.icon || "award")}"></i></span>
      <h3 class="h5 mb-1">${CF.escapeHtml(badge.name)}</h3>
      <p class="text-muted-soft mb-0">${CF.escapeHtml(badge.description || "Badge earned through learning progress.")}</p>
    </div>
  `;
}

function quickAction(title, text, icon, href) {
  return `
    <a class="quick-action-card" href="${CF.escapeHtml(href)}">
      <i class="bi ${icon}"></i>
      <strong>${CF.escapeHtml(title)}</strong>
      <span>${CF.escapeHtml(text)}</span>
    </a>
  `;
}

function roadmapTimeline(roadmap, routeSkill) {
  const flat = flattenRoadmap(roadmap);
  const currentIndex = flat.findIndex((item) => !item.completed);
  const activeIndex = currentIndex === -1 ? flat.length - 1 : currentIndex;
  return `
    <div class="timeline-shell">
      <div class="timeline-heading">
        <span class="skill-mark" style="background:${CF.escapeHtml(roadmap.skill.color || "#2563EB")}">${initials(roadmap.skill.name)}</span>
        <div>
          <h2 class="h4 mb-1">${CF.escapeHtml(roadmap.skill.name)}</h2>
          <p class="text-muted-soft mb-0">${flat.filter((item) => item.completed).length}/${flat.length} topics completed</p>
        </div>
      </div>
      <div class="learning-timeline">
        ${flat.map((concept, index) => timelineItem(routeSkill, concept, index, activeIndex, flat.length)).join("")}
      </div>
    </div>
  `;
}

function timelineItem(routeSkill, concept, index, activeIndex, total) {
  const status = concept.completed ? "completed" : index === activeIndex ? "current" : "locked";
  const statusText = concept.completed ? "Completed" : index === activeIndex ? "Current Topic" : "Locked";
  const difficulty = CF.conceptDifficulty(concept.slug || concept.id);
  const time = CF.estimatedMinutes(concept.slug || concept.id);
  return `
    <article class="timeline-item ${status}">
      <div class="timeline-marker">${status === "completed" ? "<i class='bi bi-check-lg'></i>" : index + 1}</div>
      <div class="timeline-card">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-2">
          <div>
            <span class="section-eyebrow">${CF.escapeHtml(concept.moduleName)}</span>
            <h3 class="h5 mb-1">${CF.escapeHtml(concept.name)}</h3>
            <p class="text-muted-soft mb-0">${CF.escapeHtml(concept.description)}</p>
          </div>
          <span class="badge ${status === "completed" ? "text-bg-success" : status === "current" ? "text-bg-primary" : "text-bg-light"}">${statusText}</span>
        </div>
        <div class="today-meta-grid compact mt-3">
          ${metaPill("Difficulty", difficulty, "bi-speedometer")}
          ${metaPill("Estimated Time", `${time} Minutes`, "bi-clock")}
          ${metaPill("Topic", `${index + 1}/${total}`, "bi-list-ol")}
        </div>
        <div class="progress mt-3"><div class="progress-bar" style="width:${Math.round(((index + 1) * 100) / total)}%"></div></div>
        <a class="btn btn-sm ${status === "locked" ? "btn-outline-primary" : "btn-primary"} btn-icon mt-3" href="topic.html?skill=${encodeURIComponent(routeSkill)}&concept=${encodeURIComponent(concept.slug || concept.id)}"><i class="bi bi-play-fill"></i><span>${status === "completed" ? "Review" : "Start"}</span></a>
      </div>
    </article>
  `;
}

function flowStep(number, label, active = false) {
  return `
    <div class="flow-step ${active ? "active" : ""}">
      <span>${number}</span>
      <strong>${label}</strong>
    </div>
  `;
}

function bindChoiceCards(containerId) {
  document.querySelectorAll(`#${containerId} .choice-card input`).forEach((input) => {
    input.addEventListener("change", () => {
      document.querySelectorAll(`#${containerId} .choice-card`).forEach((card) => card.classList.remove("selected"));
      input.closest(".choice-card")?.classList.add("selected");
    });
  });
}

function skillChoiceCard(skill, selected = false, recommended = false) {
  const routeSkill = skill.slug || skill.id;
  return `
    <div class="col-md-6 col-xl-3">
      <label class="cf-card skill-choice ${selected ? "selected" : ""}">
        <input class="form-check-input" type="checkbox" name="skillIds" value="${CF.escapeHtml(routeSkill)}" ${selected ? "checked" : ""}>
        <div class="card-body">
          <div class="d-flex align-items-start gap-3 mb-3">
            <span class="skill-mark" style="background:${CF.escapeHtml(skill.color || "#2563EB")}">${initials(skill.name)}</span>
            <div>
              <h3 class="h5 mb-1">${CF.escapeHtml(skill.name)}</h3>
              <span class="badge ${recommended ? "text-bg-primary" : "text-bg-light"}">${recommended ? "Recommended" : CF.escapeHtml(skill.difficulty)}</span>
            </div>
          </div>
          <p class="text-muted-soft mb-0">${CF.escapeHtml(skill.description)}</p>
        </div>
      </label>
    </div>
  `;
}

function skillIdLabel(skillId) {
  const labels = {
    c: "C",
    python: "Python",
    "problem-solving": "Problem Solving",
    "git-basics": "Git Basics",
    java: "Java",
    dbms: "DBMS",
    sql: "SQL",
    "oop-skill": "OOP",
    "spring-boot": "Spring Boot",
    react: "React",
    aws: "AWS",
    "dsa-revision": "DSA Revision",
    "interview-preparation": "Interview Preparation",
    projects: "Projects",
    resume: "Resume"
  };
  return labels[skillId] || skillId;
}

function goalDescription(goal) {
  const descriptions = {
    "Placement Preparation": "Focus on DSA, interviews, projects, and resume readiness.",
    "Build Projects": "Choose skills that help you ship portfolio-ready work.",
    "Improve Programming Basics": "Strengthen syntax, logic, loops, arrays, and functions.",
    "Full Stack Developer": "Move toward frontend, backend, databases, and deployment.",
    "Cloud And DevOps": "Prepare for hosting, AWS basics, and production thinking.",
    "Interview Ready": "Practice explanations, common questions, and final-year preparation."
  };
  return CF.escapeHtml(descriptions[goal] || "Choose this as your main learning direction.");
}

function skillCard(skill, withButton = false) {
  const routeSkill = skill.slug || skill.id;
  return `
    <div class="${withButton ? "col-md-6 col-xl-3" : "col-md-6 col-xl-3"}">
      <div class="cf-card">
        <div class="card-body">
          <div class="d-flex align-items-start gap-3 mb-3">
            <span class="skill-mark" style="background:${CF.escapeHtml(skill.color || "#2563EB")}">${initials(skill.name)}</span>
            <div>
              <h3 class="h5 mb-1">${CF.escapeHtml(skill.name)}</h3>
              <span class="badge text-bg-light">${CF.escapeHtml(skill.difficulty)}</span>
            </div>
          </div>
          <p class="text-muted-soft">${CF.escapeHtml(skill.description)}</p>
          ${withButton ? `<button class="btn btn-primary btn-sm btn-icon" data-start-skill="${CF.escapeHtml(routeSkill)}"><i class="bi bi-play-fill"></i><span>Start Learning</span></button>` : ""}
        </div>
      </div>
    </div>
  `;
}

function conceptItem(skillId, concept) {
  const routeConcept = concept.slug || concept.id;
  return `
    <div class="concept-item">
      <div>
        <div class="d-flex align-items-center gap-2">
          <h3 class="h6 mb-1">${CF.escapeHtml(concept.name)}</h3>
          ${concept.completed ? "<span class='badge text-bg-success'>Done</span>" : ""}
        </div>
        <p class="small text-muted-soft mb-0">${CF.escapeHtml(concept.description)}</p>
      </div>
      <div class="concept-actions">
        <a class="btn btn-sm btn-outline-primary" title="Open topic" href="topic.html?skill=${encodeURIComponent(skillId)}&concept=${encodeURIComponent(routeConcept)}"><i class="bi bi-book"></i></a>
        <a class="btn btn-sm btn-outline-primary" title="Quiz" href="quiz.html?skill=${encodeURIComponent(skillId)}&concept=${encodeURIComponent(routeConcept)}"><i class="bi bi-ui-checks"></i></a>
      </div>
    </div>
  `;
}

function topicTemplate(topic) {
  const routeSkill = topic.routeSkill || topic.skillId;
  const routeConcept = topic.routeConcept || topic.conceptSlug || topic.conceptId;
  const isJava = String(topic.skillName || routeSkill).toLowerCase().includes("java");
  const firstExample = topic.examples?.[0] || { code: topic.codeExample, output: topic.output };
  return `
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="completion-banner mb-4" id="completionBanner">
          <i class="bi bi-award"></i>
          <div>
            <strong>Topic completed</strong>
            <p class="mb-0">Your progress is saved. Continue to the next topic when you are ready.</p>
          </div>
        </div>
        ${lessonSection(1, "Introduction", paragraphBlock(topic.definition, topic.definitionDetails?.slice(0, 1)))}
        ${lessonSection(2, "Theory", paragraphBlock(topic.explanation, topic.explanationDetails))}
        ${lessonSection(3, "Syntax", `<div class="code-box mb-0"><code>${CF.escapeHtml(topic.syntax)}</code></div>`)}
        ${lessonSection(4, "Visual Explanation", visualExplanation(topic))}
        ${lessonSection(5, "Real World Analogy", `<p>${CF.escapeHtml(topic.realWorldExample)}</p>`)}
        ${lessonSection(6, "Code Example", isJava ? javaExamplePanel(firstExample.code, topic.conceptName || "Java") : `<pre class="code-box lesson-code"><code>${CF.escapeHtml(firstExample.code || topic.codeExample)}</code></pre>`)}
        ${lessonSection(7, "Expected Output", `<pre class="code-box mb-0"><code>${CF.escapeHtml(firstExample.output || topic.output)}</code></pre>`)}
        ${lessonSection(8, "Advantages", listBlock("", topic.advantages))}
        ${lessonSection(9, "Disadvantages", listBlock("", topic.disadvantages))}
        ${lessonSection(10, "Common Mistakes", listBlock("", topic.commonMistakes))}
        ${lessonSection(11, "Interview Questions", `<div id="interview">${listBlock("", topic.interviewQuestions)}</div>`)}
        ${lessonSection(12, "Practice Questions", practicePromptList(topic))}
        ${lessonSection(13, "More Examples", topicExamples(topic, isJava))}
      </div>
      <div class="col-lg-4">
        <div class="surface mb-4 sticky-lesson-panel">
          <h2 class="h5">Learning Checklist</h2>
          ${listBlock("Study Steps", topic.learningSteps)}
          ${listBlock("Checkpoints", topic.checkpoints)}
          <button class="btn btn-primary w-100 btn-icon justify-content-center mt-2" id="completeTopicBtn"><i class="bi bi-check2-circle"></i><span>Mark Complete</span></button>
        </div>
        <div class="d-grid gap-2">
          <a class="btn btn-primary btn-icon justify-content-center" href="quiz.html?skill=${encodeURIComponent(routeSkill)}&concept=${encodeURIComponent(routeConcept)}"><i class="bi bi-ui-checks"></i><span>Start Quiz</span></a>
          <a class="btn btn-outline-primary btn-icon justify-content-center" href="practice.html?skill=${encodeURIComponent(routeSkill)}&concept=${encodeURIComponent(routeConcept)}"><i class="bi bi-code-square"></i><span>Practice Questions</span></a>
          ${topic.nextTopic ? `<a class="btn btn-outline-primary btn-icon justify-content-center" href="topic.html?skill=${encodeURIComponent(routeSkill)}&concept=${encodeURIComponent(topic.nextTopic.slug)}"><i class="bi bi-arrow-right-circle"></i><span>Next Topic</span></a>` : ""}
        </div>
      </div>
    </div>
  `;
}

function lessonSection(number, title, content) {
  return `
    <section class="surface lesson-section mb-4">
      <div class="lesson-section-title">
        <span>${number}</span>
        <h2 class="h5 mb-0">${title}</h2>
      </div>
      ${content}
    </section>
  `;
}

function paragraphBlock(primary, details = []) {
  const paragraphs = [primary, ...(details || [])].filter(Boolean);
  return `<div class="lesson-copy">${paragraphs.map((item) => `<p>${CF.escapeHtml(item)}</p>`).join("")}</div>`;
}

function stepList(steps = []) {
  if (!steps.length) return "";
  return `
    <ol class="lesson-step-list">
      ${steps.map((step) => `<li>${CF.escapeHtml(step)}</li>`).join("")}
    </ol>
  `;
}

function topicExamples(topic, isJava) {
  const examples = topic.examples?.length ? topic.examples : [{
    title: "Example 1: Basic Example",
    input: "No input",
    code: topic.codeExample,
    output: topic.output,
    explanation: "Read the code from top to bottom and connect each important line to the output."
  }];
  return `
    <div class="lesson-example-list">
      ${examples.slice(0, 3).map((example, index) => `
        <section class="lesson-example-card">
          <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
            <h3 class="h6 mb-0">${CF.escapeHtml(example.title || `Example ${index + 1}`)}</h3>
            <span class="badge text-bg-light">Example ${index + 1}</span>
          </div>
          <p class="text-muted-soft">${CF.escapeHtml(example.explanation || "Follow the input, code, and output in order.")}</p>
          <div class="sample-grid">
            <div class="sample-panel">
              <strong>Sample Input</strong>
              <pre><code>${CF.escapeHtml(example.input || "No input")}</code></pre>
            </div>
            <div class="sample-panel">
              <strong>Sample Output</strong>
              <pre><code>${CF.escapeHtml(example.output || "Working result")}</code></pre>
            </div>
          </div>
          ${isJava ? javaExamplePanel(example.code, topic.conceptName || "Java") : `<pre class="code-box lesson-code"><code>${CF.escapeHtml(example.code || "")}</code></pre>`}
          ${isJava ? javaLineExplanationPanel(example.code) : ""}
        </section>
      `).join("")}
    </div>
  `;
}

function visualExplanation(topic) {
  return `
    <div class="visual-flow">
      <div><i class="bi bi-keyboard"></i><strong>Input</strong><span>Values or data enter the program.</span></div>
      <i class="bi bi-arrow-right"></i>
      <div><i class="bi bi-gear"></i><strong>${CF.escapeHtml(topic.conceptName)}</strong><span>The topic controls how the data is stored, checked, repeated, or processed.</span></div>
      <i class="bi bi-arrow-right"></i>
      <div><i class="bi bi-terminal"></i><strong>Output</strong><span>The learner sees the final result clearly.</span></div>
    </div>
  `;
}

function practicePromptList(topic) {
  const base = topic.practiceQuestions?.[0];
  const questions = [
    { difficulty: "Easy", text: base?.prompt || `Write a basic ${topic.conceptName} example.`, time: "15 Minutes" },
    { difficulty: "Medium", text: `Change the example so it uses two values and prints a formatted result.`, time: "30 Minutes" },
    { difficulty: "Hard", text: `Use ${topic.conceptName} in a small learner-progress mini program.`, time: "45 Minutes" }
  ];
  return `
    <div class="practice-mini-list">
      ${questions.map((item) => `
        <div>
          <span class="badge ${difficultyBadge(item.difficulty)}">${item.difficulty}</span>
          <strong>${CF.escapeHtml(item.text)}</strong>
          <small>${item.time}</small>
        </div>
      `).join("")}
    </div>
  `;
}

function practiceTemplate(questions, skillId) {
  return `
    <section class="practice-hero surface mb-4">
      <div>
        <span class="section-eyebrow">Today's Practice</span>
        <h2 class="h4 mb-1">${CF.escapeHtml(skillIdLabel(skillId))} Practice Set</h2>
        <p class="text-muted-soft mb-0">Use hints first, reveal the solution only after trying, then mark complete to update progress.</p>
      </div>
      <div class="practice-progress">
        <strong id="practiceSolved">0/${questions.length}</strong>
        <span>Solved</span>
      </div>
    </section>
    <div class="surface mb-4">
      <div class="d-flex flex-wrap gap-2">
        ${["All", "Easy", "Medium", "Hard"].map((item, index) => `<button class="btn btn-sm btn-outline-primary ${index === 0 ? "active" : ""}" type="button" data-practice-filter="${item}">${item}</button>`).join("")}
      </div>
    </div>
    <div class="practice-grid">
      ${questions.map((question, index) => practiceQuestionCard(question, index)).join("")}
    </div>
  `;
}

function practiceQuestionCard(question, index) {
  const hintId = `hint-${index}`;
  const solutionId = `solution-${index}`;
  return `
    <article class="practice-question-card" data-difficulty="${CF.escapeHtml(question.difficulty)}">
      <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
        <div>
          <span class="section-eyebrow">${CF.escapeHtml(question.topic)}</span>
          <h3 class="h5 mb-1">${CF.escapeHtml(question.title)}</h3>
        </div>
        <span class="badge ${difficultyBadge(question.difficulty)}">${CF.escapeHtml(question.difficulty)}</span>
      </div>
      <p>${CF.escapeHtml(question.question)}</p>
      <div class="today-meta-grid compact">
        ${metaPill("Expected Time", question.expectedTime, "bi-clock")}
        ${metaPill("Topic", question.conceptName, "bi-book")}
        ${metaPill("Output", question.expectedOutput, "bi-terminal")}
      </div>
      <div class="d-flex flex-wrap gap-2 mt-3">
        <button class="btn btn-sm btn-outline-primary btn-icon" type="button" data-toggle-panel="${hintId}"><i class="bi bi-lightbulb"></i><span>Hints</span></button>
        <button class="btn btn-sm btn-outline-primary btn-icon" type="button" data-toggle-panel="${solutionId}"><i class="bi bi-code-slash"></i><span>Solution</span></button>
        <button class="btn btn-sm btn-primary btn-icon" type="button" data-complete-practice="${CF.escapeHtml(question.skillId)}|${CF.escapeHtml(question.conceptId)}"><i class="bi bi-check2-circle"></i><span>Mark Complete</span></button>
      </div>
      <div class="practice-panel mt-3" id="${hintId}" hidden>${listBlock("Hints", question.hints)}</div>
      <div class="practice-panel mt-3" id="${solutionId}" hidden><pre class="code-box mb-0"><code>${CF.escapeHtml(question.solution)}</code></pre></div>
    </article>
  `;
}

function updatePracticeProgress() {
  const solved = document.querySelectorAll("[data-complete-practice].btn-success").length;
  const total = document.querySelectorAll("[data-complete-practice]").length;
  const target = document.getElementById("practiceSolved");
  if (target) target.textContent = `${solved}/${total}`;
}

function difficultyBadge(difficulty) {
  if (difficulty === "Hard") return "text-bg-warning";
  if (difficulty === "Medium") return "text-bg-primary";
  return "text-bg-success";
}

function languageIcon(skillId) {
  const icons = {
    c: "bi-c-circle",
    java: "bi-cup-hot",
    python: "bi-filetype-py",
    javascript: "bi-filetype-js",
    "c-plus-plus": "bi-c-circle"
  };
  return icons[skillId] || "bi-code-slash";
}

function languageMemory(skillId) {
  const values = {
    c: "Manual memory awareness with stack values, arrays, pointers, and direct addresses.",
    java: "Managed by JVM garbage collection with fixed primitive types and object references.",
    python: "Managed dynamically by the interpreter with references to objects.",
    javascript: "Managed by the runtime with dynamic values and garbage collection.",
    "c-plus-plus": "Manual and automatic options with stack, heap, references, and RAII."
  };
  return values[skillId] || "Depends on the language runtime and data structure used.";
}

function complexityFor(conceptName) {
  const key = String(conceptName || "").toLowerCase();
  if (key.includes("array") || key.includes("string") || key.includes("loop") || key.includes("collection")) return ["O(n)", "O(1) to O(n)"];
  if (key.includes("recursion")) return ["O(n)", "O(n) call stack"];
  return ["O(1)", "O(1)"];
}

function bestUseCase(item) {
  return `${item.skillName} is useful when a learner wants to apply ${item.definition.split(".")[0].toLowerCase()} in real exercises.`;
}

function profileStats(profile) {
  const progress = profile.progress || [];
  const completedTopics = progress.reduce((sum, item) => sum + item.completedTopics, 0);
  const completedModules = progress.reduce((sum, item) => sum + item.completedModules, 0);
  const quizValues = progress.map((item) => item.quizAverage || 0).filter(Boolean);
  const quizScore = quizValues.length ? Math.round(quizValues.reduce((sum, value) => sum + value, 0) / quizValues.length) : 0;
  const currentStreak = Math.max(0, ...progress.map((item) => item.streakDays || 0));
  const badgesEarned = profile.badges?.length || 0;
  const learningHours = Math.max(1, Math.round(completedTopics * 0.75));
  return { completedTopics, completedModules, quizScore, currentStreak, badgesEarned, learningHours };
}

function badgeGallery(unlocked = []) {
  const unlockedNames = new Set(unlocked.map((badge) => badge.name));
  const all = [
    "First Login",
    "First Topic",
    "Java Beginner",
    "Python Explorer",
    "Array Expert",
    "Loop Master",
    "Quiz Master",
    "Problem Solver",
    "7 Day Streak",
    "30 Day Streak"
  ];
  const icons = {
    "First Login": "box-arrow-in-right",
    "First Topic": "check-circle",
    "Java Beginner": "cup-hot",
    "Python Explorer": "filetype-py",
    "Array Expert": "grid",
    "Loop Master": "repeat",
    "Quiz Master": "trophy",
    "Problem Solver": "puzzle",
    "7 Day Streak": "fire",
    "30 Day Streak": "calendar-check"
  };
  return `
    <div class="badge-gallery">
      ${all.map((name) => {
        const badge = unlocked.find((item) => item.name === name) || { name, icon: icons[name] || "award" };
        const earned = unlockedNames.has(name) || ["First Login"].includes(name);
        return `
          <div class="badge-card ${earned ? "earned" : "locked"}">
            <span><i class="bi bi-${CF.escapeHtml(badge.icon || "award")}"></i></span>
            <strong>${CF.escapeHtml(name)}</strong>
            <small>${earned ? "Unlocked" : "Locked"}</small>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function javaExamplePanel(code, conceptName) {
  const lines = String(code || "").split("\n");
  return `
    <div class="vs-code-card mb-3">
      <div class="vs-code-title">
        <span class="vs-code-dot"></span>
        <span>${CF.escapeHtml(conceptName)}.java</span>
      </div>
      <div class="vs-code-lines" aria-label="Java code example">
        ${lines.map((line, index) => `
          <div class="vs-code-line">
            <span class="vs-code-line-number">${index + 1}</span>
            <code>${highlightJava(line) || "&nbsp;"}</code>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function javaLineExplanationPanel(code) {
  const notes = String(code || "")
    .split("\n")
    .map((line, index) => ({ line: index + 1, note: explainJavaLine(line) }))
    .filter((item) => item.note);
  if (!notes.length) return "";
  return `
    <div class="line-explanation mt-3">
      <h3 class="h6">Line By Line Explanation</h3>
      ${notes.map((item) => `
        <div class="line-note">
          <span>Line ${item.line}</span>
          <p>${CF.escapeHtml(item.note)}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function highlightJava(line) {
  let text = CF.escapeHtml(line);
  const slots = {};
  let slotIndex = 0;
  const slotName = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let value = slotIndex++;
    let name = "";
    do {
      name = alphabet[value % alphabet.length] + name;
      value = Math.floor(value / alphabet.length) - 1;
    } while (value >= 0);
    return `@@${name}@@`;
  };
  const hold = (html) => {
    const name = slotName();
    slots[name] = html;
    return name;
  };
  text = text.replace(/\/\/.*$/, (match) => hold(`<span class="java-comment">${match}</span>`));
  text = text.replace(/&quot;.*?&quot;/g, (match) => hold(`<span class="java-string">${match}</span>`));
  text = text.replace(/&(lt|gt|amp);/g, (match) => hold(`<span class="java-punctuation">${match}</span>`));
  text = text.replace(/\b(abstract|boolean|break|case|catch|class|continue|default|double|else|extends|final|for|if|implements|import|int|interface|new|package|private|protected|public|return|static|String|this|try|void|while)\b/g, (match) => hold(`<span class="java-keyword">${match}</span>`));
  text = text.replace(/\b(System|Scanner|List|ArrayList|Path|Files|Collectors)\b/g, (match) => hold(`<span class="java-type">${match}</span>`));
  text = text.replace(/\b\d+(?:\.\d+)?\b/g, (match) => hold(`<span class="java-number">${match}</span>`));
  text = text.replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g, (match) => hold(`<span class="java-method">${match}</span>`));
  text = text.replace(/([{}()[\];.,=+\-*/!|?:])/g, (match) => hold(`<span class="java-punctuation">${match}</span>`));
  Object.entries(slots).forEach(([name, html]) => {
    text = text.replaceAll(name, html);
  });
  return text;
}

function explainJavaLine(line) {
  const trimmed = String(line || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("//")) return "This is a comment. Java ignores it, but it helps humans understand the code.";
  if (trimmed.startsWith("package ")) return "This puts the class inside a named project folder group.";
  if (trimmed.startsWith("import ")) return "This brings a Java library class into the file so the code can use it.";
  if (trimmed.includes("public static void main")) return "This is the main method. Java starts running the program from here.";
  if (/\bclass\s+\w+/.test(trimmed)) return "This creates a class, which is the basic container for Java code.";
  if (trimmed.startsWith("private ")) return "This creates private data so outside code cannot change it directly.";
  if (trimmed.startsWith("public ")) return "This line is available for other code to call or use.";
  if (/^[A-Z]\w*\s*\([^)]*\)\s*\{?$/.test(trimmed)) return "This is a constructor. It runs when a new object is created.";
  if (/^(int|String|double|boolean|char)\s+\w+\s*;$/.test(trimmed)) return "This creates a field, which is a value stored inside each object.";
  if (trimmed.startsWith("this.")) return "This copies the constructor input into the object's field.";
  if (trimmed.startsWith("if ")) return "This checks a condition before running the code inside the braces.";
  if (trimmed.startsWith("for ")) return "This repeats the code inside the braces for each step of the loop.";
  if (trimmed.startsWith("return ")) return "This sends a value back from the method.";
  if (trimmed.includes("System.out.print")) return "This prints the final result on the screen.";
  if (trimmed.includes("new ")) return "This creates a new object from a class.";
  if (/\.\w+\s*\(/.test(trimmed)) return "This calls a method on an object.";
  if (trimmed.includes("=")) return "This stores a value in a variable or field.";
  if (/\w+\s+\w+\s*\(/.test(trimmed)) return "This defines a method, which is a reusable block of Java code.";
  if (trimmed === "}" || trimmed === "};") return "This closes the current block of code.";
  if (trimmed === "{") return "This opens a block where related code lines belong together.";
  return "This line is part of the Java example and supports the result shown below.";
}

function loadResumeDraft() {
  try {
    return JSON.parse(localStorage.getItem("cf_resume_builder") || "{}");
  } catch {
    return {};
  }
}

function resumeFormData(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, String(value || "").trim()]));
}

function sampleResumeData() {
  return {
    fullName: "Asha Reddy",
    role: "B.Tech CSE Student | Java Full Stack Learner",
    email: "asha.reddy@email.com",
    phone: "+91 98765 43210",
    location: "Hyderabad, India",
    summary: "Second-year B.Tech student learning Java, DBMS, SQL, OOP, and web development. Interested in building useful student-focused applications with clean UI and practical backend logic.",
    skills: "Java, OOP, SQL, DBMS, HTML, CSS, JavaScript, Git, Problem Solving",
    projects: "Code-Friendly Learning Platform - Designed a personalized roadmap website for B.Tech students with login flow, year-wise skills, topic content, quizzes, progress tracking, badges, dark mode, and resume builder.\nStudent Result Tracker - Built a simple dashboard to store subject marks, calculate percentage, and show pass or fail status.",
    education: "B.Tech Computer Science | Demo Engineering College | Second Year",
    achievements: "Completed Java basics and OOP roadmap\nBuilt two academic mini projects\nPracticed SQL queries, Git commits, and problem-solving exercises"
  };
}

function splitResumeLines(value) {
  return String(value || "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitResumeBullets(value) {
  return String(value || "")
    .split(/\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function resumePreviewTemplate(data) {
  const skills = splitResumeLines(data.skills);
  return `
    <article class="resume-paper">
      <header class="resume-paper-header">
        <div>
          <h2>${CF.escapeHtml(data.fullName || "Student Name")}</h2>
          <p>${CF.escapeHtml(data.role || "B.Tech Student")}</p>
        </div>
        <div class="resume-contact">
          <span>${CF.escapeHtml(data.email || "student@email.com")}</span>
          <span>${CF.escapeHtml(data.phone || "+91 98765 43210")}</span>
          <span>${CF.escapeHtml(data.location || "India")}</span>
        </div>
      </header>
      ${resumePreviewSection("Profile Summary", [data.summary])}
      ${resumePreviewSection("Technical Skills", skills)}
      ${resumePreviewSection("Projects", splitResumeBullets(data.projects))}
      ${resumePreviewSection("Education", [data.education])}
      ${resumePreviewSection("Achievements", splitResumeBullets(data.achievements))}
    </article>
  `;
}

function resumePreviewSection(title, values) {
  const clean = (values || []).map((item) => String(item || "").trim()).filter(Boolean);
  if (!clean.length) return "";
  return `
    <section class="resume-preview-section">
      <h3>${CF.escapeHtml(title)}</h3>
      <ul>${clean.map((item) => `<li>${CF.escapeHtml(item)}</li>`).join("")}</ul>
    </section>
  `;
}

function resumePlainText(data) {
  const lines = [
    data.fullName || "Student Name",
    data.role || "B.Tech Student",
    `${data.email || "student@email.com"} | ${data.phone || "+91 98765 43210"} | ${data.location || "India"}`,
    "",
    "PROFILE SUMMARY",
    data.summary || "",
    "",
    "TECHNICAL SKILLS",
    ...splitResumeLines(data.skills).map((item) => `- ${item}`),
    "",
    "PROJECTS",
    ...splitResumeBullets(data.projects).map((item) => `- ${item}`),
    "",
    "EDUCATION",
    data.education || "",
    "",
    "ACHIEVEMENTS",
    ...splitResumeBullets(data.achievements).map((item) => `- ${item}`)
  ];
  return lines.join("\n");
}

function quizTemplate(quiz) {
  return `
    <form id="quizForm" class="surface quiz-shell">
      <div class="quiz-topbar">
        <div>
          <span class="section-eyebrow">Quiz Module</span>
          <h2 class="h4 mb-1">${CF.escapeHtml(quiz.title)}</h2>
          <p class="text-muted-soft mb-0">Answer each MCQ, submit, then review explanations.</p>
        </div>
        <div class="quiz-stats">
          <span><i class="bi bi-clock"></i> 10:00</span>
          <span><i class="bi bi-star"></i> Score 0</span>
        </div>
      </div>
      <div class="progress my-4"><div class="progress-bar" style="width:0%" id="quizProgress"></div></div>
      ${quiz.questions.map((question, questionIndex) => `
        <fieldset class="quiz-question mt-4">
          <legend class="h6">Question ${questionIndex + 1} of ${quiz.questions.length}: ${CF.escapeHtml(question.text)}</legend>
          <div class="d-grid gap-2">
            ${question.options.map((option, optionIndex) => `
              <label class="quiz-option">
                <input type="radio" name="${question.id}" value="${optionIndex}" required data-quiz-choice>
                ${CF.escapeHtml(option)}
              </label>
            `).join("")}
          </div>
        </fieldset>
      `).join("")}
      <button class="btn btn-primary btn-icon mt-4" type="submit"><i class="bi bi-send-check"></i><span>Submit Quiz</span></button>
      <div id="quizResult" class="mt-4"></div>
    </form>
  `;
}

function compareTemplate(result) {
  if (result.items.length === 1) {
    const item = result.items[0];
    const [time, space] = complexityFor(result.conceptName);
    return `
      <div class="surface compare-single">
        <div class="d-flex align-items-center gap-3 mb-3">
          <span class="skill-mark" style="background:#2563EB"><i class="bi ${languageIcon(item.skillId)}"></i></span>
          <div>
            <h2 class="h4 mb-1">${CF.escapeHtml(result.conceptName)} in ${CF.escapeHtml(item.skillName)}</h2>
            <p class="text-muted-soft mb-0">Single-language topic view.</p>
          </div>
        </div>
        <p>${CF.escapeHtml(item.definition)}</p>
        <div class="today-meta-grid compact mb-3">
          ${metaPill("Time Complexity", time, "bi-stopwatch")}
          ${metaPill("Space Complexity", space, "bi-memory")}
          ${metaPill("Best Use", bestUseCase(item), "bi-bullseye")}
        </div>
        <pre class="code-box language-code"><code>${CF.escapeHtml(item.codeExample)}</code></pre>
        ${listBlock("Advantages", item.advantages)}
      </div>
    `;
  }
  return `
    <div class="compare-grid mb-4">
      ${result.items.map((item) => `
        <div class="surface">
          <div class="d-flex align-items-center gap-3 mb-3">
            <span class="skill-mark" style="background:#2563EB"><i class="bi ${languageIcon(item.skillId)}"></i></span>
            <h2 class="h5 mb-0">${CF.escapeHtml(item.skillName)}</h2>
          </div>
          <table class="table table-compare align-middle">
            <tbody>
              <tr><th>Definition</th><td>${CF.escapeHtml(item.definition)}</td></tr>
              <tr><th>Syntax</th><td><code>${CF.escapeHtml(item.syntax)}</code></td></tr>
              <tr><th>Memory Usage</th><td>${CF.escapeHtml(languageMemory(item.skillId))}</td></tr>
              <tr><th>Declaration</th><td><code>${CF.escapeHtml(item.syntax.split("\n")[0] || item.syntax)}</code></td></tr>
              <tr><th>Initialization</th><td>${CF.escapeHtml(item.output)}</td></tr>
              <tr><th>Traversal</th><td>${CF.escapeHtml(result.conceptName)} is usually practiced by reading values, processing them, and printing the output.</td></tr>
              <tr><th>Advantages</th><td>${item.advantages.map(CF.escapeHtml).join("<br>")}</td></tr>
              <tr><th>Disadvantages</th><td>${item.disadvantages.map(CF.escapeHtml).join("<br>")}</td></tr>
              <tr><th>Common Mistakes</th><td>${item.commonMistakes.map(CF.escapeHtml).join("<br>")}</td></tr>
              <tr><th>Interview Questions</th><td>${item.interviewQuestions.map(CF.escapeHtml).join("<br>")}</td></tr>
              <tr><th>Example Code</th><td><pre class="code-box language-code"><code>${CF.escapeHtml(item.codeExample)}</code></pre></td></tr>
              <tr><th>Expected Output</th><td><pre class="code-box"><code>${CF.escapeHtml(item.output || "Working result")}</code></pre></td></tr>
              <tr><th>Time Complexity</th><td>${CF.escapeHtml(complexityFor(result.conceptName)[0])}</td></tr>
              <tr><th>Space Complexity</th><td>${CF.escapeHtml(complexityFor(result.conceptName)[1])}</td></tr>
              <tr><th>Best Use Cases</th><td>${CF.escapeHtml(bestUseCase(item))}</td></tr>
            </tbody>
          </table>
        </div>
      `).join("")}
    </div>
    <div class="row g-4">
      <div class="col-md-6"><div class="surface">${listBlock("Similarities", result.similarities)}</div></div>
      <div class="col-md-6"><div class="surface">${listBlock("Differences", result.differences)}</div></div>
    </div>
  `;
}

function quizResult(result) {
  const correct = result.answers.filter((answer) => answer.correct).length;
  const wrong = result.total - correct;
  const skill = CF.queryParam("skill", "java");
  const concept = CF.queryParam("concept", "variables");
  return `
    <div class="quiz-result-card alert alert-${result.percentage >= 80 ? "success" : "warning"} mb-3">
      <h3 class="h5 mb-2">Score: ${result.score}/${result.total} (${result.percentage}%)</h3>
      <div class="dashboard-grid mb-3">
        ${metric("Correct Answers", correct, "bi-check-circle")}
        ${metric("Wrong Answers", wrong, "bi-x-circle")}
        ${metric("Result", result.percentage >= 80 ? "Passed" : "Review", "bi-award")}
        ${metric("Next Step", result.percentage >= 80 ? "Next Topic" : "Retry Quiz", "bi-arrow-repeat")}
      </div>
      <div class="d-flex flex-wrap gap-2">
        <a class="btn btn-outline-primary btn-icon" href="quiz.html?skill=${encodeURIComponent(skill)}&concept=${encodeURIComponent(concept)}"><i class="bi bi-arrow-repeat"></i><span>Retry Quiz</span></a>
        <a class="btn btn-primary btn-icon" href="roadmap.html?skill=${encodeURIComponent(skill)}"><i class="bi bi-arrow-right-circle"></i><span>Next Topic</span></a>
      </div>
    </div>
    ${result.answers.map((answer, index) => `
      <p class="mb-2"><strong>Question ${index + 1}:</strong> ${answer.correct ? "Correct" : "Review needed"} - ${CF.escapeHtml(answer.explanation)}</p>
    `).join("")}
  `;
}

function metric(label, value, icon) {
  return `
    <div class="metric-box">
      <div class="d-flex align-items-center gap-2 text-muted-soft"><i class="bi ${icon}"></i><span>${label}</span></div>
      <strong>${CF.escapeHtml(value)}</strong>
    </div>
  `;
}

function progressRoadmapItem(item, index) {
  return `
    <div class="roadmap-mini-item">
      <span>${index + 1}</span>
      <div>
        <strong>${CF.escapeHtml(item.skillName)}</strong>
        <p class="text-muted-soft mb-0">${CF.escapeHtml(item.currentTopic)}</p>
      </div>
      <a class="btn btn-sm btn-outline-primary btn-icon" href="roadmap.html?skill=${encodeURIComponent(item.skillId)}"><i class="bi bi-map"></i><span>Roadmap</span></a>
    </div>
  `;
}

function badgeItem(badge) {
  return `
    <div class="d-flex align-items-center gap-3 py-2">
      <span class="badge-mark"><i class="bi bi-${CF.escapeHtml(badge.icon || "award")}"></i></span>
      <div>
        <strong>${CF.escapeHtml(badge.name)}</strong>
        <p class="text-muted-soft small mb-0">${CF.escapeHtml(badge.description)}</p>
      </div>
    </div>
  `;
}

function listBlock(title, values) {
  if (!values?.length) return "";
  return `
    ${title ? `<h3 class="h6 mt-3">${title}</h3>` : ""}
    <ul class="mb-0">${values.map((value) => `<li>${CF.escapeHtml(value)}</li>`).join("")}</ul>
  `;
}

function emptyState(message) {
  return `<div class="empty-state"><p class="mb-0 text-muted-soft">${CF.escapeHtml(message)}</p></div>`;
}

function emptyActionState(message, action, href, icon = "bi-arrow-right") {
  return `
    <div class="empty-state">
      <p class="text-muted-soft">${CF.escapeHtml(message)}</p>
      <a class="btn btn-primary btn-icon justify-content-center" href="${CF.escapeHtml(href)}"><i class="bi ${icon}"></i><span>${CF.escapeHtml(action)}</span></a>
    </div>
  `;
}

function loadingState(message = "Loading...") {
  return `
    <div class="loading-state">
      <span></span>
      <p class="mb-0">${CF.escapeHtml(message)}</p>
    </div>
  `;
}

function initials(name) {
  return String(name)
    .split(/[ /+-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
