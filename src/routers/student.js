const express= require('express');
// 1. create a new router
const router = new express.Router();

// 2. we need to define the router
router.get('/class', (req,res) =>{
    res.send('Hello Class Welcome');
})


module.exports = router;