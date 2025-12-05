// initial setup
import express from "express";
import {
  createBook,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/booksController.js";

const router = express.Router();

// endpoint setup
// CRUD - 1. Create
router.post("/", createBook);

// CRUD - 2. Read
router.get("/", getBook);

// CRUD - 3. Update
router.patch("/:id", updateBook);

// CRUD - 4. Delete
router.delete("/:id", deleteBook);

export default router;
