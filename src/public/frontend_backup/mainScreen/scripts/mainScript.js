
  const socket = io(window.location.protocol+"//"+window.location.hostname+":"+window.location.port);
  console.log("url: "+window.location.protocol+"//"+window.location.hostname+":"+window.location.port);
  // var socket = io.connect('http://mydomain.com/');
  
  document.addEventListener("DOMContentLoaded", function(event) {
          
          const elm = document.getElementById('sendBtnId');
          var passiveSupported = false;
          
          elm.addEventListener("mouseup", handleMouseUp, passiveSupported
                               ? { passive: true } : false);

  });




  window.onload = () =>
  {


     

     debugger;


    
    
    
    const url = createUrl(window.location.host, 'api/getMessages/', "WiseNN");

     $.ajax({url: url, async: true, success: function(result){
            debugger;
            loadMsgs(result);  
        }
      });
  }  

const createUrl = (host, path, params) =>
{
  debugger;
  return "http://"+host+"/"+path+params;
}

const handleMouseUp = function(evt){
  console.log("event handled");
  const elm = document.getElementById("myTextBox");

  if(elm.value == "")
  {
    return;
  }
  console.log("Show me text: "+elm.value);

  socket.emit('addMsg', {sender: "WiseNN", recipient: "Nommel", msg: elm.value });

};

const loadMsgs = (result) =>
{
  var convoFrags = document.createDocumentFragment();
            var msgsFrags = document.createDocumentFragment();

            // console.log(JSON.stringify(result,null,3));

            const userId = result.obj._id;


            if(result.success)
            {
              //get privateConvos
              const privateConvos = result.obj.privateConvos;

              
              for(var i=0; i < privateConvos.length;i++)
              {
                const recipientId = privateConvos[i].recipientId;
                const messages = privateConvos[i].messages;
                const textPreview = messages[messages.length - 1].text;
                
                if(textPreview.length > 199)
                {
                  textPreview = textPreview.substring(0,200);
                }

                const userConvo = addUserConvo(textPreview, recipientId);
                convoFrags.appendChild(userConvo);

                debugger;
                for(var k=0; k<messages.length; k++)
                {
                  const msg = addMsg(userId, recipientId, messages[k]);
                  msgsFrags.appendChild(msg);
                }

              }  
            debugger;
              const convos = document.getElementById("convoBoxWrapper");
              const msgs = document.getElementById("msgsWrapper");

              convos.appendChild(convoFrags);
              msgs.appendChild(msgsFrags);
            }
}
//adds a message to the msgsContainer  
const addMsg = (userId, recipientId, msgObj) =>
{
  var whichUser = "";
  if(userId == msgObj.sender)
  {
    whichUser = "right";
  }
  else if(recipientId == msgObj.sender)
  {
    whichUser = "left";
  }

  var frag = document.createDocumentFragment();
  var div1 = document.createElement('div');
  div1.className = whichUser+" msgContainer";

      var div2 = document.createElement('div');
      div2.className = "userMsgBubble";

          var div3 = document.createElement('div');
          div3.className = "msgBubbleTxt"+whichUser.capitalizeFirst();
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
  return frag;

};
  



//creating userConvo fragment and adding it to DOM
const addUserConvo = (textPreview, recipientId) =>
{
  var frag = document.createDocumentFragment();
  var div1 = document.createElement('div');
  div1.className = "userConvo";
    
      var p = document.createElement('p');
      p.className = "convoBoxText";
      
      var textPreviewNode = document.createTextNode("  "+textPreview);  //sets the text preview
      

          var span = document.createElement('span');
          span.className = "recipientUsernameInConvoBox";
          span.textContent = recipientId; //sets recipient username

      var hr = document.createElement('hr');
      hr.className = "divider";

  div1.appendChild(p);

      p.appendChild(span);
      p.appendChild(textPreviewNode);

          div1.appendChild(hr);            


  //finally, add the userConvo to the convoBox
  // document.getElementById('convoBoxWrapper').appendChild(div);
  frag.appendChild(div1);
  return frag;
}


String.prototype.capitalizeFirst = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
}



// *********************************** SOCKET ******************************************


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

    

    socket.on('newMsg', function(data){
      console.log("WE GOT A NEW MESSAGE!!!")
      console.log(JSON.stringify(data,null,3));
      
      const elmFrag = addMsg(data.sender, data.recipient, data);
      const msgs = document.getElementById("msgsWrapper");
      msgs.appendChild(elmFrag);
    });

      window.onbeforeunload = confirmExit;
  
      function confirmExit()
      {
        socket.emit('disconnected', 'WiseNN');
      }
  });
  
/*
Observations: 
- WHenever the server sends us a 'disconnect' event, this is not dependent upon our page refresh or us disconnecting,
	whenever we disconnect from the server, regardless of why, we need to send the sever a disconnection event in some 
	form, to let the server know we are disconnecting, or the transport layer will close on us and we will not know 
	who just disconnected from the server.
*/