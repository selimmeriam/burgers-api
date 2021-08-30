// init project
//import required packages
const express     = require('express');
const cors        = require('cors');
const mongoose = require('mongoose');
const bodyParser= require('body-parser')

var path = require('path');
require('dotenv').config();




//connect to your database using the following syntax
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



const port= process.env.PORT || 5000;
//execute packages
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
//create your middlewares
//middlewares are functions that can be executed when routes are beeing hit
//so let's take the below ('/post') as the route that we want to execute the meddlewear on we it hits 
//app.use('/post',()=> {console.log('This is the middlewear running now')})
  
/***********start of routes handle ***************/
//to serve the burger routes go to excersices.js
const BurgerRouter = require('./burger-api/routes/burgers.js'); 

//if the user after the route url/excercises all the exercisesRouter will be loaded  
app.use('/burgers', BurgerRouter);


/****************ends of routes handle *************/

//now start create your routs 
app.route("/").get((req, res) =>{
    res.send('We are on home');
  });


//listening to the server on port ...
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
