var express = require('express');

var app = express();

const port = 3300;
app.listen(port, function(){ console.log("listening on port: "+port);	
} );

app.get('*', function(req,res){

	console.log("UP AND RUNNING!");
	res.send("LOADEDD...");
});



