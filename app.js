const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
// Init app
const app = express();
// middelwares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(expressValidator());
app.use(session({secret: 'abc123', resave: false, saveUninitialized: false}));
//ejs
app.set('view engine', 'ejs');
// libs
const config = require('./config');
const db = require('./models/db');
const routes = require('./routes')(app);
// variables
const port = config.port;

app.listen(port, err => console.log(err ? `Error to connect on port ${port}` : `App running on port ${port}`));
