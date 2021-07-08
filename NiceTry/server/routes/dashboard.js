const router = require("express").Router();
const authorizationclient = require("../middleware/authorizationclient");
const pool = require("../db");

//all todos and name

router.get("/", authorizationclient, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM client WHERE username = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});
module.exports = router;