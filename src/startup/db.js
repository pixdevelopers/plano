const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose
    .connect(
      'mongodb://localhost/plano',
      { useNewUrlParser: true }
    )
    .then(() => winston.info('Connected to MongoDB...'));
};
