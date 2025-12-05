// initial setup
import { books } from "../data/books.js";
import {
  BookSchema,
  BookUpdateSchema,
  IdSchema,
} from "../schemas/bookSchemas.js";

// CRUD - CREATE
export function createBook(req, res) {
  // validate data
  const parseResult = BookSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
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
  res.status(200).json(newBook);
}

// CRUD - READ
export function getBook(req, res) {
  res.status(200).json(books);
}

// CRUD - UPDATE
export function updateBook(req, res) {
  const { id } = req.params;

  // validate data
  const parseResult = BookUpdateSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      error: "Invalid update data",
      details: parseResult.error.flatten(),
    });
  }

  // locate data
  const bookIndex = books.findIndex((b) => b.id === Number(id));

  // guard clause
  if (bookIndex === -1) {
    return res.status(404).json({
      error: "No books found",
    });
  }

  // merge changes
  const updateBook = {
    ...books[bookIndex],
    ...parseResult.data,
  };

  books[bookIndex] = updateBook;

  // response
  res.status(200).json(updateBook);
}

// CRUD - DELETE
export function deleteBook(req, res) {
  // validate data
  const parseResult = IdSchema.safeParse(req.params);

  if (!parseResult.success) {
    return res.status(400).json({
      error: "Invalid ID parameter",
      details: parseResult.error.flatten(),
    });
  }

  const { id } = req.params;

  // locate data
  const bookIndex = books.findIndex((b) => b.id === Number(id));

  if (bookIndex === -1) {
    return res.status(404).json({
      error: "No books found",
    });
  }

  // delete data
  const deleteBook = books[bookIndex];
  books.splice(bookIndex, 1);

  // response
  res.status(200).json({
    message: "Successfully deleted",
    removed: deleteBook,
  });
}
