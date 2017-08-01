// Load required packages
var express = require('express');
var compression = require('compression');


// Create our Express application
var app = express();

// Compression middleware
app.use(compression());

// Static content
app.use(express.static(__dirname + '/public'));

// Create our Express router
var router = express.Router();

// Initial dummy route for testing - will get preempted by public/index.html
router.get('/', function(req, res) {
  res.end('Twitatron');
});

// Register all our routes
app.use(router);


// Cache, client!
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));


// Start the server
console.log('Listening on port 3000');
app.listen(3000);

