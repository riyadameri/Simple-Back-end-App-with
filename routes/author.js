const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Author = require('../models/author');
const jwt = require('jsonwebtoken');

const multer = require("multer");

filename = '';
const mystorage = multer.diskStorage({
  destination : './uploads',
  filename : (req , file , redirect)=>{
    let date = Date.now();
    let fl = date + '.' + file.mimetype.split('/')[1]
    //87987987987.png
    redirect(null , fl);
    filename = fl;
  }
})
const upload = multer ({storage : mystorage})




router.post('/register',upload.any('image'),(req,res)=>{
  data = req.body ;
  author = new Author(data);
  author.image = filename;
  filename = '';
  salt = bcrypt.genSaltSync(10);
  author.password = bcrypt.hashSync(data.password,salt)
  author.save()
    .then(
      (saveAuthor)=>{
        res.status(200).send(saveAuthor)
      }
    )
    .catch(
      err => {
        res.status(400).send(err)
      }
    )
})

router.post('/login',(req,res)=>{
  let data = req.body;
  Author.findOne({email : data.email})
    .then(
      (author)=>{
        valid = bcrypt.compareSync(data.password , author.password);
        if(!valid){
          res.status(200).send('email or password invalid')
        }else{

          let payload = {
            _id : author.id,
            email : author.email,
            fillname : author.name + ' ' + author.lastname
          }
          let token = jwt.sign(payload , '123456789')
          res.send({mytoken : token})
        }
      }
    )
})

router.get('/all',(req,res)=>{
  Author.find({})
    .then(
      (authors)=>{
        res.status(200).send(authors)
      }
    ).catch(
      (err)=>{
        res.status(400).send(err)
      }
    )
})

router.get('/getbyid/:id',(req,res)=>{

  let id = req.params.id;
  Author.find({_id : id})
    .then(
      (author)=>{
        res.status(200).send(author)
      }
    ).catch(
      (err)=>{
        res.status(400).send(err)
      }
    )

})

router.delete('/supprimer/:id',(req,res)=>{

  let id = req.params.id;
  Article.findByIdAndDelete({_id : id})
    .then(
      (author)=>{
        res.status(200).send(author)
      }
    ).catch(
      (err)=>{
        res.status(400).send(err)
      }
    )
})

router.get('/getimage/:image',upload.any('image'),(req, res)=>{

  res.sendFile(__dirname + '/uploads/' + req.params.image)
})
router.put('/update/:id',(req,res)=>{

})

module.exports = router