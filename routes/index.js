// Routes folder is commonly named as Controllers 
const express = require('express');

//Calling Router function on express
const router = express.Router();

router.get('/',(req, res) => {
     
    // Calling the views/index.js
    res.render('index');
});

//Exporting the router such that we can import it in server.js file 
module.exports = router; 