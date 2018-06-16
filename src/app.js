// MODULES 
const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');

// SETTINGS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:false} ));
app.use(cookieParser());
app.use(session({
    secret: 'thefluxporter123',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ROUTES
const indexRoutes = require('./routes/routes')(app, passport);

// PASSPORT CONFIG
const pass = require('./config/passport/localpassport')(passport);

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// SERVER & DATABASE
const config = require('./config');

mongoose.connect(config.db, (err, res) => {
    if(err) { throw err; console.log('Error on Database Connection, ' + err) }
    console.log('Database connected')
    
    // SERVER
    app.listen(config.port, () => {
        console.log('Server on port ', config.port);
    })
})