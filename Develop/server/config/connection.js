const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://cpviper360:cp855010@cluster0.i8jmz.mongodb.net/Book_Search?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

module.exports = mongoose.connection;
