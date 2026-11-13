# DataPollex LMS — Backend API

REST API for the DataPollex Learning Management System (LMS). It powers the student-facing course catalogue and the protected admin dashboard.

- **Frontend:** [https://data-pollex-lms.vercel.app/](https://data-pollex-lms.vercel.app/)
- **Live API:** [https://data-polles-lms-server.vercel.app](https://data-polles-lms-server.vercel.app)
- **Health check:** [https://data-polles-lms-server.vercel.app/api/health](https://data-polles-lms-server.vercel.app/api/health)
- **Frontend documentation:** [`../client/README.md`](../client/README.md)

---

## What is this project?

DataPollex LMS is a simplified Learning Management System built for the DataPollex industrial training recruitment task. This repository contains the backend: an Express + TypeScript API backed by MongoDB.

The API stores courses and lectures in MongoDB and exposes:

- Public read-only endpoints for students (course list, course details, lectures).
- Admin-only endpoints for managing courses and lectures.
- Better Auth email/password authentication with `user` and `admin` roles.
- Statistics for the admin dashboard.

The backend follows a basic MVC structure with separate routes, controllers, and models.

---

## Why this project?

The goal is to demonstrate practical full-stack backend skills:

- Designing a modular Express application with a clear MVC layout.
- Persisting real data in MongoDB instead of hardcoded frontend content.
- Implementing full CRUD for courses and lecture management.
- Protecting management routes with session-based admin authentication.
- Validating input and returning consistent errors and API responses.
- Deploying an Express API as a Vercel serverless function.

---

## Features

### Public / student API

- List all courses, newest first, including a computed `lectureCount`.
- Fetch a single course by ID.
- Fetch all lectures belonging to a course, oldest first.
- Fetch a single lecture by ID.
- Consistent JSON response envelope for every endpoint.

### Admin API (protected)

- Dashboard overview: total courses, total lectures, total students, and the five most recent courses.
- Create a course with title, description, price, and thumbnail URL.
- Update any subset of course fields.
- Delete a course and automatically delete all of its lectures.
- Add a lecture to a course with title, description, and video URL.
- Delete a lecture from a course.
- Admin-only access enforced by the `requireAdmin` middleware.

### Platform concerns

- Email/password registration and login using Better Auth.
- Session cookies with `user.role` stored as `user` or `admin`.
- CORS restricted to `CLIENT_URL` with credentials enabled.
- Zod request validation for course and lecture payloads.
- Centralized error handling, MongoDB validation error mapping, and 404 handling.
- TypeScript strict mode with `typecheck` and production build scripts.
- Database seed script with 6 courses and 12 lectures.
- Vercel serverless entry point.

---

## Technology

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| Language | TypeScript (strict, ESM) |
| Web framework | Express 5 |
| Database | MongoDB |
| ODM | Mongoose 9 |
| Authentication | Better Auth + `@better-auth/mongo-adapter` |
| Validation | Zod |
| Dev runner | tsx |
| Deployment | Vercel (`@vercel/node`) |
| HTTP utilities | cors, dotenv |

---

## Project structure

```text
server/
├── api/
│   └── index.ts                  # Vercel serverless entry point
├── src/
│   ├── app.ts                    # Express app, CORS, routes, middleware
│   ├── server.ts                 # Local HTTP server and graceful shutdown
│   ├── seed.ts                   # Database seed script
│   ├── config/
│   │   ├── db.ts                 # Mongoose connection cache / state
│   │   └── env.ts                # Environment variable loading and validation
│   ├── controllers/
│   │   ├── admin.controller.ts         # Dashboard overview
│   │   ├── admin-course.controller.ts  # Course create / update / delete
│   │   ├── admin-lecture.controller.ts # Lecture create / delete
│   │   ├── course.controller.ts        # Public course reads
│   │   └── lecture.controller.ts       # Public lecture read
│   ├── data/
│   │   └── seed-data.ts          # Seed courses and lectures
│   ├── lib/
│   │   └── auth.ts               # Better Auth configuration
│   ├── middleware/
│   │   ├── admin.middleware.ts   # requireAdmin session + role guard
│   │   ├── error.middleware.ts   # Centralized error handler
│   │   └── notFound.middleware.ts
│   ├── models/
│   │   ├── course.model.ts
│   │   └── lecture.model.ts
│   ├── routes/
│   │   ├── admin.routes.ts
│   │   ├── course.routes.ts
│   │   └── lecture.routes.ts
│   └── utils/
│       ├── ApiError.ts
│       └── asyncHandler.ts
├── .env.example
├── package.json
├── tsconfig.json
└── vercel.json
```

### Data model

**Course**

| Field | Type | Rules |
| --- | --- | --- |
| `title` | String | Required, minimum 3 characters |
| `description` | String | Required, minimum 10 characters |
| `price` | Number | Required, minimum 0 |
| `thumbnailUrl` | String | Required, valid URL |
| `createdAt` / `updatedAt` | Date | Added automatically |

**Lecture**

| Field | Type | Rules |
| --- | --- | --- |
| `courseId` | ObjectId | Required, references `Course` |
| `title` | String | Required, minimum 3 characters |
| `description` | String | Required, minimum 10 characters |
| `videoUrl` | String | Required, valid URL |
| `createdAt` / `updatedAt` | Date | Added automatically |

Courses and lectures are stored in the `courses` and `lectures` collections.

---

## Run locally

### Prerequisites

- Node.js 20 or newer
- npm
- A MongoDB database (MongoDB Atlas or a local MongoDB server)

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Create the environment file

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/datapollex?retryWrites=true&w=majority
NODE_ENV=development
CLIENT_URL=http://localhost:5173
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:5000
```

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | API port. Defaults to `5000`. |
| `MONGODB_URI` | Yes | MongoDB connection string. |
| `NODE_ENV` | No | Defaults to `development`. |
| `CLIENT_URL` | No | Allowed CORS origin. Defaults to `http://localhost:5173`. |
| `BETTER_AUTH_SECRET` | Yes | Secret used to sign Better Auth sessions. Use a long random string. |
| `BETTER_AUTH_URL` | No | Public backend URL. Defaults to `http://localhost:<PORT>`. |

Generate a secret with Node:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` are required by `src/config/env.ts` but are not listed in the current `.env.example`. Add them manually.

> Better Auth connects to the `datapollex` database explicitly in `src/lib/auth.ts`. Keep the database name in `MONGODB_URI` as `datapollex` so courses, lectures, and auth users share the same database.

### 3. Seed the database

```bash
npm run seed
```

This deletes all existing courses and lectures, then inserts 6 courses and 12 lectures. The seed does **not** create an admin user.

### 4. Start the development server

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

Verify it:

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Backend is running",
  "database": "connected"
}
```

### 5. Create an admin account

There is no seeded admin. Create one in two steps:

1. Register a normal account from the frontend at `/register` (or call the Better Auth sign-up endpoint).
2. Promote the user to `admin` in MongoDB:

```bash
mongosh "<MONGODB_URI>"
```

```js
use datapollex
db.user.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Sign out and sign in again so the session picks up the new role. Admin pages require `session.user.role === "admin"`.

### 6. Production build

```bash
npm run typecheck
npm run build
npm start
```

### Available scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `tsx watch src/server.ts` | Start with hot reload |
| `npm run build` | `tsc` | Compile TypeScript to `dist/` |
| `npm start` | `node dist/server.js` | Run the compiled server |
| `npm run typecheck` | `tsc --noEmit` | Type-check without emitting files |
| `npm run seed` | `tsx src/seed.ts` | Reset and seed courses and lectures |

---

## Live deployment

- Frontend: [https://data-pollex-lms.vercel.app/](https://data-pollex-lms.vercel.app/)
- API: [https://data-polles-lms-server.vercel.app](https://data-polles-lms-server.vercel.app)
- Health: [https://data-polles-lms-server.vercel.app/api/health](https://data-polles-lms-server.vercel.app/api/health)

### Deploying to Vercel

`vercel.json` routes every request to `api/index.ts`, which is wrapped by `@vercel/node`. The handler connects to MongoDB and forwards the request to the Express app.

Set these environment variables in the Vercel project:

```env
MONGODB_URI=...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=https://your-backend.vercel.app
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

The frontend rewrites its `/api/*` requests to this backend, so both applications can share the same origin from the browser's perspective.

---

## How the API works

### Base URLs

| Environment | Base URL |
| --- | --- |
| Local | `http://localhost:5000/api` |
| Live | `https://data-polles-lms-server.vercel.app/api` |

Better Auth endpoints are mounted at `/api/auth/*`. They must run before `express.json()`, because Better Auth handles its own request body parsing.

### Authentication flow

1. The frontend calls `POST /api/auth/sign-up/email` to register.
2. The frontend calls `POST /api/auth/sign-in/email` to log in.
3. Better Auth sets an HTTP-only session cookie. The frontend sends it with `credentials: "include"`.
4. `/api/admin/*` requests pass through `requireAdmin`.
5. `requireAdmin` reads the session via `auth.api.getSession()` and checks `session.user.role === "admin"`.
6. Missing session returns `401`; a non-admin session returns `403`.

### Response format

Successful responses:

```json
{
  "success": true,
  "message": "Courses fetched successfully",
  "data": []
}
```

Error responses:

```json
{
  "success": false,
  "message": "Course not found"
}
```

In development, errors may also include a `stack` field.

### Endpoints

#### Public

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Basic backend status |
| `GET` | `/api/health` | Backend and database connection state |
| `ALL` | `/api/auth/*` | Better Auth handler |
| `GET` | `/api/courses` | List all courses with `lectureCount` |
| `GET` | `/api/courses/:courseId` | Get one course |
| `GET` | `/api/courses/:courseId/lectures` | List lectures for a course |
| `GET` | `/api/lectures/:lectureId` | Get one lecture |

#### Admin (session + `role: "admin"` required)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/admin/overview` | Statistics and recent courses |
| `POST` | `/api/admin/courses` | Create a course |
| `PATCH` | `/api/admin/courses/:courseId` | Update a course |
| `DELETE` | `/api/admin/courses/:courseId` | Delete a course and its lectures |
| `POST` | `/api/admin/courses/:courseId/lectures` | Add a lecture to a course |
| `DELETE` | `/api/admin/courses/:courseId/lectures/:lectureId` | Delete a lecture |

### Request examples

**List courses**

```bash
curl http://localhost:5000/api/courses
```

**Log in and save the session cookie**

```bash
curl -i -X POST http://localhost:5000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-password"}' \
  -c cookies.txt
```

**Create a course**

```bash
curl -X POST http://localhost:5000/api/admin/courses \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Next.js Masterclass",
    "description": "Build production-ready applications with Next.js.",
    "price": 10000,
    "thumbnailUrl": "https://picsum.photos/seed/next/800/450"
  }'
```

**Add a lecture**

```bash
curl -X POST http://localhost:5000/api/admin/courses/<COURSE_ID>/lectures \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to Next.js",
    "description": "Understand the App Router and server components.",
    "videoUrl": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
  }'
```

**Delete a lecture**

```bash
curl -X DELETE \
  http://localhost:5000/api/admin/courses/<COURSE_ID>/lectures/<LECTURE_ID> \
  -b cookies.txt
```

### Status codes

| Code | Meaning |
| --- | --- |
| `200` | Request succeeded |
| `201` | Course or lecture created |
| `400` | Invalid ID, validation failure, or malformed request |
| `401` | Authentication required |
| `403` | Authenticated but not an admin |
| `404` | Route, course, or lecture not found |
| `500` | Internal server error |

### Request lifecycle

```text
Client request
   -> CORS (CLIENT_URL, credentials)
   -> Better Auth handler for /api/auth/*
   -> express.json()
   -> route -> requireAdmin (admin routes only)
   -> controller -> Zod validation -> Mongoose model -> MongoDB
   -> JSON response
   -> notFound / errorHandler on failure
```

---

## Known limitations

- There is no lecture update endpoint, so lectures can be created and deleted but not edited.
- The seed script creates courses and lectures only; there is no seeded admin account.
- Student registration exists, but enrollment, payments, PDF uploads, and progress tracking are intentionally out of scope.
- "Total students" counts Better Auth user documents whose role is `user`.

---

## Contributing

This project was built as a recruitment task. If you extend it, keep the MVC separation: add a route, put the logic in a controller, and keep database access in models.

## License

ISC
