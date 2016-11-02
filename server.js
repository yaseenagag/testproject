var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var methodOverride = require('method-override');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/', router);

// INIT DB
var mongoURI = 'mongodb://localhost/bookstoredemo';
mongoose.connect(mongoURI);
db.once('open', function () {
  console.log('MONGOOSE CONNECTED!');
  var Book = require('./app/models/book');

  router
  .get('/api/books', function (reg, res, next) {
    Book.find(function (err, books, count) {
      res.json({ books: books });
    });
  })

  .post('/api/books/:title', function (req, res, next) {
    console.log('POSTING BOOKS')
    var book = new Book({
      title: req.params.title
    });
    
    book.save()
      .then(function (book) {
        res.json(201, book);
      })
      .catch(function (err) {
        return next(err);
      });
  })

  // .put('/api/books/:title', function (req, res, next) {
  //   res.json({ message: 'updating the book' });
  // });

  .delete('/api/books/:id', function (req, res) {
    Book.remove({ _id: req.params.id }, function (err, book) {
      if (err) { res.send(err); }
      res.json({ message: 'DONE!' });
    });
    // Book.findById(req.params.id, function (err, book) {
    //   console.log('About to remove', book);
    //   book.remove(function (err, removedBook) {
    //     console.log('Success', removedBook);
    //   });
    // });
  });

  // TODO:
  // [ ] update an existing book using .put()
  // [ ] delete an existing book using .delete()
});

// router.get('/', function (req, res) {
//   res.json({ message: 'We are the best' });
// });

// router.get('/books', function (req, res) {
//   res.json({ message: 'Books go here' });
// });

app.listen(8080);

console.log('Magic happens on port ' + 8080);
