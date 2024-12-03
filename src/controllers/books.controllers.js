import pool from "../db.js";

export const getBooks = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM books"
    );
    return res.status(200).json({
    data: rows
  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }
  
    return res.status(200).json({
      data: rows[0]
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const createBook = async (req, res) => {
  const { title, year } = req.body;

  try {
    const { rows } = await pool.query(
      "INSERT INTO books (title, year) VALUES ($1, $2) RETURNING *",
      [title, year]
    );

    res.status(200).json({
      message: "Book created successfully",
      data: rows[0]
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, year } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE books SET title = $1, year = $2 WHERE id = $3 RETURNING *",
      [title, year, id]
    );

    res.status(200).json({
      message: "Book updated successfully",
      data: rows[0]
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }
  
    res.status(200).json({
      message: "Book deleted successfully",
      data: rows[0]
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
