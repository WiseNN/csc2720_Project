
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

  window.onload = function(){
     $.ajax({url: "http://localhost:3300/api/getMessages/WiseNN", async: false, success: function(result){
            console.log(JSON.stringify(result,null,3));

            for(int i=0;i<obj.privateConvos;i++)
            {
              //get the convo box
              privateConvos[i].recipeintId



              for(int k=0;k<privateConvos[i].messages;k++)
              {

              }

            }
        }});
  };






//  <div class="left msgContainer">

//     <div class="userMsgBubble">

//          <div class="msgBubbleTxtLeft">
//             Hello there my name is norris. i like to do a lot of things on the weekend, but I never actually get to lol.
//         </div>
//     </div>
//     <div class="onlineIndicator">

//     </div>
//     <div class="userNamePlate">

//     </div>
// </div>


  
const addMsg = function(userId, recipient, msgObj)
{
  var whichUser = "";
  if(userId == msgObj.sender)
  {
    whichUser = "left";
  }
  else if(recipient == msgObj.sender)
  {
    whichUser = "right";
  }

  var frag = document.createDocumentFragment();
  var div1 = document.createElement('div');
  div.className = whichUser+" msgContainer";

      var div2 = document.createElement('div');
      div2.className = "userMsgBubble";

          var div3 = document.createElement('div');
          div3.className = "msgBubbleTxt"+whichUser;
          div3.textContent = msgObj.text; //add text for message here

      var div4 = document.createElement('div');
      div4.className = "onlineIndicator";

      var div5 = document.createElement('div');
      div5.className = "userNamePlate";
      div5.textContent = ""; //add user's initials here

  div1.appendChild(div2);

      div2.appendChild(div3);

  div1.appendChild(div4);      

  div1.appendChild(div5);

  frag.appendChild(div1);      


};
  














//creating userConvo fragment and adding it to DOM
const addUserConvo = function(textPreview, recipientId)
{
  var frag = document.createDocumentFragment();
  var div = document.createElement('div');
  div.className = "userConvo";
    
      var p = document.createElement('p');
      p.className = "convoBoxText";
      p.textContent = textPreview; //sets the text preview

          var span = document.createElement('span');
          span.className = "recipientUsernameInConvoBox";
          span.textContent = recipientId; //sets recipient username

              var hr = document.createElement('hr');
              hr.className = "divider";

  div.appendChild(p);

      p.appendChild(span);

          span.appendChild(hr);            


  //finally, add the userConvo to the convoBox
  // document.getElementById('convoBoxWrapper').appendChild(div);
  frag.appendChild(div);
  return frag;
}



  
/*
Observations: 
- WHenever the server sends us a 'disconnect' event, this is not dependent upon our page refresh or us disconnecting,
	whenever we disconnect from the server, regardless of why, we need to send the sever a disconnection event in some 
	form, to let the server know we are disconnecting, or the transport layer will close on us and we will not know 
	who just disconnected from the server.
*/