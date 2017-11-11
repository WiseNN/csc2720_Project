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


router.get("/users/:userId", (req,res) => {
	console.log("params: "+JSON.stringify(req.params));
	res.send({
		user : req.params.userId,
		exists: true,
		message: "This is used to validate users"
	});
});





router.get("/privateChat/:userId/:recipientId/:message", function(req,res){
	
	
	console.log("UTIL: "+JSON.stringify(myUtil.getDateAndTime()));
	console.log("params: "+req.message);
	const dateTime = myUtil.getDateAndTime();

	var myMsg = {
		date : dateTime.date,
		userId : req.params.userId,
	recipientId : req.params.recipeintId,
	text: req.params.message,
		time : dateTime.time,
		
	};

	console.log("mssg: "+JSON.stringify(myMsg));
	
	res.send(myMsg);

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