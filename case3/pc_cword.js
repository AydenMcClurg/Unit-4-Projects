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

      acrossClue.document.getElementById(currentLetter.dataset.clueA);//forgot to put "document" in fornt of getElementById
      
      acrossClue.style.color = "blue";

      wordLetters = document.querySelectorAll("[data-clue-a = " + currentLetter.dataset.clueA + "]"); //thought i had to get the attribute

      for (var i = 0; i < wordLetters.length; i++) { //forgot to add the for loop hahahahaha
         wordLetters.style.backgroundcolor = "rgb(231, 231, 255)";
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





/*====================================================*/

function getChar(keyNum) {
   return String.fromCharCode(keyNum);
}
