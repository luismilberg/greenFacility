require('dotenv').config({
    path: 'variables.env'
});
require('./config/db');
require('./config/passport');
const passport = require('passport');
const mongoose = require('mongoose');
const express = require('express');
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// View Engine
app.engine('handlebars', 
    exphbs({
        defaultLayout: 'layout',
        allowProtoMethodsByDefault: true
    })
);

// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

// Passport
app.use(cookieParser());
app.use(session({
    secret: 'mouse dog',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

// View Engine
app.set('view engine', 'handlebars');

// Static Files
app.use(express.static(path.join(__dirname,'public')));

// Router
app.use('/', router());

const puerto = process.env.PORT;

app.listen(puerto, () => {
    console.log(`Aplicación corriendo en el puerto: ${puerto}`);
});