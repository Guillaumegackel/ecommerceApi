const router = require ("express").Router();

router.get("/usertest", (req,res)=>{
	res.send("Test User OK")
});

router.post("/userPostTest", (req, res)=>{
const username = req.body.username;
console.log(username);
});

module.exports = router