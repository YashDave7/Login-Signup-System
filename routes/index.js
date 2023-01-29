const express = require('express');
const router = express.Router();

// WELCOME PAGE.
router.get('/', (req, res) => {
    res.render('welcome');  // SERVING Welcome.ejs
});

module.exports = router;