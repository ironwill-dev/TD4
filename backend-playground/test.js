// initial setup
import express from "express";
import cors from "cors";
import { books } from "./data/books.js";

const app = express();
const PORT = 5001;

// middleware setup
app.use(cors());
app.use(express.json());

// endpoint setup
// CRUD - 1. Create
app.post("/api/books", (req, res) => {
  const { title, book } = req.body;

  // guard clause
  if (!title || !book) {
    return res.json({
      error: "Title and book are required",
    });
  }

  // creation segment
  const newBook = {
    id: Date.now(),
    title,
    book,
  };

  books.push(newBook);

  // response
  res.json(newBook);
});

// CRUD - 2. Read
app.get("/api/books", (req, res) => {
  res.json(books);
});

// CRUD - 3. Update
app.patch("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // locate data
  const bookIndex = books.findIndex((b) => b.id === Number(id));

  // guard clause
  if (bookIndex === -1) {
    return res.json({
      error: "No books found",
    });
  }

  // merge changes
  const updatedBook = {
    ...books[bookIndex],
    ...updates,
  };

  books[bookIndex] = updatedBook;

  // response
  res.json(updatedBook);
});

// CRUD - 4. Delete
app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;

  // locate data
  const bookIndex = books.findIndex((b) => b.id === Number(id));

  // guard clause
  if (bookIndex === -1) {
    return res.json({
      error: "No books found",
    });
  }

  // delete data
  const deletedBook = books[bookIndex];
  books.splice(bookIndex, 1);

  // response
  res.json(deletedBook);
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
