# Code-Friendly

Code-Friendly is a browser website for B.Tech learners. It uses HTML5, CSS3, Bootstrap 5, vanilla JavaScript, Java 21, Spring Boot 3, Spring Security, JWT, and MongoDB.

## Project Structure

```text
code-friendly/
  *.html      browser website pages
  api.js      frontend API/demo data layer
  pages.js    frontend page behavior
  styles.css  website styling
  src/main/   Spring Boot REST API source and resources
  docs        API and MongoDB notes
```

## MongoDB Setup

The backend reads local settings from `.env` in the project root. Put your MongoDB Atlas URL there:

```powershell
MONGO_CLUSTER_URL=mongodb+srv://<username>:<password>@<cluster-host>/codefriendly?retryWrites=true&w=majority&appName=Cluster0
```

The backend defaults to `mongodb://localhost:27017/codefriendly` if `MONGO_CLUSTER_URL` is not set.

## Run Backend

```powershell
.\start-backend.ps1
```

Swagger opens at:

```text
http://localhost:8080/swagger-ui.html
```

## Run Website

Run the static website:

```powershell
.\start-website.ps1
```

Then open:

```text
http://127.0.0.1:5501/index.html
```

Demo account created by seed data:

```text
Email: student@codefriendly.dev
Password: password123
```

The website works in two modes:

- Live mode: uses the Spring Boot API and MongoDB when `http://localhost:8080/api` is running.
- Demo mode: if the backend is not reachable, the same website still works using browser local storage.

## Main Features

- Register, login, logout with JWT
- Dashboard with progress, streak, current topic, and badges
- Skill selection cards
- Roadmap modules and concepts
- Topic details with syntax, examples, output, mistakes, and interview questions
- Practice questions
- Quiz with immediate score and explanations
- Smart Compare Mode for language concepts
- Profile with selected skills and badges

## MongoDB Conversion

The original MySQL/JPA plan has been changed to MongoDB:

- `users`
- `skills`
- `modules`
- `concepts`
- `practice_questions`
- `quizzes`
- `badges`
- `user_badges`
- `progress`

Shared concepts are stored once in `concepts`, and each concept contains skill-specific implementations. This makes Smart Compare Mode simple and avoids duplicating the concept itself for every language.
