const router = require("express").Router();
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwtGeneratorstaff = require("../utils/jwtGeneratorstaff");
const jwtGeneratorclient = require("../utils/jwtGeneratorclient");
module.exports = router;
const pool = require("../db");
const authorizationclient = require("../middleware/authorizationclient");
const authorizationstaff = require("../middleware/authorizationstaff");


router.post("/register",async(req,res) => {
    const { username, password } = req.body;
    try {
      const user = await pool.query("SELECT * FROM client WHERE username = $1", 
      [username]);

      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }
  
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      let newUser = await pool.query(
        "INSERT INTO client (username, password) VALUES ($1, $2) RETURNING *",
        [username, bcryptPassword]);
      
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/login/client", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM client WHERE username = $1", 
      [
        username
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("false");
      }
      //const jwtToken = jwtGeneratorclient(user.rows[0].username);
      //res.json({jwtToken});
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      console.log(validPassword);
      if(!validPassword){
        //console.log("1");
        return res.status(401).json("email or password are incorrect");
      }
      else{
        //console.log("2");
        const jwtToken = jwtGeneratorclient(user.rows[0].username);
        return res.json({ jwtToken });
      }
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/login/clientstaff", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM client WHERE username = $1", 
      [
        username
      ]);
     
     
      if (user.rows.length !== 0) {
        return res.json(true);
      }
    
      return res.json(false);
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/login/staff", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM staff WHERE username = $1", 
      [
        username
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("false");
      }
      //const jwtToken = jwtGeneratorstaff(user.rows[0].username);
      //res.json({jwtToken});
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      console.log(validPassword);
      if(!validPassword){
        console.log("1");
        return res.status(401).json("email or password are incorrect");
      }
      else{
        //console.log("2");
        const jwtToken = jwtGeneratorstaff(user.rows[0].username);
        return res.json({ jwtToken });
      }
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  router.get("/verify/client",authorizationclient,
  async(req,res) => {
    try{
      
        res.json(true);
      

    }catch(err){
      
      res.json(false);

    }
  });

  router.get("/verify/staff",authorizationstaff,
  async(req,res) => {
    try{
      res.json(true);
    }catch(err){
      
      res.json("1");

    }
  });

  
module.exports = router;
  