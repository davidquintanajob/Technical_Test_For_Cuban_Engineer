# Task Manager App

This project is a modern task manager built with Nuxt 3 and Vue 3.

## Features
- Add, list, and delete tasks using a REST API
- Smart text processing (mentions, tags, emails, URLs)
- Responsive and modern interface with TailwindCSS
- SEO configured globally and per page
- Unit testing with Vitest

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```
3. Create a `.env` file in the root with your backend URL:
   ```env
   NUXT_PUBLIC_BACKEND_HOST=http://localhost:4000
   ```

## Main commands

- Start the development server:
  ```bash
  yarn dev
  # or
  npm run dev
  ```
- Run unit tests:
  ```bash
  yarn test
  # or
  npm run test
  ```
- Build the app for production:
  ```bash
  yarn build
  # or
  npm run build
  ```

## Environment variables

- `NUXT_PUBLIC_BACKEND_HOST`: Base URL of the backend API (example: `http://localhost:4000`)

## Project structure

- `pages/` — Main app views
- `components/` — Reusable Vue components
- `Functions/` — Business logic and API services
- `tests/` — Unit tests (Vitest)

## Unit testing

- Tests are in the `tests/` folder.
- Uses [Vitest](https://vitest.dev/) and [Vue Test Utils](https://test-utils.vuejs.org/).
- Example test:
  ```js
  import { procesarTexto } from '../Functions/textProcessing.js'
  import { describe, it, expect } from 'vitest'
  describe('procesarTexto', () => {
    it('detects mentions', () => {
      const partes = procesarTexto('@admin hola', false)
      expect(partes[0].tipo).toBe('mencion')
    })
  })
  ```

## SEO

- Global configuration in `nuxt.config.ts` (title, description, og:title, og:description, favicon)
- Page-specific configuration using `definePageMeta`

## API

- **GET** `/api/tasks` — Lists all tasks
- **POST** `/api/tasks` — Creates a task (body: `{ text: "..." }`)
- **DELETE** `/api/tasks/{id}` — Deletes a task by id

