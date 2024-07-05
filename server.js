const express = require("express");
require('./config/connect')
const app = express();
app.use(express.json());
const router = express.Router();

const cors = require("cors")
app.use(cors());

const articlapi = require('./routes/article');
const authorApi = require('./routes/author')


app.use('/article',articlapi);
app.use('/author',authorApi);
app.use('/getimage',express.static('./uploads'))

app.listen(3000, ()=>{
  console.log('server is working on port 3000');
})