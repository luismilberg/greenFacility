require('dotenv').config({
    path: 'variables.env'
});
require('./config/db');
const mongoose = require('mongoose');
const express = require('express');
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const app = express();

// View Engine
app.engine('handlebars', 
    exphbs({
        defaultLayout: 'layout',
        // helpers: require('./helpers/handlebars'),
        allowProtoMethodsByDefault: true
    })
);

// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

// View Engine
app.set('view engine', 'handlebars');


// Static Files
app.use(express.static(path.join(__dirname,'public')));

// Cookieparser y sesiones
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'foo',
    store: MongoStore.create({mongoUrl: process.env.DB})
  }));

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Router
app.use('/', router());

const puerto = process.env.PORT;

app.listen(puerto, () => {
    console.log(`Aplicación corriendo en el puerto: ${puerto}`);
});