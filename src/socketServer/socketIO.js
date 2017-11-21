import chatAppDb from '../mongoDb/db';




//express server instance from from app.js


	const db = new chatAppDb();
	var clients = new Object();
	// io.engine.generateId = (req) => {
	//   return "custom:id:" + custom_id++; // custom id must be unique
	// }

	module.exports = function(io)
	{
			io.on('connection', function(socket){

	

			socket.on('addCustomId',function(newId){
				if(clients[newId] == null)
				{
					socket.customId = newId;

					clients[socket.customId] = socket;

					console.log(("new Connection: "+socket.customId).yellow.bgBlack);
					// console.log(("Connected Clients: "+JSON.stringify(clients,null,3)).yellow.bgBlack);
					console.log(("Connected Clients: "+Object.keys(clients)).yellow.bgBlack);	
				}else{
					console.log("User: "+newId+" is already connected");
				}
				

			});

			socket.on('addMsg', function(req){
				console.log("adding message...");	
				db.addMessage(req.sender, req.recipient, req.msg, null, clients);
			});

			

			socket.on('disconnect', function(userId){

				console.log(("user: "+userId+ "has been disconnect from their socket").yellow.bgBlack);
				delete clients.userId;

			});

			socket.on('disconnected', function(userId){
				console.log(("Whoa, "+userId+" left really fast!").yellow.bgBlack);
					delete clients.userId;
				console.log(("user: "+userId+ " has been disconnect from their socket").yellow.bgBlack);
				console.log(("Connected Clients: "+Object.keys(clients)).yellow.bgBlack);
			
			});

			//need successful reconnection listener, this is a bit unreliable
			// socket.on('reconnected', function(userId){
			// 	console.log(("user: "+userId+" has re-connected").yellow.bgBlack);

			// });

		});


	}
	