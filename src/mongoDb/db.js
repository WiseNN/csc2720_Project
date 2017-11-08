//system modules
import mongoose from 'mongoose';
import colors from 'colors';
import {ObjectId} from 'mongodb'



//custom modules
import Util from '../utilities/util';
const  myUtil = new Util();


//-----------------------------------



if(process.env.NODE_ENV == "production")
{
	//...mongoLab URL...
	console.log("production...".green)
}else{
	mongoose.connect('mongodb://localhost/chatAppProject');	
	console.log("development...".green)
}


const db = mongoose.connection;

db.once('open', () => {console.log("database is connected!...".red);});

db.on('error', (err) => {console.log(("There was an error connecting to the database: "+err).red);});


import dbSchema from './dbSchema';
//get Models from mongoose Schema 
const privateMsg = mongoose.model('PrivateMsg');
const message = mongoose.model('Message');
const Look = mongoose.model('Look');

export default class chatAppDb
{
	
	constructor()
	{
		//...
		this.readDb = this.readDb.bind(this);
		this.saveDb = this.saveDb.bind(this);
	}

	readDb()
	{
		privateMsg.find((err, doc) => {
			console.log("privMsgDB: "+JSON.stringify(doc,null,3))});
		
		
		// l.save(function(err, myDoc){
		// 	console.log("LookDoc: "+myDoc);
		// });
	}


	addMessage(sender, recipeint, msg)
	{
		
		const dateTime = myUtil.getDateAndTime();
		console.log("DateTIme: "+dateTime.date);
		console.log("args: "+sender+recipeint+msg)
		const newMsgDet = new message({
					date: dateTime.date,
					time: dateTime.time,
					sender: sender,
					text: "msg"
		});
		var msgAry = [];
		msgAry.push(newMsgDet);

		const privMsg = new privateMsg({
			_id: ObjectId(),
				userId : sender,
				recipientId : recipeint,
				messages: msgAry 
			});

		privMsg.save(function(err,sDoc){console.log(err+"sDoc: "+JSON.stringify(sDoc,null,2));});

		// privateMsg.findOne(function(err, doc) {
		// 	console.log("err: "+err);
		// 	console.log("doc: "+JSON.stringify(doc));
		// 	const privMsg = new privateMsg({
		// 		userId : sender,
		// 		recipientId : recipeint,
		// 		messages: msgAry 
		// 	});
			
				
		// });


	}

	//DB Helper Function
	/******************************************************************************/
	/******************************************************************************/
	saveDb(doc)
	{
		//if doc is not undefined/null
		if(typeof doc != 'undefined')
		{
			//save dat
			doc.save(function(err,newDoc){
				//if save returns newDoc, print newDoc in magenta with black background to console
			if(newDoc)
				{
					console.log(("\nupdated "+doc.constructor.modelName+"Database: "+newDoc+"\n").magenta.bgBlack);
					return true
				}//if save error, print error 
				else if(err)
				{
					console.log(("\nThere was an error updating an item: "+err+"\n").red);
					return false;
				}
			});	
		}else{//else print notice and report to errorHandler
				console.log(("CANNOT SAVE DOCUMENT FOR"+ doc.constructor.modelName).red);
				errorHandler(doc.constructor.modelName, "saveDB")
		}	
		
	}
}

const obj1 = new chatAppDb();
obj1.readDb();
obj1.addMessage("WiseNN", "TaslimD", "Whats up bro! This this is finally off the ground! 😅");



