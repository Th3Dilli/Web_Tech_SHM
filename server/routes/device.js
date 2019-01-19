const express = require("express");
const router = express.Router();
const checkAuth = require('../check_auth')
const getDb = require('../controller').getDb
const _db = getDb();

router.get('/all', checkAuth, (req, res) => {   
	let query = "SELECT * FROM device";
	
    _db.query(query, (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		} else{
			res.status(200).json(results);
		}
	});
});

router.get('/detail/:id', checkAuth, (req, res) => {   
	
	let id = req.params.id;
	let query = "SELECT * FROM device where id=?";

    _db.query(query, [id], (error, results) => {
		if (error) {
			res.status(400).json({message: "Error"});
		}else if(results.length < 1){
			res.status(404).json({
                message: "Device not found"
            });
		}else{
			res.status(200).json(results);
		}
	});
});




module.exports = router;
