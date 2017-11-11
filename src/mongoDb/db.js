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
const userPrivateConvos = mongoose.model('UserPrivateConvos');
const privateConvo = mongoose.model('PrivateConvo');
const message = mongoose.model('Message');
const users = mongoose.model('Users');

// privateConvo.plugin(mongooseDelete, { deletedBy : true });
// message.plugin(mongooseDelete, { deletedBy : true });
// users.plugin(mongooseDelete, { deletedBy : true });


export default class chatAppDb
{
	
	constructor()
	{
		//...
		this.readDb = this.readDb.bind(this);
		this.saveDb = this.saveDb.bind(this);
	}
	
	//creates one private convo with a given recipeint
	createPrivateConvo(sender, recipeint)
	{
		const newConvo = new privateConvo({
			_id: sender,
			recipientId: recipeint,
		});
		const that = this;

		userPrivateConvos.findById(sender,function(err,doc){
			console.log("doc in userPrivateConvos: "+JSON.stringify(doc));
			if(doc != null && err == null)
			{
				//push a new convo with a given recipeint in array, will track # of privateConvos
				doc.privateConvos.push(newConvo);
				that.saveDb(doc);
			}
			else{
				console.log("Could not create privateConvo for user, please see: createPrivateConvo() method");
			}
		});
	}


	deletePrivateConvo(sender, recipeint)
	{
		userPrivateConvos.findById(sender,function(err,doc){
			
			if(doc != null && err == null)
			{
				doc.privateConvos.findOneAndRemoveOne({recipeintId: recipeint},{new: true}, function(subErr, subDoc){
					if(subDoc != null && subErr == nul)
					{
						console.log((sender+" privateConvos After recipient: "+recipeint+" Deletion: "+subDoc).green.bgBlack);
					}
					else{
						console.log(("deletePrivateConvo ERR >> findOneAndRemove SubERR: "+subErr).red);
					}
				});	
			}
			else{
				console.log(("deletePrivateConvo ERR: "+err).red);
			}
		});
	}
	
	addUser(userId)
	{
		if(typeof userId != undefined)
		{
			const newUser = new users({_id:userId, isActive:true});
			const newUserPrivateConvos = new userPrivateConvos({_id: userId, privateConvos: []});
			//save users Collection, then callback privateConvos Collection
			this.saveDb(newUser,this.saveDb(newUserPrivateConvos));	
			
		}else{
			console.log("There is no userName to add".magenta.bgBlack);
		}
		
	}
	removeUser(userId)
	{
		if(typeof userId != 'undefined')
		{
			users.FindByIdAndRemove(userId);
			userPrivateConvos.FindByIdAndRemove(userId);
		}
	}

	//adds a message to the privateConvo
	addMessage(sender, recipeint, msg,callback)
	{
		const dateTime = myUtil.getDateAndTime();
		console.log("DateTime: "+dateTime.date);
		console.log("args: "+sender+", "+recipeint+", "+msg);

		const newMsg = new message({
					date: dateTime.date,
					time: dateTime.time,
					sender: sender,
					text: "msg"
		});
		//capture scope
		const that = this;
		//REPLACED userId Field with system _id from mongoDb, update all documentation
		privateConvo.findOne({_id: sender, recipientId: recipeint}, function(err,doc){

			console.log(("err: "+JSON.stringify(err)+"\n doc: "+JSON.stringify(doc)).bgBlack);

			if(doc != null)
			{
				console.log(("see the messages Ary: "+JSON.stringify(doc.messages)).bgBlack);
				that.saveDb(doc);
			}
		});

		// privateConvo.save(function(err,sDoc){console.log("Err: "+err+"\nsDoc: "+JSON.stringify(sDoc,null,2));});

		// privateConvo.findOne(function(err, doc) {
		// 	console.log("err: "+err);
		// 	console.log("doc: "+JSON.stringify(doc));
		// 	const privMsg = new privateConvo({
		// 		userId : sender,
		// 		recipientId : recipeint,
		// 		messages: msgAry 
		// 	});
			
				
		// });


	}

	//DB Helper Function
	/******************************************************************************/
	/******************************************************************************/
	readDb(db)
	{
		db.find((err, doc) => {
			console.log("ReadDB collection named: "+this.constructor.modelName+":: "+JSON.stringify(doc,null,3))});
	}


	saveDb(doc)
	{
		console.log("SaveDb DOC: "+JSON.stringify(doc));
		//if doc is not undefined/null
		if(typeof doc != undefined)
		{
			//save dat
			doc.save(function(err,newDoc){
				//if save returns newDoc, print newDoc in magenta with black background to console
			if(newDoc)
				{
					console.log(("\nupdated "+doc.constructor.modelName+" Database: "+newDoc+"\n").magenta.bgBlack);
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
obj1.readDb(userPrivateConvos);

obj1.addUser("WiseNN");
// obj1.createPrivateConvo("WiseNN", "TaslimD")

// obj1.addMessage("WiseNN", "TaslimD", "Whats up bro! This this is finally off the ground! 😅",obj1.saveDb);



