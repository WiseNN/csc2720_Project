
// const express = require('express');
import fs from 'fs';
import express from 'express';
import http from 'http';
import https from 'https';
import routes from './api/routes';
import db from './mongoDb/db';
import cors from 'cors';


const app = express();


app.use(cors());


const server = http.createServer(app);
var io = require('socket.io')(server);








//attatch socket io to global process


//pull in socketServer
require('./socketServer/socketIO')(io);




//look for heroku's port or use local port 
const port = process.env.PORT || 3300;





//unsecure support
server.listen(port);

console.log("listening on port: "+port+"...");

app.get('/', function(req,res){

	res.send("	LANDING PAGE, \"Hello\" \"World\" ");
});


app.use('/api', routes);





//SSL support
/*
https.createServer({

	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}, app).listen(port);;
*/






