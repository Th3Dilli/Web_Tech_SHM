const getDb = require('./controller').getDb;

module.exports = (req, res, next) => {

    const db = getDb();
    if(req.headers.authorization === undefined){
        res.status(400).json({message: "Kein token"});
    }  else {

    let token = req.headers.authorization;
    let query = "SELECT token from users WHERE token = ?";

    db.query(query, [token], (error, results) => {
        if(error){
            res.status(400).json({message: "Fehler"});
        } else if (results.length < 1){
            res.status(401).json({message: "Nicht berechtigt"});

        } else { 
        next();
        }
        });
    }  
};