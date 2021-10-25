const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    console.log('You are in the authors router');
    next();
});

router.get('/', (req, res) => {
    res.send("You will get all the authors in this route");
});


module.exports = router;
