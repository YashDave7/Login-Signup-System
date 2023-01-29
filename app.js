const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mysql = require('mysql');

const app = express();

// EJS.
app.use(expressLayouts);
app.set('view engine','ejs');

// BodyParser.
app.use(express.urlencoded( {extended: false} ));

const PORT = process.env.PORT || 5000;

// ROUTES.
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


// Creating connection.
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "login-system",
    password: ""
});

// Connecting to DB.
db.connect( (err)=>{
    // if(err) throw err;
    console.log('Database connected');
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});