const router = require ("express").Router();

router.get("/usertest", (req,res)=>{
	res.send("Test User OK")
});

router.post("/userPostTest", (req, res)=>{
const username = req.body.username;
console.log(username);
res.send("Le POST fonctionne et je mappelle" + username)
});

module.exports = router