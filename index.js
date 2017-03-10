var express = require('express');
var server = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080
var mongoURI = process.env.MONGOURI || require('./secrets').mongoURI;

//connect to the database
mongoose.connect(mongoURI);
//Create the Mongoose Schema
var foodSchema = mongoose.Schema({
  price: Number,
  category: String,
  isGlutenFree: Boolean,
  calories: Number,
});
//Create the Mongoose Model
var Food = mongoose.model('Food', foodSchema);
//Testing database stuff
var cheeseburger = new Food({
  price: '100',
  category: 'entree',
  isGlutenFree: '0',
  calories: 9000
});
cheeseburger.save(function(err, data){
  if(err){
    console.log(err);
  } else {
    console.log(data);
  }
});
//GET /foods
server.get('/foods', function(req,res){
  Food.find({}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        foods: documents
      })
    }
  });
});
//Get /foods/:id
// server.get('/foods/:id', function(req,res){
//   Food.find({_id: req.params.id}, function(err, documents){
//     if(err){
//       res.status(500).json({
//         msg:err
//       });
//     } else {
//       res.status(200).json({
//         foods: documents
//       });
//     }
//   });
// });
server.get('/foods/category/:category', function(req,res){
  Food.find({category: req.params.category}, function(err,documents){
    if(err){
      res.status(500).json({
        msg:err
      });
    } else {
      res.status(200).json({
        foods: documents
      });
    }
  })
})
//POST /foods
//PUT /foods/:id
//DELETE /foods/:id

server.listen(port, function(){
  console.log('Now listening on port 8080..', port);
})
