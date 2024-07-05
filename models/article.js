const mongoose = require('mongoose');

const Article = mongoose.model('Aritcle',{
  title : {
    type : String
  },
  idAuthor : {
    type : String
  },
  description : {
    type : String
  },
  content : {
    type : String
  },
  image : {
    type : String
  },
  tags : {
    type : Array
  },
  date : {
    type : String 
  }
})

module.exports = Article;