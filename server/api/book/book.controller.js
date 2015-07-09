'use strict';

var _ = require('lodash');
var Book = require('./book.model');
var booksApi = require('google-books-search');

// Get list of books
exports.index = function(req, res) {
  Book.find(function (err, books) {
    if(err) { return handleError(res, err); }
    return res.json(200, books);
  });
};

// Get a single book
exports.show = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    return res.json(book);
  });
};

// Get books by user ID
exports.getByUserId = function(req, res) {
  Book.find({
    "user._id": req.params.id
  }, function(err, books) {
    if (err) { return handleError(res, err); }
    return res.json(books);
  });
};

// Search for books
exports.searchBooks = function(req, res) {
  booksApi.search(req.params.input, function(err, data) {
    return res.json({data: data});
  });
};

// Creates a new book in the DB.
exports.create = function(req, res) {
  Book.find({
    name: req.body.name,
    "user._id": req.body.user._id
  }, function(err, books) {
    if (books.length > 0) { return res.send(422); }

    Book.create(req.body, function(err, book) {
      if(err) { return handleError(res, err); }
       return res.json(201, book);
     });
  });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Book.findById(req.params.id, function (err, book) {
    if (err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    var updated = _.merge(book, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, book);
    });
  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}