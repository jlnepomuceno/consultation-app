const conn = require("./db");

function CreateUser (username, name, password) {
    let query = `INSERT INTO user_accounts (username, name`;
    if (password !== "") {
       query = `${query}, password)` 
    } else query = `${query})`

    query = `${query} VALUES (${username}, "${name}"`;
    if (password !== "") {
       query = `${query}, ${password})` 
    } else query = `${query})`
 
    conn.query(query, (err, res) => {
        if (err) throw new Error(err);
        else {
            return res;
        }
    });
}

function GetUsers () {
    conn.query("SELECT * FROM user_accounts", (err, res, fields) => {
        if (err) throw new Error(err);
        else {
            return res;
        }
    });
}

function GetUser (username) {
    conn.query(`SELECT * FROM user_accounts WHERE username="${username}"`, (err, res, fields) => {
        if (err) throw new Error(err);
        else {
            return resolve(res);
        }
    });
}

module.exports = {GetUser, GetUsers, CreateUser};