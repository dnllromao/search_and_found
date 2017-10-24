import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './src/App';
import Trail from './models/Trail.js';


const app = express();
const db = "mongodb://localhost:27017/trails";

app.set('view engine', 'ejs');
app.use(express.static('static'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(/\/(?!api)/, function(req, res) {
	const context = {};
	const html = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	);

	res.render('index', {html});

});

app.get('/api', function(req, res) {
	Trail.find({}, function(err, trails) {
		if(err) throw err;
		res.json(trails);
	});
});

app.post('/api', function(req, res) {
	console.log(req.body);
	let newTrail = new Trail(req.body);

	newTrail.save(function(err, newTrail) {
		if(err) throw err;
		res.json(true);
	});

});


app.listen(3000, function() {
	console.log('listen 3000');
});

mongoose.connect(db, { useMongoClient: true });
