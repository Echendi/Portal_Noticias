const express = require('express');
const router = express.Router();
const db = require('../util/database');

router.get('/login', (req, res) => {
    res.send('Hello, login');
});


module.exports = router;