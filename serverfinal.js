var chosenWords = [

"passion"

];



var clients = [];



// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';

// Port where we'll run the websocket server
var webSocketsServerPort = 1337;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');



/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}



/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin); 
    // we need to know client index to remove them on 'close' event
    // var index = clients.push(connection) - 1;
    // var userName = false;
    // var userColor = false;

    // console.log((new Date()) + ' Connection accepted.');

    // send back chat history
    // if (history.length > 0) {
    //     connection.sendUTF(JSON.stringify( { type: 'history', data: history} ));
    // }

    // user sent some message
    connection.on('message', function(message) {

      
            var word = htmlEntities(message.utf8Data);
            console.log(word);
            chosenWords.push(word);
        
            // console.log("chosenWords1:"+chosenWords);


        // if (message.type === 'utf8') { // accept only text
        //     if (userName === false) { // first message sent by user is their name
        //         // remember user name
        //         userName = htmlEntities(message.utf8Data);
        //         // get random color and send it back to the user
        //         userColor = colors.shift();
        //         connection.sendUTF(JSON.stringify({ type:'color', data: userColor }));
        //         console.log((new Date()) + ' User is known as: ' + userName
        //                     + ' with ' + userColor + ' color.');

        //     } else { // log and broadcast the message
        //         console.log((new Date()) + ' Received Message from '
        //                     + userName + ': ' + message.utf8Data);
                
        //         // we want to keep history of all sent messages
        //         var obj = {
        //             time: (new Date()).getTime(),
        //             text: htmlEntities(message.utf8Data),
        //             author: userName,
        //             color: userColor
        //         };
        //         history.push(obj);
        //         history = history.slice(-100);

        //         // broadcast message to all connected clients
        //         var json = JSON.stringify({ type:'message', data: obj });
        //         for (var i=0; i < clients.length; i++) {
        //             clients[i].sendUTF(json);
        //         }
        //     }
        // }
    });

    // user disconnected
    connection.on('close', function(connection) {
        
    });



var currentWord = chosenWords[0];

var express = require('express');
var app = express();
var CONFPATH = "./poem.json";
var fs = require('fs');
var result = JSON.parse(fs.readFileSync(CONFPATH));

for(i = 0; i< result.length; i++){

    if(result[i].word ==chosenWords[chosenWords.length-1]){
        console.log(result[i].poem);
        connection.send(result[i].poem);
    }
}

   // console.log(result[0].word);

// app.listen(80, function () {
//   console.log('Example app listening on port 80!');
// });






// var unirest = require('unirest');

// //unirest.get("http://poetryme.dei.uc.pt:8080/PoetrymeWeb/rest/poetry?lang=en&form=10-4&seeds=computer+language&surp=0.002")
// unirest.get("http://poetryme.dei.uc.pt:8080/PoetrymeWeb/rest/poetry?lang=en&form=10-2&seeds=" + chosenWords[chosenWords.length-1] + "+" + chosenWords[chosenWords.length-2] + "&surp=0.8")
// // unirest.get("https://wordsapiv1.p.mashape.com/words/love/examples")

// //  http://poetryme.dei.uc.pt:8080/PoetrymeWeb/rest/poetry/line?lang=pt&nsyl=10&seeds=criatividade&bestof=10

// .end(function (result) {

// var poem = result.raw_body;
// console.log(poem);
//     // var words = result.body;
//     // // var sentence = JSON.parse(json);
   
//   connection.send(poem);

//   // connection.send(JSON.stringify(poem));
//   // console.log(result.body);
//   console.log("chosenWords:"+chosenWords);


// });

});



