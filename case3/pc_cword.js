"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: 
   Date:   
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/



//steps 4a - 4f
var allLetters;
var currentLetter;
var wordLetters;
var acrossClue;
var downClue;
var typeDirection = "right";

//step 5
window.onload = init;

//step 6
function init() {
   allLetters = document.querySelectorAll("table#crossword span");
   currentLetter = allLetters[0]; 
   var acrossID = currentLetter.dataset.clueA;
   var downID = currentLetter.dataset.clueD;
   acrossClue = document.getElementById(currentLetter.dataset.clueA);
   downClue = document.getElementById(currentLetter.dataset.clueD);

   //step 8
   formatPuzzle(currentLetter);// i made currentLetter equal formatPuzzle

   for(var i=0; i<allLetters.length; i++){

      allLetters[i].style.cursor = "pointer"; // i honestly forgot how to do what the step asked and i looked through my notes as well. in other words i tried my best

      allLetters[i].onmousedown = function(e){ //i forgot to add the arry allLeters and have the function formatPuzzle use the anonymous function
         formatPuzzle(e.target)
      };
   }
   
   //10
   document.onkeydown = selectLetter;//didnt put it in the init function and i go it wrong

   //12
   var typeImage = document.getElementById("directionImg");

   typeImage.style.cursor = "pointer";

   typeImage.onclick = switchTypeDirection; //i did mmousedown and not onclick


   //13
   document.getElementById("showErrors").onclick = function(){// i should have known about this, i saw it in the HTML but i didn't extract it from the HTML

      for(var i=0; i<allLetters.length; i++){
         if(allLetters[i].textContent !== allLetters[i].dataset.letter){// i didnt put allLetters[i]
            allLetters[i].style.color = "red";// didnt put the array
            setTimeout(function() {
               for (var i = 0; i < allLetters.length; i++) {
                  allLetters[i].style.color = "";
               }
            }, 3000); //i had no idea how to do this, i looked it up and thought i had it but nope
         }
      }
   }
   //14
   document.getElementById("showSolution").onclick = function(){//same thing for step 13
      for(var i=0; i<allLetters.length; i++){
      allLetters[i].textContent = allLetters[i].dataset.letter; // didnt add allLetters[i]
      }
   };
}

//11
function switchTypeDirection(){

   var typeImage = document.getElementById("directionImg");

   if(typeDirection === "right"){
      typeDirection = "down";
      typeImage.src = "pc_down.png";
      currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
   }else{
      typeDirection = "right";
      typeImage.src = "pc_right.png";
      currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
   }
}


//step 7
function formatPuzzle(puzzleLetter){//i didnt add puzzleLetter to the function and instead i thought i had to make a seprate var
   
   var currentLetter = puzzleLetter;
   for(var i=0; i<allLetters.length; i++){
      allLetters[i].style.backgroundcolor = "";
   }
   acrossClue.style.color="";
   downClue.style.color="";

   if(currentLetter.dataset.clueA !== undefined){
      acrossClue = document.getElementById(currentLetter.dataset.clueA);//forgot to put "document" in fornt of getElementById     
      acrossClue.style.color = "blue";
      wordLetters = document.querySelectorAll("[data-clue-a = " + currentLetter.dataset.clueA + "]"); //thought i had to get the attribute
      for (var i = 0; i < wordLetters.length; i++) { //forgot to add the for loop hahahahaha
         wordLetters[i].style.backgroundColor = "rgb(231, 231, 255)";
      }
   }

//i completly skipped a step. whoops
   if (currentLetter.dataset.clueD !== undefined) {
      downClue = document.getElementById(currentLetter.dataset.clueD);
      downClue.style.color = "red";
      wordLetters = document.querySelectorAll("[data-clue-d = " + currentLetter.dataset.clueD + "]");
      for (var i = 0; i < wordLetters.length; i++) {
         wordLetters[i].style.backgroundColor = "rgb(255, 231, 231)";
      }
}

   if(typeDirection === "right"){
      currentLetter.style.backgroundcolor = "rgb(191, 191, 255)";
   }else{
      currentLetter.style.backgroundcolor = "rgb(255, 191, 191)"
   }
}

//step 9
function selectLetter(e){

   var leftLetter = document.getElementById(currentLetter.dataset.left);
   var upLetter = document.getElementById(currentLetter.dataset.up);
   var rightLetter = document.getElementById(currentLetter.dataset.right);
   var downLetter = document.getElementById(currentLetter.dataset.down);// didnt add document.getElementById()

   var userKey = e.keyCode; //had them backwards, didnt make is a known variable and didnt associate the anonymous function with keyCode

   if(userKey === 37){
      formatPuzzle(leftLetter);
   }else if(userKey === 38){
      formatPuzzle(upLetter);
   }else if(userKey === 39 || userKey === 9){ // i didnt associate 9, 13, 46, and 90 with anything
      formatPuzzle(rightLetter);
   }else if(userKey === 40 || userKey === 13){
      formatPuzzle(downLetter)
   }else if(userKey === 8 || userKey === 46){
      currentLetter.textContent = "";
   }else if(userKey === 32){
      switchTypeDirection()
   }else if(userKey >= 65 && userKey <= 90){ //i set them equal to 65 and 90 and not say inbetween 65 and 90, i also made it an "or" and not "and"
      currentLetter = getChar(userKey);
      if(typeDirection === "right"){
         formatPuzzle(rightLetter)
      }else{
         formatPuzzle(downLetter)
      }
   }
   e.preventDefult(); //omg i skipped another step. smh me

}





/*====================================================*/

function getChar(keyNum) {
   return String.fromCharCode(keyNum);
}
