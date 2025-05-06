# Rick and Morty Monorepo

This monorepo contains a fullstack application that displays characters from the Rick and Morty universe. The backend fetches data from the public Rick and Morty API, stores it in a PostgreSQL database, and exposes a GraphQL API. The frontend consumes this API to display and filter characters.

## 📁 Project Structure

```
apps/
  backend/        # Node.js + Express + Redis + GraphQL backend
  frontend/       # React + TailwindCSS frontend
```

## 🚀 Getting Started

### 1. Install dependencies

From the root of the monorepo:

```bash
yarn install
```

### 2. Environment setup

#### Backend

Inside `apps/backend`, create a `.env` file or configure your environment variables as follows:

```env
PORT=4000
RAM_API_URL=https://rickandmortyapi.com/api/character

# DB settings
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

Ensure your PostgreSQL and Redis servers are running locally.
NOTE: You have to create your own local database in order to store Rick and Morty characters. You must run script 'yarn seed'
inside `apps/backend` to do it.

### 3. Run the applications

#### BOTH (backend + frontend)

Run both apps at the same time is HIGHLY recommended. Since this monorepo is leverage by Turbo, you just need to execute

```bash
yarn dev
```

on the monorepo root folder.

This starts the backend server at:  
👉 `http://localhost:4000/graphql`

This starts the frontend at:  
👉 `http://localhost:3000`

#### Backend

From `apps/backend`:

```bash
yarn dev
```

This starts the backend server at:  
👉 `http://localhost:4000/graphql`

#### Frontend

From `apps/frontend`:

```bash
yarn dev
```

This starts the frontend at:  
👉 `http://localhost:3000`

## 🔄 Scheduled Updates

A script runs every 12 hours to fetch updated data from the Rick and Morty API and update the database. You can also run it manually:

```bash
cd apps/backend
yarn update:characters
```

## 🧠 Interacting with the GraphQL API

Open your browser or a tool like [GraphQL Playground](https://github.com/graphql/graphql-playground) and navigate to:

```
http://localhost:4000/graphql
```

### Sample Queries

#### Fetch all characters

```graphql
query {
  characters {
    id
    name
    status
    species
    gender
    origin
  }
}
```

#### Filter characters

```graphql
query {
  filterCharacters(filters: { name: "Rick", status: "Alive" }) {
    id
    name
    status
    origin
  }
}
```

## ✅ Scripts

From `apps/backend`:

- `yarn dev`: Start development server
- `yarn update:characters`: Manually trigger character update

## 🛠 Technologies Used

- Node.js, Express, Apollo Server
- GraphQL, Sequelize, PostgreSQL
- Redis (for caching)
- React
- TypeScript
- Yarn workspaces
