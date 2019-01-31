// app.js
const express = require('express');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const product = require('./routes/product.route'); // Imports routes for the products
const user = require('./routes/user.route');
const app = express();
app.set('view engine','ejs');
app.use('/public', express.static('public'));

// app.use(function(req, res, next){
//     res.status(404).render('404', {title: "Sorry, page not found"});
// });


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://Prajwol:cloud_prajwol1@ds163044.mlab.com:63044/productstutorial';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//<------------- MIDDLEWARE ---------------------->

// function isAuthenticated(req, res, next) {
//   // do any checks you want to in here

//   // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
//   // you can do this however you want with whatever variables you set up
//   if (req.user.authenticated)
//       return next();

//   // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
//   // res.redirect('/');
//   res.send('login first');
// }

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use('/' ,index);
app.use('/products', product);
app.use('/user',user);

const port = 5000;

app.listen(port, () => {
    console.log('Sever is up and running on port numner ' + port);
});