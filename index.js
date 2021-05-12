const express = require('express');
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const path = require('path');


const app = express();

// View Engine
app.engine('handlebars', 
    exphbs({
        defaultLayout: 'layout',
        // helpers: require('./helpers/handlebars'),
        allowProtoMethodsByDefault: true
    })
);

app.set('view engine', 'handlebars');

// Static Files
app.use(express.static(path.join(__dirname,'public')));

// Router
app.use('/', router());

app.listen(3000);