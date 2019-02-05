const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs')
const morganLogger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;

const indexRouter = require('./routes/index');
const studentRouter = require('./routes/student');

const app = express();

// create a write stream (in append mode) for logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });


// allow CORS
app.use(cors());

// setup the morgan logger
app.use(morganLogger('dev')); //to standard output
app.use(morganLogger('combined', { stream: accessLogStream })) //to a log file

app.use(express.json());

app.use('/', indexRouter);
app.use('/students', studentRouter);

// error handler
app.use(function(err, req, res, next) {
  res.status(500).json({
    success: false,
    error: err.message
  });
});

app.listen(port, () => console.log(`backend listening on port ${port}.`));