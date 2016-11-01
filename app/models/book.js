var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var bookSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Book', bookSchema);
