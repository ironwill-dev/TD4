// initial setup
import express from "express";
import cors from "cors";
import { books } from "./data/books.js";
import { z } from "zod";

const app = express();
const PORT = 5001;

// middleware setup
app.use(cors());
app.use(express.json());

// schemas
const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  book: z.string().min(1, "Book is required"),
});

const BookUpdateSchema = BookSchema.partial();

const IdSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a positive number"),
});

// endpoint setup
// CRUD - 1. Create
app.post("/api/books", (req, res) => {
  // validate data
  const parseResult = BookSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.json({
      error: "Invalid data",
      details: parseResult.error.flatten(),
    });
  }

  const { title, book } = parseResult.data;

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

  // validate data
  const parseResult = BookUpdateSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.json({
      error: "Invalid update data",
      details: parseResult.error.flatten(),
    });
  }

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
    ...parseResult.data,
  };

  books[bookIndex] = updatedBook;

  // response
  res.json(updatedBook);
});

// CRUD - 4. Delete
app.delete("/api/books/:id", (req, res) => {
  // validate data
  const parseResult = IdSchema.safeParse(req.params);

  if (!parseResult.success) {
    return res.json({
      error: "Invalid ID parameter",
      details: parseResult.error.flatten(),
    });
  }

  const { id } = req.params;

  // locate data
  const bookIndex = books.findIndex((b) => b.id === Number(id));

  if (bookIndex === -1) {
    return res.json({
      error: "No books found",
    });
  }

  // delete data
  const deletedBook = books[bookIndex];
  books.splice(bookIndex, 1);

  // response
  res.json({
    message: "Successfully deleted",
    removed: deletedBook,
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
