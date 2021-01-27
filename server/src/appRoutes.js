const { json } = require("body-parser");
const express = require("express");
const db = require("./db");

const router = express.Router();

router.get('/check_cookie', async (req, res, next) => {
  try {
    const isLoggedIn = "User" in req.cookies;
    res.json({isLoggedIn});
  } catch(e) {
    console.error(e);
    res.sendStatus(500)
  } 
})

router.get('/users', async (req, res, next) => {
    try {
      const results = await db.all();
      res.json(results);
    } catch(e) {
      console.error(e);
      res.sendStatus(500)
    } 
})

router.get('/users/:username', async (req, res, next) => {
  try {
    const results = await db.oneByUsername(req.params.username);
    res.json(results);
  } catch(e) {
    console.error(e);
    res.sendStatus(500)
  } 
})

router.post('/login', async (req, res) => {
  try {
    const data = req.body;
    if ("User" in req.cookies) {
        // User is logged in 
        const user = await db.checkIfExists(data.id);
        if (user !== "undefined") {
            res.json(user); // TODO RETURN USER PLUS OTHER NEEDED INFO
        }
    } else {
        // Will create cookie, but first, check if username exists
        // Check if username exists
        let return_data = null;
        const user = await db.checkIfExists(data.id);

        let user_id = null;
        if (user !== undefined) {
            user_id = user.id;
            return_data = user; // TODO RETURN USER PLUS OTHER NEEDED INFO
        } else {
            const create_res = await db.createUser({
                username: data.id, 
                name: data.name, 
                password:""
            });
            user_id = create_res.id;
            return_data = user_id;  // TODO RETURN USER PLUS OTHER NEEDED INFO
        }

        res.status(202).cookie('User', user_id,{
            sameSite: true,
            path: '/',
            expires: new Date(new Date().getTime() + data.expiresIn * 1000),
            httpOnly: true
        }).json(return_data); // TODO add here anything you want to return with the login
    }
  } catch (e) {
      console.error(e);
      res.sendStatus(500);
  }

});

router.get('/logout/removeCookie', (req, res, next) => {
  try {
    res.status(202).clearCookie("User", { path: "/"}).send("cookie cleared");
  } catch (e) {
      console.error(e);
      res.sendStatus(500);
  }
});

module.exports = router;