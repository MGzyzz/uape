# UAPE — Project Context for Claude

## Project Overview
Educational platform that aggregates YouTube courses, playlists, and channels.
Users take an onboarding quiz and assessment test; content recommendations are personalized based on their results (field of interest + skill level).

## Repository Structure
```
uape/
├── back_end/        # Django REST API
│   ├── accounts/    # Custom user model, auth
│   ├── api/         # API routing
│   ├── uape/        # Main app (courses, channels, sections, bookmarks)
│   └── core/        # settings.py, urls.py, wsgi
└── front_end/       # React + Vite SPA
    └── src/
        ├── api/         # axios client + API functions
        ├── app/         # App.jsx, routing
        ├── pages/       # auth, landing, profile, ...
        └── shared/      # assets, shared components
```

## Tech Stack

### Backend
- Python 3.11, Django 5.2, Django REST Framework
- Auth: JWT via `djangorestframework-simplejwt` (access 60min, refresh 7d)
- DB: SQLite (dev) → PostgreSQL (prod, psycopg2 installed)
- Custom user model: `accounts.User`
- Package manager: Poetry (`pyproject.toml`)
- Linter: Ruff

### Frontend
- React 19, Vite 7
- Styling: Tailwind CSS v4
- Routing: React Router DOM v7
- HTTP: Axios
- Animations: Framer Motion
- Icons: React Icons
- API base URL: `VITE_API_URL` env var (default `http://localhost:8000/api`)
- Tokens stored in localStorage (`access`, `refresh`, `user`)

## Planned Backend Models (courses feature)

| Model | Notes |
|-------|-------|
| `Tag` | name, color (hex) |
| `Channel` | youtube_id, name, subscribers, avatar_url, description, url, tags |
| `Playlist` | youtube_id, title, thumbnail_url, video_count, channel, tags, url |
| `Video` | youtube_id, title, thumbnail_url, duration, channel, tags, url |
| `Section` | title, subtitle, content_type (playlist/video/channel), ordered items |
| `Bookmark` | user (FK), GenericFK → Playlist/Video/Channel |
| `UserPreference` | user, fields M2M, level (beginner/intermediate/advanced) |

## Content Rules
- Courses/channels are added manually via Django admin by providing a YouTube URL/ID
- On save → automatically fetch data from **YouTube Data API v3** (title, thumbnail, video count, subscribers, etc.)
- Periodic sync to keep data fresh
- Bookmarks: authenticated users only

## Recommendations Logic (in progress)
- User fills onboarding quiz (field of interest: Building Websites, AI, etc.)
- User takes assessment test → gets skill level + strengths/weaknesses
- Homepage sections are dynamic: weaknesses → "To improve your X skills" carousels
- "Courses that may be of interest" → based on user's field

## API Conventions
- Base: `/api/`
- Auth endpoints: `/api/auth/register/`, `/api/auth/login/`
- Profile: `/api/profile/`
- Pagination: `page` + `page_size` query params
- Section items limited (10–20) for homepage carousels

## Key Decisions
- YouTube Data API v3 (official, not scraping)
- Sections on homepage are dynamic per user (not static admin-defined)
- Assessment/quiz details TBD (questions in DB, fixed set)
