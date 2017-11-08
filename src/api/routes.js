import express from 'express';
import myConst from '../constants';
// var express = require('express');

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



//private chat messages between user/responder/messages (messages will be sorted by uid key created by mongoDB)
/*
{
	privateChat :{
			userId :{
				recipientId :{
						messages : uid(ObjectID_Key) : {
							date : `_DATE`,
							time : _TIME,
							sender : _recipientId or _userId,
							messages : _MESSAGE
								
					}
				}
	
		} 
	}
}
*/

router.get("/privateChat/:userId/:recipient/messages", function(req,res){
	
	const dateTime = getDateAndTime();

	const message = {
		date : dateTime.date,
		time : dateTime.time
	};
	res.send(message);

});



//function will be moved to a Class called Utilities folder
const getDateAndTime = () => {

	//create date object
	const date = new Date();

	//get month, day & year to create a formatted Date string
	var month = "";
	const day = date.getDay();
	const year = date.getYear();

	//get hour, min. & sec. to create formateed Time string
	const hour = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	//mapping month number to correct name
	switch(date.getMonth())
	{
		case 1 : month = myConst.month.jan; break
		case 2 : month = myConst.month.feb; break
		case 3 : month = myConst.month.mar; break
		case 4 : month = myConst.month.apr; break
		case 5 : month = myConst.month.may; break
		case 6 : month = myConst.month.jun; break
		case 7 : month = myConst.month.jul; break
		case 8 : month = myConst.month.aug; break
		case 9 : month = myConst.month.sep; break
		case 10 : month = myConst.month.oct; break
		case 11 : month = myConst.month.nov; break
		case 12 : month = myConst.month.dec; break
		default : throw new Error("Not a valid month, please check: getDateAndTime() function");
	}

	//formatted Date & Time String ***DO NOT MODIFY***
	const formattedDate_Str = month+" "+day+", "+year;
	const formattedTime_Str = hour+":"+minutes+":"+seconds;
	
	

	//returning a a JSON object with date & time string DO NOT MODIFY
	return { date: formattedDate_Str, time: formattedTime_Str};

};






//used to retrieve list of users conversations 
/*

	userId :{
		date :{
	
		}
	}
}
*/
router.get("/userPosts/:userId/:date/:uid/:message", (req,res) => {
	console.log("JSON.stringify: "+JSON.stringify(req.params));
	
	res.send("HELLO Renai Lilly! [;)");	
});





export default router;