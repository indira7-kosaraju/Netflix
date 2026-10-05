# Netflix Clone

A full-stack Netflix-style streaming web app built with a **React (Vite)** frontend and a **Spring Boot + MySQL** backend. Users can create an account, log in, browse movies and TV shows, search the catalog, view title details, and save titles to their personal list.

## Features

### Frontend
- **Home page** with a hero banner and horizontally scrolling rows by category (Trending, Top Rated, Popular, Recently Added, Action, Comedy, Drama, Horror, Sci-Fi)
- **Movies** and **TV Shows** pages that filter the catalog by type
- **Search** by title or genre, with a "no results" state
- **Movie details** page for each title (rating, year, genres, duration, description)
- **Preview player** modal (placeholder until a video service is connected)
- **My List**: add or remove titles; the list is saved in `localStorage` so it survives page reloads
- **Register and Login** connected to the Spring Boot backend through Axios
- **Protected routes**: My List and Profile are only available to logged-in users
- **Profile page** showing account info, how many titles are saved, and a logout button
- Shared layout with a Navbar and Footer, plus a responsive dark Netflix-style UI

### Backend (`netflix-backend/`)
- REST API built with Spring Boot, Spring Web MVC and Spring Data JPA
- `User` entity stored in a MySQL `users` table (id, name, email, password, bio)
- Layered structure: **Controller → Service → Repository → Entity**
- User registration, login, list all users, and get a user by id
- CORS enabled for the Vite dev server (`localhost:5173` / `5174`)
- Database password read from the `DB_PASSWORD` environment variable rather than hard-coded

## Tech Stack

| Layer    | Technologies |
|----------|--------------|
| Frontend | React 19, Vite, React Router, Axios, Lucide React icons, CSS |
| Backend  | Java 17, Spring Boot, Spring Data JPA, Hibernate, Maven |
| Database | MySQL |

## Project Structure

```
netflix-clone/
├── src/                      # React frontend
│   ├── components/           # Navbar, Hero, MovieRow, MovieCard, SearchBar, VideoModal, ProtectedRoute...
│   ├── context/              # AuthContext (login/register/logout), ListContext (My List)
│   ├── data/movies.js        # Movie and TV show catalog
│   ├── pages/                # Home, Movies, TVShows, Search, MovieDetails, MyList, Profile, Login, Register
│   └── services/api.js       # Axios client for the backend API
└── netflix-backend/          # Spring Boot backend
    └── src/main/java/com/backend/netflixbackend/
        ├── controller/UserController.java
        ├── service/UserService.java
        ├── repository/UserRepository.java
        └── entity/User.java
```

## API Endpoints

Base URL: `http://localhost:8080/api`

| Method | Endpoint            | Description                         |
|--------|---------------------|-------------------------------------|
| POST   | `/users`            | Register a new user                 |
| POST   | `/users/login`      | Log in with email and password      |
| GET    | `/users`            | Get all users                       |
| GET    | `/users/{id}`       | Get a user by id                    |

Example login request:

```json
POST /api/users/login
{ "email": "user@example.com", "password": "secret" }
```

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- MySQL running locally

### 1. Database
Create the database (tables are created automatically by Hibernate):

```sql
CREATE DATABASE connecthub;
```

### 2. Backend

```bash
cd netflix-backend
export DB_PASSWORD=your_mysql_password
./mvnw spring-boot:run
```

The API runs on `http://localhost:8080`.

### 3. Frontend

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Future Improvements
- Hash passwords (e.g. BCrypt) and use JWT authentication
- Store movies and My List in the database instead of on the frontend
- Connect a real video streaming service to the player
- Add profile editing (name, bio)
