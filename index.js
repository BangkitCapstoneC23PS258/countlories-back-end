const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();
const port = 4000;

const loginRoutes = require('./src/routes/router-login');
const registerRoutes = require('./src/routes/router-register');
const appRoutes = require('./src/routes/router-app');

// Configurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'countlories123',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 120000
    },
}))
app.use(flash());

// Setting folder views
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');

// Gunakan routes yang telah didefinisikan
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/', appRoutes);

// Gunakan port server
app.listen(5050, ()=>{
    console.log('Countlories running in port '+ port);
});