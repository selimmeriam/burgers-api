const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const burgerSchema = new Schema({
  
  name:{
      type: String,
     
  },
  restaurant: String,
  category: String,
  web : String,
  description: String,
  ingredients: [{
     type: String 
  }],
  
  addresses: [{
    addressId: Number,
    number: String,
    line1: String,
    line2: String,
    postcode: String,
    country: String
  }]
});

const Burger = mongoose.model('Burger', burgerSchema);
//  _id: {type: mongoose.Schema.Types.ObjectId},
module.exports = Burger;