require('dotenv').config();
require('ejs');
require('ciscospark');

const express = require('express');

const createUser = require('./guest');

const browserify = require('browserify-middleware');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('main', {
    stage: 1
  })
});

app.get('/main', (req, res) => {
  res.render('main', {})
});

app.get('/guest', (req, res) => {
  const displayName = req.query.displayName || 'SDK Workshop';
  createUser({ displayName }).then((token) => {
    res.render('main', {token, stage: 0, title: 'Guest Token'});
  });
});

app.get('/stage3', (req, res) => {
  const displayName = req.query.displayName || 'SDK Workshop';
  createUser({ displayName }).then((token) => {
    res.render('stage3', {token});
  });
});

app.get('/stage4', (req, res) => {
  const displayName = req.query.displayName || 'SDK Workshop';
  createUser({ displayName }).then((token) => {
    res.render('stage4', {token});
  });
});

app.get('/stage5', (req, res) => {
  const displayName = req.query.displayName || 'SDK Workshop';
  createUser({ displayName }).then((token) => {
    res.render('stage5', {token});
  });
});

app.get('/token', (req, res) => {
  const displayName = req.query.displayName || 'SDK Workshop';
  createUser({ displayName }).then((token) => {
    res.jsonp({
      displayName,
      token
    });
  });
});

//provide a bundle exposing `require` for a few npm packages.
app.get('/sdk.js', browserify('./sdk.js', {
  cache: true,
  precompile: true
}));

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('server started on port 3000');
});