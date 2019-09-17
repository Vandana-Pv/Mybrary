const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All authors routes
router.get('/',async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !='') {
        searchOptions.name = new RegExp (req.query.name,'i')// i is for case sensitive i.e., JO or jo is same
    }
    try{
        const authors = await Author.find(searchOptions); // find is used to find the authors. we can pass the parameters in the {}.
                                              // But here we want to return all the authors we dont use it
        res.render('authors/index', { 
            authors : authors,
            searchOptions : req.query
        });
    } catch {
        res.redirect('/');
    }
   
});

// New Author route
router.get('/new', (req,res) =>{
    res.render('authors/new',{
        author : new Author() // Creates a new author 
    })
});

// Creating the author
router.post('', async (req, res) =>{
    const author = new Author({
        name : req.body.name
    })
    try {
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new',{
        author : author,
        errorMessage : 'Error in creating the author'
        })
    }

    // author.save((err, newAuthor) =>{
    //     if(err){
    //         res.render('authors/new',{
    //             author : author,
    //             errorMessage : 'Error in creating the author'
    //         })
    //     }else{
    //         //res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect(`authors`)
    //     }
    // })
})
module.exports = router; 