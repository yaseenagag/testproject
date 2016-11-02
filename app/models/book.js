var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: String
});

// bookSchema.methods.findAll = function(cb) {
// 	return this.model('Book').find({ type: this.type }, cb);
// };

module.exports = mongoose.model('Book', bookSchema);
