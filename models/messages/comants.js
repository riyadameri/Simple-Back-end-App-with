const mongoose = require("mongoose")

const Coments = mongoose.model("Comants",{
  idAuthor : {
    type : String
  },
  content : {
    type : String
  },
  date : {
    type : String 
  },
  postid : {
    type : String  
  },
})

module.exports  = Coments ;