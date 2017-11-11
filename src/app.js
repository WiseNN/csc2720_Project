
// const express = require('express');
import fs from 'fs';
import express from 'express';
import https from 'https';
import routes from './api/routes';
import db from './mongoDb/db';

const app = express();
//look for heroku's port or use local port 
const port = process.env.PORT || 3300;



//SSL support
/*
https.createServer({

	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}, app).listen(port);;
*/


//unsecure support
app.listen(port);

console.log("listening on port: "+port+"...")

app.get('/', function(req,res){

	res.send("	LANDING PAGE, \"Hello\" \"World\" ");
});
// router.get('/home', function(){});

app.use('/api', routes);

// app.get('*', function(req,res){

// 	console.log("UP AND RUNNING!");
// 	res.send("PAGE LOADEDD...");
// });


// app.listen(port, function(){ console.log("listening on port: "+port);	
// } );






