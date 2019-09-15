// NODE_ENV is created by default and it is used to check at the production stage
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Importing index.js from router folder since to use it 
const indexRouter = require('./routes/index');

// Set the engine and the engine here is ejs
app.set('view engine', 'ejs');

// Used to view the folder name 
app.set('views',__dirname + '/views'); 

// Creates a new folder called layouts and a file called layout.js
app.set('layout', 'layouts/layout'); 

// Use ExpressLayouts for frontend
app.use(expressLayouts); 

// Used for Html files. Create a folder called public n store there
app.use(express.static('public'));

//Connecting to Database
const mongoose = require('mongoose');
//DATABASE_URL is the one which is used if host it on the server
//useNewUrlParser is used to parse the data which is deprecated in the previous version of mongo
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',() => console.log('Connected to Mongoose'));


// Using indexRouter which we have imported
app.use('/', indexRouter);

// Listen to the Port
app.listen(process.env.PORT || 3000);