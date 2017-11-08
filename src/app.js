
// const express = require('express');
import express from 'express';
import routes from './api/routes';


const app = express();

const port = 3300;



app.get('/', function(req,res){
	res.send("landing");
});
// router.get('/home', function(){});

app.use('/api', routes);

// app.get('*', function(req,res){

// 	console.log("UP AND RUNNING!");
// 	res.send("PAGE LOADEDD...");
// });


app.listen(port, function(){ console.log("listening on port: "+port);	
} );






