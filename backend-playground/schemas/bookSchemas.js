// initial setup
import { z } from "zod";

// schemas
export const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  book: z.string().min(1, "Book is required"),
});

export const BookUpdateSchema = BookSchema.partial();

export const IdSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a positive number"),
});
