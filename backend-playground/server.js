// initial setup
import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.js";

const app = express();
const PORT = 5001;

// middleware setup
app.use(cors());
app.use(express.json());
app.use("/api/books", booksRouter);

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
