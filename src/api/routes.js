import express from 'express';
import Util from '../utilities/util';
const  myUtil = new Util();

var router = express.Router();

// router.get("/convo/:convoName", function(req,res){
// 	console.log("JSON.stringify: "+JSON.stringify(req.params));

// });

//used to validate user exists
/*
	{
		UID : String [userId]
	}
*/


router.get("/user/:userId", (req,res) => {
	console.log("params: "+JSON.stringify(req.params));
	res.send({
		users : req.params.userId,
		exists: true
	});
});





router.get("/privateChat/:userId/:recipient/messages", function(req,res){
	
	
	console.log("UTIL: "+JSON.stringify(myUtil.getDateAndTime()));
	const dateTime = myUtil.getDateAndTime();

	const message = {
		date : dateTime.date,
		time : dateTime.time
	};
	res.send(message);

});










//used to retrieve list of users conversations 
/*

	userId :{
		date :{
	
		}
	}
}
*/
router.get("/userPosts/:userId/:message", (req,res) => {
	console.log("JSON.stringify: "+JSON.stringify(req.params));
	
	const tempObject = {
		userId: req.userId,
		message: req.message
	};

	console.log("myObj: "+JSON.stringify(tempObject));
	
	res.send(req.params);	
});





export default router;