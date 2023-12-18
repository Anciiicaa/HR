const router = require('express').Router();
const authService = require('../services/authService');
const { pool } = require('../conn/config');


router.post('/register',async(req,res)=>{
    res.send(await authService.saveUser(req.body));
})

router.post('/login',async (req,res)=>{
    var result = await authService.login(req.body);
    if(result)
        res.send(result);
    else
        res.status(401).send("Unauthorized");
})


module.exports = router;