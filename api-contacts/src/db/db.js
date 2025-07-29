'use strict';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.sqlite');

// Creamos una tabla de contactos

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contacts 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        firstName TEXT,
        lastName TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        zipCode TEXT,
        country TEXT,
        createdAt Date,
        updatedAt Date
    )`);
})


module.exports = db;