var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

var app = express();
var http = require('http');


var apiRoutes = require('./app/routes/api')(app, express);
var adminRoutes = require('./app/routes/admin')(app, express);

mongoose.connect(config.db_url);
mongoose.connection.on('error', function(){
    console.error('MongoDb Connection Error, Ensure mongodb instance is running');
});

var socketio = require('socket.io');
var server = http.createServer(app);
var io  = socketio.listen(server);
require('./app/controllers/chat')(io);



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,x-access-token');
    next();
    });

/*Force https on heroku
if(app.get('env') == 'production'){
    app.use(function(req, res, next){
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });;
}*/
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

/*// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send('error', {
    message: err.message,
    error: {}
  });
});*/

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

server.listen(config.port, function(){
    console.log('Mobidoc is running on port '+ config.port);
})
