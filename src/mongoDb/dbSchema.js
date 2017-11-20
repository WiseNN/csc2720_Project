import mongoose from 'mongoose';

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

//DO NOT DIRECTLY CALL db.save() on this schema
const userMessage = mongoose.Schema({
						
						message: {
							date: {type: String, required: true},
							time: {type: String, required: true},
							sender: {type: String, required: true},
							text: {type: String, required: true}
						}	
				});
//DO NOT DIRECTLY CALL db.save() on this schema
const privateConvo = mongoose.Schema({
			 _id: {type: String, required: true },
	recipientId : {type: String, required: true , unique: true, sparse: true, dropDups: true},
		messages: {type: [userMessage]}
});

const userPrivateConvos = mongoose.Schema({
	_id: {type: String, required: true},
	privateConvos: {type: [privateConvo]}
});

const users = mongoose.Schema({
	_id: {type: String, required: true},
	voiceId: {type: String, required: false},
	isActive: {type: Boolean, required: true} 
});


mongoose.model('PrivateConvo', privateConvo);
mongoose.model('UserPrivateConvos', userPrivateConvos);
mongoose.model('Message', userMessage);
mongoose.model('Users', users);

