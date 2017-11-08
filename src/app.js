
// const express = require('express');
import fs from 'fs';
import express from 'express';
import https from 'https';
import routes from './api/routes';


const app = express();

const port = 5000;


https.createServer({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}, app).listen(port);
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






