var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var cors = require ('cors') ;
var app = express();

// middleware
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// database connection
const dbURI = 'mongodb+srv://team:teampass@challenge-team.sg02r8r.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => {
    console.log("Datebase connect with success!");
    app.listen(4000)
  })
  .catch((err) => {
    console.log("Datebase connect with fail!");
    console.log(err)
  });

// project routes
const formationRouter = require('./routes/formation');
app.use('/formations', formationRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
