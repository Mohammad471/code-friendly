# Code-Friendly API Endpoints

Base URL:

```text
http://localhost:8080/api
```

## Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/register` | Create a learner account |
| POST | `/auth/login` | Login and receive JWT |
| GET | `/auth/me` | Current learner profile |

## Skills And Roadmap

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/skills` | List all skills |
| POST | `/skills/select` | Save selected skills |
| GET | `/skills/{skillId}/roadmap` | Get modules and concepts |

## Learning

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/topics/{skillId}/{conceptId}` | Topic detail page data |
| GET | `/practice/{skillId}/{conceptId}` | Practice questions |
| GET | `/quizzes/{skillId}/{conceptId}` | Quiz questions without answers |
| POST | `/quizzes/submit` | Submit quiz answers |

## Progress

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/progress` | Progress summaries for selected skills |
| GET | `/progress/{skillId}` | Progress for one skill |
| POST | `/progress/complete-topic` | Mark a topic complete |

## Smart Compare

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/compare?concept=arrays&skillIds=java,python` | Compare a concept across selected skills |

## Profile

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/profile` | Learner details, selected skills, progress, and badges |
