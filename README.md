# Simple RESTful Posts App (Beginner-friendly)

This is a small learning project that demonstrates how to build a REST-style web app using Node.js, Express, and EJS templates. It's intentionally simple so you can read and understand each part.

---

## What you will learn
- How to create routes for common CRUD actions (Create, Read, Update, Delete)
- How to render HTML using EJS templates
- How to submit HTML forms and parse form data on the server
- How to simulate HTTP methods (PATCH, DELETE) in HTML forms using `method-override`

---

## Prerequisites
- Node.js (use the latest LTS version) — https://nodejs.org/
- Basic JavaScript and HTML knowledge will help.

---

## Install
1. Open a terminal in the project folder
2. Run:

```bash
npm install
```

This will install the dependencies listed in `package.json`: `express`, `ejs`, `uuid`, and `method-override`.

If you like automatic restarts during development, you can install `nodemon` globally:

```bash
npm install -g nodemon
```

---

## Run the app

Start the server (option 1):

```bash
node index.js
```

Or (option 2) if you have `nodemon` installed:

```bash
nodemon .\index.js
```

Open http://localhost:3000/posts in your browser.

---

## Project structure (files you will work with)
- `index.js` — main server file that defines routes and logic.
- `package.json` — project metadata and dependencies.
- `views/` — EJS templates:
  - `index.ejs` — list all posts
  - `new.ejs` — form to create a new post
  - `showpost.ejs` — show a single post in detail
  - `edit.ejs` — form to edit an existing post
- `public/style.css` — simple styles (served as static assets)

---

## How the app works (simple overview)
- The app stores posts in memory in the `posts` array in `index.js`. Each post has an `id`, `username`, and `content`.
- Routes:
  - `GET /posts` — list all posts
  - `GET /posts/new` — return a form to create a post
  - `POST /posts` — receive form data and create a post
  - `GET /posts/:id` — show a single post
  - `GET /posts/:id/edit` — return an edit form for a post
  - `PATCH /posts/:id` — update a post's content
  - `DELETE /posts/:id` — delete a post

Note: HTML forms only support `GET` and `POST`. This app uses the `method-override` package so forms can pretend to be `PATCH` or `DELETE` by adding `?_method=PATCH` or `?_method=DELETE` to the form action URL.

---

## Important notes for beginners
- Data is stored in memory (the `posts` array). When you stop the server, all posts are lost. To persist data, you can add a database (for example, MongoDB with Mongoose).
- Errors are not handled in detail in this simple example. Consider adding validation and error pages as your next step.

---

## Tips for making changes
- To add a new field to posts (for example, `title`):
  1. Add the field to forms in `new.ejs` and `edit.ejs` (add `name="title"`).
  2. Read it from `req.body.title` in `index.js` where posts are created or updated.
  3. Update templates to display the new field.

---

## Next steps (ideas to try)
- Wire up a database (MongoDB) and replace the memory array with real persistence.
- Add input validation so users can't submit empty posts.
- Add user authentication so only the post author can edit/delete their posts.
- Write tests for the routes using a test framework (Jest, Mocha)

---

If you want, I can help you take any of the next steps above — tell me which one you'd like and I'll add a plan and implementation.
