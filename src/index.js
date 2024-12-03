import express from "express";
import pool from "./db.js";
import { PORT } from "./config.js";
import booksRoutes from "./routes/books.routes.js";

const app = express();

app.use(express.json());

app.use("/books", booksRoutes);

app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE books (id SERIAL PRIMARY KEY, title VARCHAR(100), year SMALLINT)"
    );
    res.status(200).send({
      message: "Table created successfully"
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
