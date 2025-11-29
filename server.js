// terminal > npm install express cors > npm init -y

// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// middleware: lets us read JSON from requests
app.use(cors());
app.use(express.json());

// example route
app.get("/", (req, res) => {
  res.send("Server is running FULL STEAM AHEAD !");
});

// tell the server to start
app.listen(PORT, () =>
  console.log(`Server running FLASHILY on http://localhost:${PORT}`)
);

// terminal > node server.js
