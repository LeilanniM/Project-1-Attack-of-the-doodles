/* 

Q: I want the START button to start the game, therefor the champion to spawn after START is pressed and right after that the enemies will spawn.

-BREAK IT DOWN INTO STEPS in ORDER: 

1.-Make the champion Spawn, not just always be there, 
2.-and for his spawning to trigger the spawning of the enemies 
3.-create a start button in  the middle of the screen that goes away once pressed and that it triggers the champions spawning.

Q: CREATE BRIEF INSTRUCTIONS SCREEN


Q: GET RID OF ERROR MSG  at the end where it sayas SESSION CLOSED DUE TO NO ACTIVITY

Q: MAKE 12 more enemies spawn

Q: Make COMBO BOSS

Q: ANIMATION

*/

/* 
//=====================================================

function does:
-each part is genereated individually
-then it is pushed to its designated array
-then we COULD create a function that loops through all arrays and grabs one element of each and pushed them as a new object into a new array? or object? 

-then we grab the object and put its path inside the parenthesis of: 
new Enemy("path") 

 new Enemy("path", "", "", "");

*/

// //NEXT STEP:  call singleSymbolEnemyFactory() and console.log (enemyData)

// //ENEMY ARRAY:

// let currentEnemies = [];

// let enemyData = [];

// //ARRAYS TO PICK FROM

// /* Array #1 */ const enemySymbolArray = ["|", "-", "^", "v"];
// /* Array #2 */ const enemyCoordinatesArray = [
//   { top: 450, left: 835 }, //bottom right corner
//   { top: 0, left: 835 }, //top right corner
//   { top: 0, left: 0 }, //top left corner
//   { top: 450, left: 0 }, //bottom left corner
// ];
// /* Array #4 */ randomIdArray = [];

// //FUNCTION for SINGLE symbol

// function singleSymbolEnemyFactory() {
//   // ==================
//   //Instantiate more enemies based on the current amount on screen

//   // ==================
//   //generate a random ID (number) and push it to the randomIdArray

//   function randomId() {
//     let randomIdNum;
//   }

//   // randomId();

//   // ====================
//   // Picks a randomSymbol
//   function randomSymbol() {
//     const randomNum = Math.floor(Math.random() * enemySymbolArray.length);
//     const randomSymbol = enemySymbolArray[randomNum];

//     enemyData.push(randomSymbol);
//   }

//   randomSymbol();

//   // ====================

//   //Pick a random index number and assigns it as its coordinates

//   function randomCoordinates() {
//     const randomNum = Math.floor(Math.random() * enemyCoordinatesArray.length);
//     const randomCoordinates = enemyCoordinatesArray[randomNum];

//     enemyData.push(randomCoordinates);
//   }

//   randomCoordinates();

//   //====================
// }
