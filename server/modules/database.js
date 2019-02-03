/**
 * Functions to initate the MySQL Database connection and to return the database to any other module.
 * 
 * @author Markus Macher
 */
const cfg = require('../config/config_db')
const mysql = require('mysql');

let _db;

let initDb = new Promise((resolve, reject) => {
    _db = mysql.createConnection({
        host: cfg.database.host,
        user: cfg.database.user,
        password: cfg.database.password,
        database: cfg.database.db
    });
    _db.connect((err) => {
        if (err) {
            reject(console.log(err));
        } else {
            resolve(console.log('Database is connected.'));
        }
    });
});

function getDb() {
    if (!_db) {
        console.log('Database has not been initialized. Please call init first.');
        return;
    } else {
        return _db;
    }
}

module.exports = {
    getDb,
    initDb
};