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

const userMessage = mongoose.Schema({
						
						message: {
							_id:false,
							date: String,
							time: String,
							sender: String,
							text: String 
						}	
				});

const privateMsg = mongoose.Schema({
	_id: false,
	userId : String,
	recipientId : String ,
		messages: [userMessage]
});

const sample = mongoose.Schema({
	look: String
});


mongoose.model('PrivateMsg', privateMsg);
mongoose.model('Message', userMessage);
mongoose.model('Look', sample);

