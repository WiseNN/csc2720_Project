
// const express = require('express');
import fs from 'fs';
import express from 'express';
import https from 'https';
import routes from './api/routes';


const app = express();

const port = process.env.port || 3300;



//SSL support
https.createServer({

	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}, app).listen(port);;

//unsecure support
// app.listen(port);

console.log("listening on port: "+port+"...")

app.get('/', function(req,res){
	res.send("landing");
});
// router.get('/home', function(){});

app.use('/api', routes);

// app.get('*', function(req,res){

// 	console.log("UP AND RUNNING!");
// 	res.send("PAGE LOADEDD...");
// });


// app.listen(port, function(){ console.log("listening on port: "+port);	
// } );






