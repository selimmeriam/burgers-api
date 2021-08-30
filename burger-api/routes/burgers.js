const router = require('express').Router();
const bodyParser= require('body-parser')

//var url = require('url');



let Burger = require('../models/burgers');

//1)List all Burgers in the DB
//this is the first endpoint that handles incoming http get request((s)) 
//i.e. http://localhost:5000/burgers/
router.route('/').get((req, res) => {
  //this is the mongodb method to get the list of all burgers at the mongodb atlas database 
  Burger.find()
    .then(burgers => res.json(burgers))
    .catch(err => res.status(400).json('Error: ' + err));
});



//2)Add a new Burger to the DB
//this is the second endpoint that handles incoming http post request((s)) 
//i.e. http://localhost:5000/burgers/add

router.route('/add').post((req, res) => {
  
  const name = req.body.name;
  const restaurant = req.body.restaurant;
  const category=req.body.category;
  const web = req.body.web;
  const description = req.body.description;
  const ingredients = req.body.ingredients;
  const addresses=req.body.addresses;
 

  const newBurger = new Burger({
    name,
    restaurant,
    category,
    web,
    description,
    ingredients,
    addresses
    
  });
          
  //console.log(newBurger) 
  newBurger.save()
    .then(() => res.json('Burger added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



//3)Search the Burger by ID
//this is the third endpoint that handles incoming http get request((s)) for specific burger id 
//i.e. http://localhost:5000/burgers/612868ce3d276c988993e10d

router.route('/:id').get((req, res) => {
  Burger.findById(req.params.id) 
    .then(burger => res.json(burger))
    .catch(err => res.status(400).json('Error: ' + err));
});



//4)Delete Burger by ID
//this is the 4th endpoint that handles incoming http delete request((s)) for specific excersice id 
//i.e. //http://localhost:5000/burgers/612868ce3d276c988993e10d
router.route('/:id').delete((req, res) => {
  Burger.findByIdAndDelete(req.params.id)
    .then(() => res.json('Burger deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
}); 




//5)Update Burger by ID 
//this is the 5th endpoint that handles incoming http post request((s)) to update an Burger for specific Burger id 
//i.e. http://localhost:5000/burgers/update/612868ce3d276c988993e10d

router.route('/update/:id').post((req, res) => { 
   
  const name = req.body.name;
  const restaurant = req.body.restaurant;
  const category=req.body.category;
  const web = req.body.web;
  const description = req.body.description;
  const ingredients = req.body.ingredients;
  const addresses=req.body.addresses;

 let update={
   name,restaurant,category, web, description,ingredients,addresses
 } 

  //console.log(update,req.params.id)
  let updateBurger= Burger.findOneAndUpdate({_id:req.params.id},{$set: update},{returnOriginal:false}) 
    .then((burger) => res.json('Burger updated!')) 
    .catch(err => res.status(400).json('Error: ' + err));
    });




 //6)Search Burger by ingredients
 //this is the 6th endpoint that handles incoming http get request((s)) to get an Burger for specific queries [ingredients]
//i.e. http://localhost:5000/burgers/find/ingredients/1?ingredients=''


router.route('/find/ingredients/:id').get((req, res) => {
  //console.log(req.query.ingredients)
  let query =new RegExp('^' + req.query.ingredients + '|' + req.query.ingredients, "i")     

Burger.find({ingredients:query })  
  .then((burger) =>  res.json(burger))   
  .catch(err => res.status(400).json('Error: ' + err));
});
 
  
//7)Search Burger by Name
 //this is the 7th endpoint that handles incoming http get request((s)) to get an Burger for specific queries [name]
//i.e. http://localhost:5000/burgers/find/name/1?name=''

 
router.route('/find/name/:id').get((req, res) => {
  //console.log(req.query.name);
  let query =new RegExp('^' + req.query.name + '|' + req.query.name , "i" )      

Burger.find({name:query})  
  .then((burger) =>  res.json(burger))   
  .catch(err => res.status(400).json('Error: ' + err));
});
 



//8)Search Burger by Restaurant
 //this is the 8th endpoint that handles incoming http get request((s)) to get an Burger for specific queries [res]
//i.e. http://localhost:5000/burgers/find/restaurant/1?res=''

 
router.route('/find/restaurant/:id').get((req, res) => {
  //console.log(req.query.res);
  let query =new RegExp('^' + req.query.res + '|' + req.query.res , "i" )      

Burger.find({restaurant:query})  
  .then((burger) =>  res.json(burger))   
  .catch(err => res.status(400).json('Error: ' + err));
});


  
//9)Search Burger by Location
 //this is the 9th endpoint that handles incoming http get request((s)) to get an Burger for specific queries [loc]
//i.e. http://localhost:5000/burgers/find/location/1?location=''

 
router.route('/find/location/:id').get((req, res) => {
  //console.log(req.query.location);
  let query =new RegExp('^' + req.query.location + '|' + req.query.location , "i" );

Burger.find({addresses: {$elemMatch: {country: query}}} )  
  .then((burger) => res.json(burger))   
  .catch(err => res.status(400).json('Error: ' + err));
});




//10)Lookup a random Burger
 //this is the 10th endpoint that handles incoming http get request((s)) to get an Burger for specific queries [random]
//i.e. http://localhost:5000/burgers/burger/1

 
router.route('/burger/:id').get((req, res) => {
  let query =new RegExp( /^[a-z]/ , "i" );

Burger.aggregate([{$match: {name: query}}, { $sample: { size: 1 } }]) 
  .then((burger) =>  res.json(burger))   
  .catch(err => res.status(400).json('Error: ' + err));
});


//11)Search Burger by Category
 //this is the 11th endpoint that handles incoming http get request((s)) to get an Burger for specific queries [cat]
//i.e. http://localhost:5000/burgers/find/category/1?cat=''

 
router.route('/find/category/:id').get((req, res) => {
  let query =new RegExp('^' + req.query.cat , "i" );
 
Burger.find({category:query}) 
  .then((burger) =>  res.json(burger))   
  .catch(err => res.status(400).json('Error: ' + err));
});


//12)Lookup a random Burger
 //this is the 12th endpoint that handles incoming http get request((s)) to get an Burger for specific queries [5 random] 
//i.e. http://localhost:5000/burgers/burgers/1

 
router.route('/burgers/:id').get((req, res) => {
  let query =new RegExp( /^[a-z]/ , "i" );

Burger.aggregate([{$match: {category: query}}, { $sample: { size: 5 } }]) 
  .then((burger) =>  res.json(burger))   
  .catch(err => res.status(400).json('Error: ' + err));
});



 
module.exports = router;