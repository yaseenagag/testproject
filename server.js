var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

// INIT DB
mongoose.connect('mongodb://localhost/bookstoredemo');
db.once('open', function () {
  console.log('MONGOOSE CONNECTED!');
  var Book = require('./app/models/book');

  router.post('/books/:name', function (req, res, next) {
    console.log('POSTING BOOKS')
    var book = new Book({
      name: req.params.name
    });
    book.save(function (err, book) {
      if (err) { return next(err) }
      console.log('BOOK SAVED!!');
      // res.json({ message: 'Book created!' });
      res.json(201, book);
    });
  });
});

// router.use(function (req, res, next) {
//   console.log('Something is happening.');
//   next(); // go to next routes
// });

// router.get('/books', function (req, res) {
//   res.json({ message: 'getting books' });
//
// });

// BOOKS POST

// router.get('/books', function(req, res) {
//     Book.find(function(err, books) {
//         if (err)
//             res.send(err);
//
//         res.json(books);
//     });
// });

router.get('/', function (req, res) {
  res.json({ message: 'We are the best' });
});


app.listen(8080);
console.log('Magic happens on port ' + 8080);
