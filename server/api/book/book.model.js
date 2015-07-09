'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: String,
  img: String,
  user: Object
});

module.exports = mongoose.model('Book', BookSchema);