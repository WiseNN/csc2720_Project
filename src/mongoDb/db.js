//system modules
import mongoose from 'mongoose';
import colors from 'colors';
import {ObjectId} from 'mongodb';




//custom modules
import Util from '../utilities/util';
const  myUtil = new Util();


//-----------------------------------



if(process.env.NODE_ENV == "production")
{
	//...mongoLab URL...
	mongoose.connect("mongodb://WiseNN:Bladerz1@ds113606.mlab.com:13606/chatappproject");
	console.log("production...".green)
}else{
	mongoose.connect('mongodb://localhost/chatAppProject');	
	console.log("development...".green)
}


const db = mongoose.connection;

db.once('open', () => {console.log("database is connected!...".red);});

db.on('error', (err) => {console.log(("There was an error connecting to the database: "+err).red);});
var callNum = 0;

import dbSchema from './dbSchema';
//get Models from mongoose Schema 
const userPrivateConvos = mongoose.model('UserPrivateConvos');
const privateConvo = mongoose.model('PrivateConvo');
const message = mongoose.model('Message');
const users = mongoose.model('Users');


//partial Filter Expressions
// privateConvo.collection.createIndex({"recipientId" : 1 } , {partialFilterExpression: { recipientId: {$exists:true}}}, function(err , result){
     
//      console.log(("Partial Filter Expression Logger: \nERR: "+err+"\nResults: "+result).black.bgYellow);
//  });


export default class chatAppDb
{
	
	constructor()
	{
		//binding scope of class
		this.createPrivateConvo = this.createPrivateConvo.bind(this);
		this.deletePrivateConvo = this.deletePrivateConvo.bind(this);
		this.addUser = this.addUser.bind(this);
		this.addVoiceRecognitionId = this.addVoiceRecognitionId.bind(this);
		this.removeUser = this.removeUser.bind(this);
		this.addMessage = this.addMessage.bind(this);
		this.readDb = this.readDb.bind(this);
		this.saveDb = this.saveDb.bind(this);
		this.sendJSONresponse = this.sendJSONresponse.bind(this);
	}
	
	//creates one private convo with a given recipeint
	createPrivateConvo(sender, recipeint, response)
	{
		const newConvo = new privateConvo({
			_id: sender,
			recipientId: recipeint,
		});
		const that = this;

		userPrivateConvos.findById(sender,function(err,doc){

			console.log("doc in userPrivateConvos: "+JSON.stringify(doc,null,3));

			if(doc != null && err == null)
			{
				//push a new convo with a given recipeint in array, will track # of privateConvos
				doc.privateConvos.push(newConvo);
				that.saveDb(doc,response);
			}
			else if (doc == null){
				const responseMsg = "There is no user by that username"
				console.log(responseMsg);
				//interaal server error code because client is not responsible for error
				that.sendJSONresponse(response, 404, {error:true, success:false, msg:responseMsg});


			}
			else if(err)
			{
				const responseMsg = "ERROR: "+err;
				//internal server error code because client is not responsible for error
				that.sendJSONresponse(response, 500, {error:true, success:false, msg:responseMsg});

			}
		});
	}


	deletePrivateConvo(sender, recipeint, response)
	{
		userPrivateConvos.findById(sender,function(err,doc){
			
			if(doc != null && err == null)
			{
				const that = this;
				doc.privateConvos.findOneAndRemoveOne({recipeintId: recipeint},{new: true}, function(subErr, subDoc){
					if(subDoc != null && subErr == nul)
					{
						const responseMsg = sender+" privateConvos After recipient: "+recipeint+" Deletion: "+subDoc;
						console.log((responseMsg).green.bgBlack);

						that.sendJSONresponse(response,204,{error:false, success:true, msg:responseMsg});

					}
					else{
						const responseMsg = "deletePrivateConvo ERR >> findOneAndRemove SubERR: "+subErr;
						console.log((responseMsg).red);

						that.sendJSONresponse(response,404, {error:true, success:false, msg:responseMsg});
					}
				});	
			}
			else{
				console.log(("deletePrivateConvo ERR: "+err).red);
			}
		});
	}
	
	addUser(userId, response)
	{
		if(typeof userId != undefined)
		{
			const newUser = new users({_id:userId, isActive:true});
			const newUserPrivateConvos = new userPrivateConvos({_id: userId, privateConvos: []});
			
			//save users Collection, then callback privateConvos Collection, pass null 'response' to avoid setting http headers twice
			this.saveDb(newUser,null,this.saveDb(newUserPrivateConvos, response));	
			
		}else{
			const responseMsg = "There is no userName to add";
			console.log(responseMsg.magenta.bgBlack);
			this.sendJSONresponse(response, 404, {error:true, success:false, msg:responseMsg});
		}
		
	}

	addVoiceRecognitionId(userId,voiceId,response)
	{
		const that = this;
		users.findById(userId, function(err,doc){
			if(typeof doc != 'undefined')
			{
				doc.voiceId = voiceId;
				that.saveDb(doc, response);
			}
			else
			{
				const responseMsg = "Voice recognition cannot be setup for a user in this document because it does not exist ERROR: "+err;
				that.sendJSONresponse(response, 404, {error:true, success:false, msg:responseMsg});
			}
			
		});
	}
	removeUser(userId, response)
	{
		if(typeof userId != 'undefined')
		{
			users.FindByIdAndRemove(userId);
			userPrivateConvos.FindByIdAndRemove(userId);
			const responseMsg = "user: "+userId+" has been removed";
			sendJSONresponse(response, 204, {error:false, success: true, msg: responseMsg});
		}
		else{
			const responseMsg = "A user cannot be removed from this document because it does not exist";
			this.sendJSONresponse(response, 404, {error:true, success:false, msg:responseMsg});
		}
	}

	//adds a message to the privateConvo
	addMessage(sender, recipeint, msg,response)
	{
		const dateTime = myUtil.getDateAndTime();
		console.log("DateTime: "+dateTime.date);
		console.log("args: "+sender+", "+recipeint+", "+msg);

		const newMsg = new message({
					date: dateTime.date,
					time: dateTime.time,
					sender: sender,
					text: msg
		});

		//capture scope
		const that = this;
		//REPLACED userId Field with system _id from mongoDb, update all documentation
		privateConvo.findOne({_id: sender, recipientId: recipeint}, function(err,doc){

			console.log(("err: "+JSON.stringify(err)+"\n doc: "+JSON.stringify(doc)).bgBlack);

			if(doc != null && err == null)
			{
				console.log(("see the messages Ary: "+JSON.stringify(doc.messages)).bgBlack);
				that.saveDb(doc,response);
			}else{
				const responseMsg = "A Message cannot be added to this document because it does not exist. ERROR: "+err;
				that.sendJSONresponse(response, 404, {error:true, success:false, msg:responseMsg});
			}
		});

			
	}


	encodeHelper(msgObj)
	{
		const requestOptions = {
			url: "https://javachatapp-dataserver.herokuapp.com/",
			method: "GET",
			json:{message: "Hello there from node javascript"},
			qs: {}

		};
		request(requestOptions, function(err, response, body){
			if(err)
			{

			}else{

			}
		});
	}

	//DB Helper Function
	/******************************************************************************/
	/******************************************************************************/
	
	//not available to call from API
	readDb(db)
	{
		db.find((err, doc) => {

			console.log("ReadDB collection named: "+this.constructor.modelName+":: "+JSON.stringify(doc,null,3));
		});
	}


	saveDb(doc, response)
	{
		callNum++;
		console.log("SaveDb DOC: "+JSON.stringify(doc));
		const that = this;
		//if doc is not undefined/null
		if(typeof doc != null)
		{

			const that = this;
			//save dat
			doc.save(function(err,newDoc){
				console.log(("call num: "+callNum+", NEW DOC FROM SAVE: "+newDoc).black.bgWhite);
				//if save returns newDoc, print newDoc in magenta with black background to console
			if(newDoc)
				{
					const responseMsg = "\nupdated "+doc.constructor.modelName+" Database: "+newDoc+"\n";
					
					console.log((responseMsg).magenta.bgBlack);
					
					that.sendJSONresponse(response,201, {error: false, success:true, msg:responseMsg});

					
				}//if save error, print error 
				else if(err)
				{
					const responseMsg = "\nThere was an error updating an item. ERORR: "+err+"\n";

					console.log((responseMsg).red.bgWhite);

					that.sendJSONresponse(response,400, {error: true, success:false, msg:responseMsg});
					
				}
			});	
		}else{
				const responseMsg = "CANNOT SAVE DOCUMENT FOR"+ doc.constructor.modelName;
				
				console.log((responseMsg).red);
				
				that.sendJSONresponse(response,500, {error: true, success:false, msg:responseMsg});
		}	
		
	}

	
	sendJSONresponse(res, status, content)
	{
		if(res != null)
		{
			res.json(content);
			res.status(status);	
		}else{
			console.warn("No JSON response was sent in call".red.bgYellow);
		}
		
		
	};
}



