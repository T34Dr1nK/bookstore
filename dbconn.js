const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: "bookstore"
})

module.exports = connection;