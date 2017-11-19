


<h2> Datastructures Group Project </h2>
<hr>
<b>Objective:</b> 
We are building a Web Chat Application that will contain a smooth user interface similar to a mordern SMS/Texting Application. Our build will use the standard iOS texting app as a design guide, as it was built using S.O.L.I.D Object Oriented Design Principles. When sending messages to the recipient, we will communicate data from the front-end to the back-end using an Application Protocool Interface (API).  Upon initially viewing the chat app for the first time, a user should be able to select the option to login or quickly create a user account. We will allow users to login with other social media accounts such as: Facebook, Twitter, Gmai, etc. 

<b>Features: </b>
<ul>
    <li>
        encoding the originial human readable message. This not only allows the opportunity to showcase profficient usage of data   structures, but also allows the opportunity for our team of developers to explore the basics of encryption/decryption, and implementing our own proof of concept algorithms. 
    </li>
    <li>
        Voice recognition & speech recognition. Voice Recognition Allows for users to be authenticated via distict wave patterns, speech recognition allows for speech to text transcription. This feature invovles more advanced concepts of Computer Science, touching sub-topics like Artificial Intelligence. Implementing Speech API's shows a fundumental understanding of practical, real world usage of today's cutting edge Software Technologies.
    </li>    
</ul>

<hr />
<h2>Documentation</h2>

<h3>Messaging API: [type of api method call] </h3>

<h5>A New User [Post]</h5>

   `/api/users/createUser/:userId`
   

    
<h5>Add Voice Recognition ID tag to a specified existing user [Put]</h5>

   `/api/users/voiceRecognition/:userId/:voiceId`

<h5>Create A Conversation Between the current user, and recipient user. DO NOT try to add messages to to a user's conversation with-out creating calling this end-point.</h5>

   `/api/privateChat/createConvo/:userId/:recipeintId`
   
   
<h5>Create A Conversation Between the current user, and recipient user. DO NOT try to add messages to to a user's conversation with-out creating calling this end-point.</h5>

   `/api/privateChat/createConvo/:userId/:recipeintId`   
   






Response for all API Calls:


    {
      "error": boolean,
      "success": booleam,
      "msg": String
    }        
    




    




<hr />
## CSC 2720 Datastructures Group Project Members

1. **Adobah** 

    Github:

    LinkedIn: 

    Website: 

2. **Brandon**

    LinkedIn: 

    Github: 

    Website: 

3. **Nommel Djedjero**

    LinkedIn: [https://www.linkedin.com/in/nommeldjedjero/](https://www.linkedin.com/in/nommeldjedjero/)

    Github: [https://github.com/NommelDjedjero](https://github.com/NommelDjedjero)

    Website: 

4. **Taslim Dosunmu**

    LinkedIn: [https://www.linkedin.com/in/taslimdosunmu/](https://www.linkedin.com/in/taslimdosunmu/)

    Github: [github.com/JayDosunmu](github.com/JayDosunmu)  

    Website: 

5. **Hasan Raza**

    LinkedIn: 

    Github: 

    Website: 

6. **Norris Wise**

    LinkedIn: [https://www.linkedin.com/in/norris-wise-jr-57352189/](https://www.linkedin.com/in/norris-wise-jr-57352189/)

    Github: [https://github.com/WiseNN](https://github.com/WiseNN)

    Website: 
