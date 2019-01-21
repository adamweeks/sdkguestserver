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
    stage: 0,
    title: 'SDK Workshop'
  })
});

/**
 * Creates and displays a guest user token for debugging
 */
app.get('/guest', (req, res) => {
  const displayName = 'SDK Workshop';
  createUser({ displayName }).then((token) => {
    res.render('main', {token, stage: 1, title: 'Guest Token'});
  });
});

app.get('/stage2', (req, res) => {
  // Get the display name from the querystring of the url "?displayName=Name"
  const displayName = req.query.displayName;

  // Show the form if we do not have a name
  if (!displayName) {
    return res.render('main', {
      showForm: true,
      stage: 2,
      title: 'Guest Token Entry'
    });
  }

  // Create JWT based on form name entered
  createUser({ displayName }).then((token) => {
    res.render('main', {
      showForm: false,
      stage: 2,
      token,
      title: `Welcome ${displayName}`});
  });
})

app.get('/stage3', (req, res) => {
  const displayName = req.query.displayName;
  if (!displayName) {
    return res.status(401).send('display name required');
  }
  createUser({ displayName }).then((token) => {
    res.render('main', {token, stage: 3, title: 'Username Entry'});
  });
});

app.get('/stage31', (req, res) => {
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

/**
 * JSONP method of creating a guest token
 */
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