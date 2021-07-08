const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fileUpload = require('express-fileupload');

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(fileUpload());

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { sonumber, awh, qty, weight, length, width, height, companyname } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO test (SOnumber, awh, qty, weight, length, width, height, companyname) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [sonumber, awh, qty, weight, length, width, height, companyname]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM test");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM test WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { sonumber, weight, width, length, height, qty, awh, companyname } = req.body;
    const updateTodo = await pool.query(
      "UPDATE test SET SOnumber = $1, awh = $2, qty = $3, weight = $4, length = $5,  width = $6, height = $7, companyname = $8 WHERE todo_id = $9",
      [sonumber, awh, qty, weight, length, width, height, companyname, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM test WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

// Upload Endpoint
/*app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
*/
app.listen(5000, () => {
  console.log("server has started on port 5000");
});