const Mongoose = require('mongoose');

module.exports = Mongoose.model('Word', new Mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  toJSON: {
    getters: true,
    virtual: false,
  },
}));
