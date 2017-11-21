
// const express = require('express');
import fs from 'fs';
import express from 'express';
import http from 'http';
import https from 'https';
import routes from './api/routes';
import db from './mongoDb/db';
import cors from 'cors';


const app = express();


// app.use(cors());







 app.use('/', express.static(__dirname+'/public/frontend_backup/mainScreen'));
// app.use('public/css', express.static(__dirname+'/public/frontend_backup/mainScreen/css'));
// app.use('public/js', express.static(__dirname+'/public/frontend_backup/scripts'));
app.use('/', express.static(__dirname+'/public/images'));
app.use('/api', routes);

// app.get('/', );
const router = express.Router();
app.use('/', router);
	// res.sendFile('/../public/frontend_backup/mainScreen/index.html');
const server = http.createServer(app);
var io = require('socket.io')(server);
//pull in socketServer
require('./socketServer/socketIO')(io);




console.log("dir: "+__dirname);









//look for heroku's port or use local port 
const port = process.env.PORT || 3300;

//unsecure support
server.listen(port);

console.log("listening on port: "+port+"...");







//SSL support
/*
https.createServer({

	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}, app).listen(port);;
*/






