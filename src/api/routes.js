import express from 'express';
import Util from '../utilities/util';
import chatAppDb from '../mongoDb/db';

const db = new chatAppDb();
var router = express.Router();


//create user
router.post("/users/createUser/:userId", (req,res) => {
	
	console.log("params: "+JSON.stringify(req.params));
	//attempts to add user to db, will send response to client
	db.addUser(req.params.userId, res);
	
});

//add voice recognition Id
router.put("/users/voiceRecognition/:userId/:voiceId", (req,res) => {

	//attempts to add voiceId to existing user, will send response to client
	db.addVoiceRecognitionId(req.params.userId, req.params.voiceId, res);
});


//creates a private convo with the sender & recipient
router.post("/privateChat/createConvo/:userId/:recipeintId", (req,res) => {

	db.createPrivateConvo(req.params.userId,req.params.recipeintId, res);
	
});


//add message to a private chat
//PLEASE UPDATE TO USE REQUEST BODY, DO NOT PASS MESSAGE VIA PARAMS

router.put("/privateChat/addMessage/:userId/:recipientId/:message", (req,res) => {
	
	console.log("params: "+req.message);
	db.addMessage(req.params.userId, req.params.recipeintId, req.params.message, res);
});



export default router;