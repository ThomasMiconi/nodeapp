// Load required packages
var express = require('express');
var compression = require('compression');

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

