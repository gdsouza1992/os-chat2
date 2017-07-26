// BASE SETUP
// =============================================================================
const express = require('express');
const bodyParser = require('body-parser');
const logger  = require('morgan');
const path = require('path');



var app = express();

app.use(logger('dev'));
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname,'..','public')));


// attachRoutes(app);


var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 3002;


// REGISTER OUR ROUTES
// =============================================================================
const attachRoutes = require('./routes');
attachRoutes(app);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


// SETUP THE SOCKET.IO EVENTS
// =============================================================================
// io.listen()