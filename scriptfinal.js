

//must   
    
var n = 46;
var previousN;

var pointPosXRate = [
0.072, 0.192, 0.312, 0.432, 0.552, 0.672, 0.792, 0.912,
0.072, 0.192, 0.312, 0.432, 0.552, 0.672, 0.792, 0.912,
0.072, 0.192, 0.312, 0.432, 0.552, 0.672, 0.792, 0.912,
0.072, 0.192, 0.312, 0.432, 0.552, 0.672, 0.792, 0.912,
0.072, 0.192, 0.312, 0.432, 0.552, 0.672, 0.792, 0.912,
0.072, 0.192, 0.312, 0.432, 0.552, 0.672, 0.792, 0.912,
0.072, 0.192, 0.312, 0.432, 0.552, 0.672, 0.792, 0.912,
0.072, 0.192, 0.312, 0.432, 0.552, 0.672, 0.792, 0.912
];
var pointPosYRate = [
0.072, 0.072, 0.072, 0.072, 0.072, 0.072, 0.072, 0.072,
0.192, 0.192, 0.192, 0.192, 0.192, 0.192, 0.192, 0.192,
0.312, 0.312, 0.312, 0.312, 0.312, 0.312, 0.312, 0.312,
0.432, 0.432, 0.432, 0.432, 0.432, 0.432, 0.432, 0.432,
0.552, 0.552, 0.552, 0.552, 0.552, 0.552, 0.552, 0.552,
0.672, 0.672, 0.672, 0.672, 0.672, 0.672, 0.672, 0.672,
0.792, 0.792, 0.792, 0.792, 0.792, 0.792, 0.792, 0.792,
0.912, 0.912, 0.912, 0.912, 0.912, 0.912, 0.912, 0.912
];

var empty = [
1,2,3,4,5,6,7,8,
9,12,13,14,15,16,
17,22,23,24,
25,26,32,
33,34,
41,42,43,
49,50,51,56,
57,58,59,60,63,64
]


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



var startPosX = pointPosXRate[18] * (canvas.width);
var startPosY = pointPosYRate[18] * (canvas.width);

var endPosX = pointPosXRate[13] * (canvas.width);
var endPosY = pointPosYRate[13] * (canvas.width);


// ********************************



var clock = 0;

// canvas.width = window.innerWidth * 2;
// canvas.height = window.innerHeight * 2;
canvas.height = canvas.width;
ctx.beginPath();
ctx.rect(0,0, canvas.width, canvas.height);
ctx.fillColor = "#FFF";
ctx.fill();
ctx.closePath();

const DOT_COUNT = 1,
      CONNECT_COUNT_PER_DOT = 4,
      RADIUS = 1,
      LINE_WIDTH = 0.3;

function Dot(){
  // this.x = canvas.width * Math.random();
  // this.y = canvas.height * Math.random();
  this.x = pointPosXRate[45] * (canvas.width);
  this.y = pointPosYRate[45] * (canvas.width);
  this.xenergy = Math.random() * (0.2)+0.2 ;
  this.yenergy = Math.random() * (0.2)+0.2;
  var that = this;
  this.draw = function() {
    that.x = that.x + Math.sin(clock / that.yenergy) * that.xenergy;
    that.y = that.y + Math.sin(clock / that.xenergy) * that.yenergy;
    ctx.beginPath();
    ctx.fillStyle = "#FFF";
    ctx.arc(that.x, that.y, RADIUS, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
  this.drawLineToDot = function(n) {
    var selectedDot = findNearestDot(that, n);
    ctx.beginPath();
    ctx.strokeStyle = "#FFF";
    // ctx.strokeStyle = "rgba(" + (Math.round(Math.sin(clock) * 255)) + "," + (Math.round(Math.cos(clock) * 255)) + "," + Math.round(Math.cos(clock * .05) * 255) + ", .3)";
    ctx.lineWidth = LINE_WIDTH;
    ctx.moveTo(that.x, that.y);
    ctx.lineTo(selectedDot.x, selectedDot.y);
    ctx.stroke();
    ctx.closePath();
  }
}

var dots = [];

for (var i = 0; i < DOT_COUNT; i++){
  dots.push(new Dot());
}

function findNearestDot(fromDot, n){
  var x = fromDot.x;
  var y = fromDot.y;
  var sortedDots = dots.sort(function(a, b){
    return ((Math.abs(x - a.x) + Math.abs(y - a.y)) > (Math.abs(x - b.x) + Math.abs(y - b.y))) ? 1 : -1;
  });
  return sortedDots[n];
}

function draw(){
  clock += .1;
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  ctx.closePath();
  dots.forEach(function(dot){ dot.draw(); });
  dots.forEach(function(dot, i){
    for (var i = 1; i < Math.min(dots.length - 1, CONNECT_COUNT_PER_DOT); i++){
      dot.drawLineToDot(i);
    }
  });
}

// window.onclick = function(e){
//   var d = new Dot();
//   d.x = e.clientX * 2;
//   d.y = e.clientY * 2;
//   dots.push(d);
//   draw();
// }

setInterval(draw, 30);


function addDots(x,y){
var d = new Dot();
  d.x = x;
  d.y = y;
  dots.push(d);
  draw();

}




//words


    

// function drawSimple(p1,p2){

// var startPosX = pointPosXRate[p1] * (canvas.width);
// var startPosY = pointPosYRate[p1] * (canvas.width);

// var endPosX = pointPosXRate[p2] * (canvas.width);
// var endPosY = pointPosYRate[p2] * (canvas.width);

// var c = document.getElementById("canvas");
// var ctx = c.getContext("2d");
// ctx.beginPath();
// ctx.moveTo(startPosX, startPosY);
// ctx.lineTo(endPosX, endPosY);
//       ctx.lineWidth = 3;
//       ctx.strokeStyle = '#ffffff';
// ctx.stroke();

// }










// var connection = new WebSocket('ws://127.0.0.1:1337');

var sendMessage = function(){
var connection = new WebSocket('ws://127.0.0.1:1337');

        connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {

          var poem = message.data.split(',');
          var num = Math.floor(Math.random() * Math.floor(poem.length));

          var chosenPoem = poem[num];

          console.log(chosenPoem);

             //var json = JSON.parse(message);
             //console.log(json);
            // console.log("message.data:"+ message);
             //console.log(json.text);
             
             // var wholePoem = json.text;
             // var whole = json;
             // var firstSentence = ;
             
             // console.log("a b c d".spilt(" "));

             connection.send(bonusBank[bonusBank.length-1]);
            // $('#poems').append("<p class='sentences'>"+newNouns[touchCount-2]+sentences[Math.floor(Math.random()*100)]+newNouns[touchCount-1]+"</p>");
            // $ ('.poemWrapper').text(json.examples[0]);
            var num = Math.floor(Math.random() * Math.floor(message.data.length));
            
            if(bonusBank.length>2){
            $ ('.poemWrapper').append("<p class='sentences'>" + chosenPoem+"</p>");
            //$ ('.poemWrapper').append("<p class='sentences'>" + json.text.split('\n')[1]+"</p>");

            responsiveVoice.speak(chosenPoem,"UK English Male",{pitch: -2});

            




        }else{
            $ ('.poemWrapper').append("<p class='sentences'>" + "Dear"+"</p>");
        }

        } catch (e) {
            //console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

    };
}

var dataNum;
var getMessage2 = function(){
var connection = new WebSocket('ws://localhost:8025/john');

        connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
             

             
             dataNum = parseInt(message.data);
             console.log(dataNum);


 // n-5     ------------------------------
             if(dataNum+1 == n-8){

   console.log("23333");

            reset();
            previousN = n;
            n=n-8;
            bonusBank.push(wordBank[wordBank.length-4]);

          
          
            getWords();
            setSheet();
            events();

sendMessage();

console.log(previousN,n);

   
    // setNum(previousN-1,n-1);
    //  draw();
 addDots(pointPosXRate[n-1] * (canvas.width),pointPosYRate[n-1] * (canvas.width));  
 // drawSimple(previousN-1,n-1);
            // console.log(wordBank);
            console.log(n);
            console.log('wordBank:'+wordBank);
            console.log('bonusBank:'+bonusBank);
            console.log('wordSheet:'+wordSheet);

            console.log('antowordSheet:'+antiwordSheet);
        // } 
}



  // n-1     ------------------------------

if(dataNum+1 == n-1){
  console.log(233);
        // if ($('#word'+(n-1)).prop("checked") == true) {
            // var newInput = $(`<p id="display1">${wordSheet[0]}<p>`)
            // $('#wordList').append(newInput);
 reset();

            previousN = n;
            n=n-1;
            bonusBank.push(wordBank[wordBank.length-3]);

 
console.log(previousN,n);         
          
            getWords();
           setSheet();
            events();


sendMessage();


    // console.log("23333");
  // drawSimple(previousN-1,n-1);
// draw();
    // draw();
   addDots(pointPosXRate[n-1] * (canvas.width),pointPosYRate[n-1] * (canvas.width));  

// console.log(drawLineBool);

            // console.log(wordBank);
            console.log(n);
            console.log('wordBank:'+wordBank);
            console.log('bonusBank:'+bonusBank);
            console.log('wordSheet:'+wordSheet);
        // } 
       
       
}



// n+1     ------------------------------

if(dataNum+1 == n+1){

  reset();

           previousN = n;
            n=n+1;
            bonusBank.push(wordBank[wordBank.length-2]);

          
          
           getWords();
           setSheet();
            events();

sendMessage();


    console.log("23333");
    // setNum(previousN-1,n-1);
 // drawSimple(previousN-1,n-1);
    //  draw();
  addDots(pointPosXRate[n-1] * (canvas.width),pointPosYRate[n-1] * (canvas.width));  

            // console.log(wordBank);
            console.log(n);
            console.log('wordBank:'+wordBank);
            console.log('bonusBank:'+bonusBank);
            console.log('wordSheet:'+wordSheet);
        // } 
       
       
}

// n+5     ------------------------------
if(dataNum+1 == n+8){
  reset();
            previousN = n;
            n=n+8;
            bonusBank.push(wordBank[wordBank.length-1]);

          console.log(previousN,n);   
          
            getWords();
            setSheet();
            events();

            sendMessage();

// setNum(previousN-1,n-1);
// draw();
addDots(pointPosXRate[n-1] * (canvas.width),pointPosYRate[n-1] * (canvas.width)); 
 // drawSimple(previousN-1,n-1);
            // console.log(wordBank);
            console.log(n);
            console.log('wordBank:'+wordBank);
            console.log('bonusBank:'+bonusBank);
            console.log('wordSheet:'+wordSheet);
        // } 
       
}

// n-8     ------------------------------
if(dataNum+1 == n-11){
reset();
            n=n-11;
            bonusBank.push(antiwordBank[antiwordBank.length-1]);

          
          
           getWords();
            setSheet();
            events();
console.log(previousN,n); 
// drawSimple(previousN-1,n-1);  
addDots(pointPosXRate[n-1] * (canvas.width),pointPosYRate[n-1] * (canvas.width)); 
sendMessage();

// setNum(previousN-1,n-1);
// draw();
            // console.log(wordBank);
            console.log(n);
            console.log('wordBank:'+wordBank);
            console.log('bonusBank:'+bonusBank);
            console.log('wordSheet:'+wordSheet);
}



        

        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

    };
}





getMessage2();




var drawLineBool = false;



const WritePoem =  {}; // PART 1a:: This is the bingoApp object
const wordBank = [
'passion',
'enjoy',
'dear',
'honey'


] // Word bank of all yoga-related words from API

const antiwordBank = [

] // Word bank of all yoga-related words from API

let wordSheet = [] // List of randomly generated words displayed on bingo sheet
let antiwordSheet = []
const bonusBank =  // List of Bonus words
    [ 
    'dear'
    ]





 console.log(antiwordBank);

//  var generatePoem = function(){
// 	 if ($('#word14').prop("checked") == true) {
//             $("p").text("Passion sounds like medicine rattling in a pill bottle"); 
//             // $('#wordList').append(newInput);
//         } 
// }


//  generatePoem();

var deleteWords = function(){
	 wordBank.splice(0,4);
} 

var reset = function(){
	for(var i=1;i<65;i++){
		$('.word'+i).text('');
    //$('.word'+i).css({opacity:0.2});
	}
}


var setSheet = function () { //appending words from the array


  // $('.word'+(n-8)).css({opacity:1});
  // $('.word'+(n-1)).css({opacity:1});
  // $('.word'+(n+1)).css({opacity:1});
  // $('.word'+(n+8)).css({opacity:1});
  // $('.word'+n).css({opacity:1});
  

	$('.word'+(n-8)).text(wordBank[wordBank.length-4]);
	$('.word'+(n-1)).text(wordBank[wordBank.length-3]);
	$('.word'+(n+1)).text(wordBank[wordBank.length-2]);
	$('.word'+(n+8)).text(wordBank[wordBank.length-1]);

	$('.word'+n).text(bonusBank[bonusBank.length-1]);

  for(var i=1;i<empty.length;i++){
    $('.word'+ empty[i]).text('');
    //$('.word'+i).css({opacity:0.2});
  }

   
}

let antisetSheet = function(){

  // $('.word'+(n-11)).css({opacity:1});

	$('.word'+(n-11)).text(antiwordBank[antiwordBank.length-1]);

  for(var i=1;i<empty.length;i++){
    $('.word'+ empty[i]).text('');
    //$('.word'+i).css({opacity:0.2});
  }
}

// const newSheet = function () {
//     wordSheet = [] //empty current sheet
//     // bingoApp.randomizeWords()// randomly generate words
//     setSheet(); // reset sheet
//     antisetSheet();
//     $('input[type="checkbox"]').prop('checked', false); //check things off
//     $('#wordList').empty() // reset wordlist
// }


 var getWords = function(){//PART 3:: get words from API


    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: 'https://api.datamuse.com/words',
            params: {
                // key: apiKey,
                // rel_trg: "yoga",
                // rel_syn: "love",
                //rel_trg: bonusBank[bonusBank.length-1],
                //rel_syn: bonusBank[bonusBank.length-1],
                ml: bonusBank[bonusBank.length-1],
                max: 4
            },
            proxyHeaders: {
                'Some-Header': 'goes here'
            },
            xmlToJSON: false,
            useCache: false
        }
    }).then(function (results) {
        bankWords(results)
        // bingoApp.randomizeWords()
        setSheet();
});



    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: 'https://api.datamuse.com/words',
            params: {
                // key: apiKey,
                // rel_trg: "yoga",
                // rel_syn: "love",
                rel_ant: bonusBank[bonusBank.length-1],
                max: 1
            },
            proxyHeaders: {
                'Some-Header': 'goes here'
            },
            xmlToJSON: false,
            useCache: false
        }
    }).then(function (results) {
        antibankWords(results)
        // bingoApp.randomizeWords()
        antisetSheet()
});

    // $.ajax({
    //     url: "https://api.datamuse.com/words", //endpoint destination
    //     method: "GET",
    //     dataType: "json",
    //     data: {
    //         rel_trg: "yoga",
    //         max: 100
    //     }
    // }).then(function(results){ //results is an array of objects
    //     bingoApp.bankWords(results)
    //     bingoApp.randomizeWords()
    //     bingoApp.displayWords()
    // });
}
var bankWords = function(wordArray){ //PART 4:: create a bank of words from the API and store it in a new array
    
    wordArray.forEach(function(wordObject){ //word is an object with two key-value pairs
        // console.log(wordObject.word)// this gives you the word from the API
        wordBank.push(wordObject.word) //creating our word bank

    })  
}

var antibankWords = function(wordArray){ //PART 4:: create a bank of words from the API and store it in a new array
    
    wordArray.forEach(function(wordObject){ //word is an object with two key-value pairs
        //console.log(wordObject.word)// this gives you the word from the API
        antiwordBank.push(wordObject.word) //creating our word bank

    })  
}



//  var displayWords = function(){
//     setSheet();
// }

// var antidisplayWords = function(){
//     antisetSheet();
// }


 var events = () => {

	 // if ($('#word14').prop("checked") == true) {
  //           // $("#p2").text("Passion sounds like medicine rattling in a pill bottle"); 
  //           // new Audio('audio/1.mp3').play();
  //            drawSimple(18,13);

           
  //       } 

  //   if ($('#word13').prop("checked") == true) {
  //           // $("#p3").text("Just as light gives warmth"); 
  //           // new Audio('audio/2.mp3').play();
  //            drawSimple(13,12);
           
  //       } 

  //   if ($('#word12').prop("checked") == true) {
  //           $("#p4").text("Outside of heat"); 
  //           new Audio('audio/3.mp3').play();
           
  //       } 

  //   if ($('#word4').prop("checked") == true) {
  //           $("#p5").text("My feet kiss the cold, hard floor"); 
  //           console.log(233);
  //           new Audio('audio/4.mp3').play();
           
  //       } 
   






    // Events:: Bingo Word Interactions
    // Adding words to the final word list (and removing words from world list when words are deselected)$('#word1').on('click', function () {
    // $('#sub').unbind('click').click(function () {
      $('#word'+(n-8)).unbind('click').click(function () {  
      	// console.log(233);
        // if ($('#word'+(n-5)).prop("checked") == true) {
            // var newInput = $(`<p id="display1">${wordSheet[0]}<p>`)
            // $('#wordList').append(newInput);

            reset();
            previousN = n;
            n=n-8;
            bonusBank.push(wordBank[wordBank.length-4]);

          
          
            getWords();
            setSheet();
            events();

sendMessage();

console.log(previousN,n);

    console.log("23333");
    // setNum(previousN-1,n-1);
    //  draw();
 addDots(pointPosXRate[n-1] * (canvas.width),pointPosYRate[n-1] * (canvas.width));  
 // drawSimple(previousN-1,n-1);
            // console.log(wordBank);
            console.log(n);
            console.log('wordBank:'+wordBank);
            console.log('bonusBank:'+bonusBank);
            console.log('wordSheet:'+wordSheet);

            console.log('antowordSheet:'+antiwordSheet);
        // } 
       
       
    })

      $('#word'+(n-1)).unbind('click').click(function () {  

      	console.log(233);
        // if ($('#word'+(n-1)).prop("checked") == true) {
            // var newInput = $(`<p id="display1">${wordSheet[0]}<p>`)
            // $('#wordList').append(newInput);
 reset();

            previousN = n;
            n=n-1;
            bonusBank.push(wordBank[wordBank.length-3]);

 
console.log(previousN,n);         
          
            getWords();
           setSheet();
            events();


sendMessage();


    // console.log("23333");
  // drawSimple(previousN-1,n-1);
// draw();
    // draw();
   addDots(pointPosXRate[n-1] * (canvas.width),pointPosYRate[n-1] * (canvas.width));  

// console.log(drawLineBool);

            // console.log(wordBank);
            console.log(n);
            console.log('wordBank:'+wordBank);
            console.log('bonusBank:'+bonusBank);
            console.log('wordSheet:'+wordSheet);
        // } 
       
       
    })

       $('#word'+(n+1)).unbind('click').click(function () {  
      	// console.log(233);
        // if ($('#word'+(n+1)).prop("checked") == true) {
            // var newInput = $(`<p id="display1">${wordSheet[0]}<p>`)
            // $('#wordList').append(newInput);
 reset();

           previousN = n;
            n=n+1;
            bonusBank.push(wordBank[wordBank.length-2]);

          
          
           getWords();
           setSheet();
            events();

sendMessage();


    console.log("23333");
    // setNum(previousN-1,n-1);
 // drawSimple(previousN-1,n-1);
    //  draw();
  addDots(pointPosXRate[n-1] * (canvas.width),pointPosYRate[n-1] * (canvas.width));  

            // console.log(wordBank);
            console.log(n);
            console.log('wordBank:'+wordBank);
            console.log('bonusBank:'+bonusBank);
            console.log('wordSheet:'+wordSheet);
        // } 
       
       
    })

         $('#word'+(n+8)).unbind('click').click(function () {  
      	// console.log(233);
        // if ($('#word'+(n+5)).prop("checked") == true) {
            // var newInput = $(`<p id="display1">${wordSheet[0]}<p>`)
            // $('#wordList').append(newInput);

            reset();
            previousN = n;
            n=n+8;
            bonusBank.push(wordBank[wordBank.length-1]);

          console.log(previousN,n);   
          
            getWords();
            setSheet();
            events();

            sendMessage();

// setNum(previousN-1,n-1);
// draw();
addDots(pointPosXRate[n-1] * (canvas.width),pointPosYRate[n-1] * (canvas.width)); 
 // drawSimple(previousN-1,n-1);
            // console.log(wordBank);
            console.log(n);
            console.log('wordBank:'+wordBank);
            console.log('bonusBank:'+bonusBank);
            console.log('wordSheet:'+wordSheet);
        // } 
       
       
    })


$('#word'+(n-11)).on('click', function () {  
      	// console.log(233);
        if ($('#word'+(n-11)).prop("checked") == true) {
            // var newInput = $(`<p id="display1">${wordSheet[0]}<p>`)
            // $('#wordList').append(newInput);

         reset();
            n=n-11;
            bonusBank.push(antiwordBank[antiwordBank.length-1]);

          
          
           getWords();
            setSheet();
            events();
console.log(previousN,n); 
// drawSimple(previousN-1,n-1);  
addDots(pointPosXRate[n-1] * (canvas.width),pointPosYRate[n-1] * (canvas.width)); 
sendMessage();

// setNum(previousN-1,n-1);
// draw();
            // console.log(wordBank);
            console.log(n);
            console.log('wordBank:'+wordBank);
            console.log('bonusBank:'+bonusBank);
            console.log('wordSheet:'+wordSheet);
        } 
       
       
    })

     








    // $('#word1').on('click', function () {
    //     if ($('#word1').prop("checked") == true) {
    //         var newInput = $(`<p id="display1">${wordSheet[0]}<p>`)
    //         $('#wordList').append(newInput);
    //     } else if ($('#word1').prop("checked") == false) {
    //         $('#wordList').find('#display1').remove();
    //     }
    //     // responsive grid
    //     if ($('#word1').prop("checked") == true) {
    //         $('li.1').addClass('crossed')
    //     }else if ($('#word1').prop("checked") == false) {
    //         $('li.1').removeClass('crossed')
    //     }
    // })

    
    

}

    
getWords(); 
    // WritePoem.bankWords();
events();




// // draw line
// window.requestAnimFrame = (function () {
//     return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */ callback, /* DOMElement */ element) {
//         window.setTimeout(callback, 1000 / 60);
//     };
// })();


// var canvas = document.getElementById("canvas"),
//     ctx = canvas.getContext("2d");

// // canvas.width = 640;
// canvas.height = canvas.width;


// var points = [],
//     currentPoint = 1,
//     speed = 4,
//     targetX = 0,
//     targetY = 0,
//     x = 0,
//     y = 0;


// var pointPosXRate = [
// 0.11, 0.30, 0.50, 0.69, 0.88,
// 0.11, 0.30, 0.50, 0.69, 0.88,
// 0.11, 0.30, 0.50, 0.69, 0.88,
// 0.11, 0.30, 0.50, 0.69, 0.88,
// 0.11, 0.30, 0.50, 0.69, 0.88
// ];
// var pointPosYRate = [
// 0.11, 0.11, 0.11, 0.11, 0.11,
// 0.30, 0.30, 0.30, 0.30, 0.30,
// 0.50, 0.50, 0.50, 0.50, 0.50,
// 0.69, 0.69, 0.69, 0.69, 0.69, 
// 0.88, 0.88, 0.88, 0.88, 0.88
// ];

// var p1 = previousN-1;
// var p2 = n-1;

// // var startPosX = pointPosXRate[p1] * (canvas.width);
// // var startPosY = pointPosYRate[p1] * (canvas.width);

// // var endPosX = pointPosXRate[p2] * (canvas.width);
// // var endPosY = pointPosYRate[p2] * (canvas.width);

// var startPosX;
// var startPosY;

// var endPosX;
// var endPosY;
    
// // make some points
// for (var i = 0; i < 50; i++) {
//     points.push({
//         x: startPosX+i * (endPosX-startPosX),
//         // y: 100+100*Math.sin(i)
//         y: startPosY+(endPosY-startPosY)*i

//     });
    
// }

// // set the initial target and starting point
// targetX = points[1].x;
// targetY = points[1].y;
// x = points[0].x;
// y = points[0].y;

// // console.log(points[0]);
// // console.log(points[1]);

// function draw() {

// var p1 = previousN-1;
// var p2 = n-1;

// var startPosX = pointPosXRate[p1] * (canvas.width);
// var startPosY = pointPosYRate[p1] * (canvas.width);

// var endPosX = pointPosXRate[p2] * (canvas.width);
// var endPosY = pointPosYRate[p2] * (canvas.width);
    
// // make some points
// for (var i = 0; i < 50; i++) {
//     points.push({
//         x: startPosX+i * (endPosX-startPosX),
//         // y: 100+100*Math.sin(i)
//         y: startPosY+(endPosY-startPosY)*i

//     });
    
// }

// // set the initial target and starting point
// targetX = points[1].x;
// targetY = points[1].y;
// x = points[0].x;
// y = points[0].y;

// // console.log("233");


//     var tx = targetX - x,
//         ty = targetY - y,
//         dist = Math.sqrt(tx*tx+ty*ty),
//         velX = (tx/dist)*speed,
//         velY = (ty/dist)*speed;
    
//         x += velX
//         y += velY;
       
//     if(dist < 1){
//         currentPoint++;
        
//         if(currentPoint >= points.length){
//             currentPoint = 1;
//             x = points[0].x;
//             y = points[0].y;
//         }
        
//         targetX = points[currentPoint].x;
//         targetY = points[currentPoint].y;
//     }
    
//     ctx.clearRect(0,0,canvas.width, canvas.height);
//     ctx.beginPath();
//     ctx.moveTo(points[0].x, points[0].y);
//     ctx.lineWidth = 5;
//     ctx.strokeStyle = '#2068A8';
//     ctx.fillStyle = '#2068A8';
    
//     for (var p = 0, plen = currentPoint-1; p < plen; p++) {
//         ctx.lineTo(points[p].x, points[p].y);
//     }
//     ctx.lineTo(x, y);    
//     ctx.stroke();
    
//     requestAnimFrame(draw);
// }




// // draw();


// if(drawLineBool === true){
//     console.log("23333");
//     p1 = previousN-1;
//     p2 = n-1;
//     draw();
// }




