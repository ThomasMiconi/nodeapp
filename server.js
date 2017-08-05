// Load required packages
var express = require('express');
var compression = require('compression');
var sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')


var db = new sqlite3.Database(':memory:');


// For now we have two hard-coded databases: "events" (to play with the actual SQL) and "posts" whichexemplifies the ejs / displaying side


// In-memory SQL database
db.serialize(function() {
    db.run("CREATE TABLE events (info TEXT NOT NULL, eventdate DATE  CHECK (date(eventdate) IS NOT NULL))");

    var stmt = db.prepare("INSERT INTO events (info, eventdate) VALUES (?, ?)");
    for (var i = 0; i < 5; i++) {
        stmt.run(["Ipsum " + i, '2004-11-3'+i], function errorCatcher(err){ if (err) console.log('Error at insertion '+i+': '+err);});  // Problem: i is always 5 by the time the callback is called!
    }
    stmt.finalize();
});




// fake posts to simulate a database
const posts = [
{
    id: 1,
        author: 'John',
        title: 'Templating with EJS',
        body: 'Blog post number 1'
},
{
    id: 2,
    author: 'Drake',
    title: 'Express: Starting from the Bottom',
    body: 'Blog post number 2'
},
{
    id: 3,
    author: 'Emma',
    title: 'Streams',
    body: 'Blog post number 3'
},
{
    id: 4,
    author: 'Cody',
    title: 'Events',
    body: 'Blog post number 4'
}
]


// Create our Express application
var app = express();

// Body Parser for requests
app.use(bodyParser.urlencoded({extended: true}))

// Compression middleware
app.use(compression());

// Static content
app.use(express.static(__dirname + '/public'));

// Create our Express router
var router = express.Router();


// Note that the '/' route gets displaced by public/index.html if it exists.
router.get('/', function(req, res) {
  res.render('home', {posts: posts});
});
    
app.get('/events', (req, res) => {
    db.all("SELECT rowid AS id, info, eventdate FROM events", function(err, rows) {
              //console.log(row.id + ": " + row.info); // if using db.each
              //console.log(rows)  // if using db.all
        res.send(rows)
})
    });

app.get('/new', (req, res) => {
    res.render('newevent')
//        db.run("INSERT INTO events (info, eventdate) VALUES (?, ?)",  Ipsum " + i, '2004-11-3'+i], function errorCatcher(err){ if (err) console.log('Error at insertion '+i+': '+err);});  // Problem: i is always 5 by the time the callback is called!
    
});

app.post('/addevent', (req, res) => {
 // console.log(req.body)  
        db.run("INSERT INTO events (info, eventdate) VALUES (?, ?)",  [req.body.info, req.body.eventdate], function errorCatcher(err){ if (err) console.log('Error at insertion of event: '+err);});  // Problem: i is always 5 by the time the callback is called!
    
});

// blog post
app.get('/post/:id', (req, res) => {
      // find the post in the `posts` array
      const post = posts.filter((post) => {
              return post.id == req.params.id
            })[0]

        // render the `post.ejs` template with the post content
        res.render('post', {
                author: post.author,
                title: post.title,
                body: post.body
              })
})



// Register all our routes
app.use(router);

// Add ejs view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');





// Cache, client!
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));


// Start the server
console.log('Listening on port 3000');
app.listen(3000);

