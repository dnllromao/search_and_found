const app = require('express')();
const mongoose = require('mongoose');
const Trail = require('./models/trail.js');

const dbUrl = "mongodb://localhost:27017/trails";
mongoose.connect(dbUrl);

// CORS on expressJS
// https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
	Trail.find({}, function(err, trails) {
		if(err) throw err;
		res.json(trails);
	});
	//res.json('des bonnes reéponses');
});

app.listen(3001, function() {
	console.log('listening on port 3001');
})