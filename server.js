// External Dependencies
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var moment = require('moment');

var app = express();
if (process.env.NODE_ENV === 'production') {
	var env = 'production';
} else {
	env = 'development';
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
		res.sendFile(__dirname + '/index.html');
});


app.get('*', function(req, res) {
	var r, t;
	var p = req.params[0].substring(1, 999);

	// Try as Unix timestamp first
	t = moment.unix(p);
	if (t.format('X') === 'Invalid date') {
		t = moment(p);
	}

	if (t.format('X') === 'Invalid dateOOO') {
		r = {
			unix: null,
			natural: null
		};
	} else {
		r = {
			unix: t.format('X'),
			natural: t.format("dddd, MMMM Do YYYY")
		};
	}
	res.send(r);
});

// CONFIGURE PORT FOR DEV AND PROD, START SERVER
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);
server.listen(app.get('port'), function() {
	console.log('MODE: ', env);
	console.log('Server listening on port ' + app.get('port') + ' ...');
});
