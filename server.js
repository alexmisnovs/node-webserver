'use strict';

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
// import hbs tempalating

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

// "http://localhost:3000/help.html"

//middleware example;
app.use( (req, res, next)=> {

    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url};`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log("error, unable to append to file");
        }
    });
    next();
});
/**
 * app.use( (req, res, next) => {
     res.render('maintenance.hbs', {
       message: 'Website is not available',
   });
   
});
 */


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    // make sure that value should be a string otherwise return input without modification
    if(typeof text === String){
         return text.toUpperCase();
    }else{
        return text;
    }
   
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
     res.render('home.hbs', {
       title: 'Some Website',
       pageTitle: 'Home Page Alex',
       message: 111,
    
   });
});
app.get('/about', (req, res) => {
   // res.send('About us page');
   res.render('about.hbs', {
       title: 'Some Website',
       pageTitle: 'About Page',
       
   });
});

app.get('/bad', (req, res) => {
    //send back jason with error message property
    res.send(
       {
            
            status: 'bad',
            message: "fuck piss shit"
        }
    );
});
app.listen(3000, () => {
    console.log("server is up on port 3000");
});
