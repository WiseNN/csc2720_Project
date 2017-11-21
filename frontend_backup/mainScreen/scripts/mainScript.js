
  const socket = io('http://localhost:3300');
  // var socket = io.connect('http://mydomain.com/');
  


//when server has disconnected, not when user disconnects


  


  
socket.on('disconnect', function(){

  	console.log("Uh-Oh, Looks like the server is down. Please wait, it will be back online shortly");
  	// socket.emit('disconnected', 'WiseNN');
});




  socket.on('connect', function(){

  	
  	socket.emit('addCustomId', "WiseNN");

  	

  		const params = {
  		sender: "WiseNN",
  		recipient: "TaslimD",
  		msg: "Whats up, building the socket server now"
  	};

  	socket.emit('addMessage', params);

  	socket.on('newMsg', function(data){
  		console.log(JSON.stringify(data,null,3));
  	});

  		// window.onbeforeunload = confirmExit;
  
	  	// function confirmExit()
	  	// {
		  //   socket.emit('disconnected', 'WiseNN');
	   //  }




  });




  
/*
Observations: 
- WHenever the server sends us a 'disconnect' event, this is not dependent upon our page refresh or us disconnecting,
	whenever we disconnect from the server, regardless of why, we need to send the sever a disconnection event in some 
	form, to let the server know we are disconnecting, or the transport layer will close on us and we will not know 
	who just disconnected from the server.
*/