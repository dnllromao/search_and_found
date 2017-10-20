const express = require('express');
const app = express();

app.get('/api/comments', function(req, res) {
  /* Process request, send response */
});

app.post('/api/comments', function(req, res) {
    /* Process request, send response */
});

app.get(['/', '/another-page'], function(req, res) {
  /* Use React Router */
  var ReactRouter = require('react-router');
  var match = ReactRouter.match;
  console.dir(match);
  //var routes = require('./public/routes.js').routes

  //match({routes: routes, location: req.url}, function(error, redirectLocation, renderProps) {
    /* Send response */
  //});
  res.json('help');
});

app.listen(3001, function() {
	console.log('3001');
});