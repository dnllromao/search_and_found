const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Trail = require('./models/trail.js');

const app = express();
const dbUrl = "mongodb://localhost:27017/trails";


// CORS on expressJS
// https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'client', 'build')));

/*app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});*/

app.get('/api', function(req, res) {
	Trail.find({}, function(err, trails) {
		if(err) throw err;
		res.json(trails);
	});
});

mongoose.connect(dbUrl);

app.listen(3001, function() {
	console.log('listening on port 3001');
});