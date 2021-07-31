const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const path = require('path');
global.filePath = path.join(__dirname, 'public');

require('dotenv').config({
    path: '.env'
  });
const PORT = process.env.PORT || 8000;
require('./db/connection');

const routes = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

app.listen(PORT, ()=>{
  console.log('Listening on ' + PORT);
})

// module.exports = app;

