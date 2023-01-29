const { decodeBase64 } = require('bcryptjs');
const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();
const mysql = require('mysql');

// Creating connection.
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "login-system",
    password: ""
});

// Connecting to DB.
db.connect((err) => {
    // if(err) throw err;
    console.log('Database connected');
});

// Login Page.
router.get('/login', (req, res) => {
    res.render('login');    // SERVING login.ejs
});

// Register Page.
router.get('/register', (req, res) => {
    res.render('register'); // SERVING register.ejs
});

// Register Handle.
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check require fields.
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match.
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length.
    if (password.length < 6) {
        errors.push({ msg: 'Passwords should be atleast 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else {
        res.render('dashboard');
        data = req.body;
        insert = 'INSERT INTO signup SET ?';
        db.query(insert, data, (err, res) => {
            if (err) throw err;
            console.log('New registration!!!');
        });
    }

});

// LOGIN HANDLE.
router.post('/login', (req, res) => {
    const {email, password} = req.body;
    let errors2 = [];

    // Check require fields.
    
    select = `Select password from signup where email= '${req.body.email}'`;
    naame = `Select name from signup where email= '${req.body.email}'`;
    db.query(naame, (err, result) => {
        let nammme = result;
    });
    db.query(select, (err, result) => {
        console.log(result);
        console.log('Entered Password = ' ,req.body.password);

        if ( !email || !password ) {
            errors2.push({ msg: 'Please fill in all fields' });
        }
        else if(JSON.stringify(result) === '[]') {
            console.log("hello");
            errors2.push({ msg: 'User not found' });
        }
        else if(result[0].password != req.body.password) {
            errors2.push({ msg: 'Incorrect Password' });
        }
        
        if (errors2.length > 0) {
            res.render('login', {
                errors2,
                email,
                password,
            });
        }
        else {
            getName = `SELECT name FROM signup WHERE email = '${req.body.email}'`;
            db.query(getName, (err, resultt) => {
                console.log();
                res.render('dashboard', {
                    resultt
                });    // SERVING LOGIN.EJS
            });

        }
    });
});

module.exports = router;