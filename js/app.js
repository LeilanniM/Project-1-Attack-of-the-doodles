//================================ Global access: ====================================================
let apiResults;
let userAttack; //it is the API's bestGuess

const heartArray = ["❤", "💓", "💙", "💕", "💔"];

const championDiv = document.querySelector("#champion"); //grabbing champion DIV

const editorElement = document.getElementById("editor"); // grabbing DIV with "editor" ID
const scoreBoard = document.querySelector("#scoreBoard"); //temporary
const lifeMeter = document.querySelector("#lifeMeter"); //temporary

const main = document.querySelector("main");

const gameOver = document.querySelector(".gameOver"); //but also tells us when the ux wins
const startButton = document.querySelector("#start");

//===================================== ENEMIES ARRAYS =====================================

const allWaves = [
  [
    { symbols: ["_"], id: 1, top: -20, left: 140, delay: 1 },
    { symbols: ["l"], id: 2, top: 68, left: 10, delay: 2 },
    { symbols: ["_"], id: 3, top: 230, left: 778, delay: 3 },
    // { symbols: ["n"], id: 4, top: 455, left: 495, delay: 1 },
    // { symbols: ["O"], id: 5, top: -28, left: 793, delay: 1 },
  ],
  [
    { symbols: ["l"], id: 4, top: -20, left: 140, delay: 0 },
    { symbols: ["l"], id: 5, top: 68, left: 10, delay: 0 },
    { symbols: ["_"], id: 6, top: 230, left: 778, delay: 0 },
  ],
  [
    { symbols: ["_"], id: 7, top: -20, left: 140, delay: 1 },
    { symbols: ["n"], id: 8, top: 68, left: 10, delay: 1 },
    { symbols: ["v"], id: 9, top: 230, left: 778, delay: 1.5 },
    { symbols: ["l"], id: 10, top: 50, left: 778, delay: 1.5 },
  ],
  [
    { symbols: ["l", "n", "_"], id: 11, top: -20, left: 140, delay: 1 },
    { symbols: ["_", "l"], id: 12, top: 230, left: 778, delay: 1 },
  ],

  [
    { symbols: ["l"], id: 13, top: -38, left: -57, delay: 1 },
    { symbols: ["n"], id: 14, top: 127, left: -60, delay: 1 },
    { symbols: ["_"], id: 15, top: 268, left: -52, delay: 1 },
    { symbols: ["v"], id: 16, top: 406, left: -57, delay: 1 },

    { symbols: ["l"], id: 17, top: -33, left: 785, delay: 1 },
    { symbols: ["n"], id: 18, top: 127, left: 788, delay: 1 },
    { symbols: ["_"], id: 19, top: 268, left: 783, delay: 1 },
    { symbols: ["v"], id: 20, top: 424, left: 785, delay: 1 },
  ],

  // [
  //   { symbols: ["l", "v", "_"], id: 6, top: 466, left: 801, delay: 1 },
  //   { symbols: ["l", "O", "v"], id: 7, top: -32, left: 640, delay: 1 },
  //   { symbols: ["n", "v", "O"], id: 8, top: -28, left: -39, delay: 1 },
  // ],
  // [
  //   { symbols: ["O", "n", "_"], id: 9, top: 436, left: -37, delay: 1 },
  //   { symbols: ["_", "O", "l"], id: 10, top: -43, left: -8, delay: 1 },
  //   { symbols: ["v", "l", "O"], id: 11, top: -37, left: 639, delay: 1 },
  // ],
];

let enemiesArray = [];

let currentWave = allWaves[0];

//=================== ENEMY CLASS ========================================================

class Enemy {
  constructor(symbols, id, top, left, delay) {
    this.symbols = symbols; //array
    this.id = `baddie-${id}`;
    this.top = top;
    this.left = left;
    this.isDead = false;
    this.delay = delay;
  }

  createHtml() {
    //appears on screen

    let enemyDiv = document.createElement("div");
    enemyDiv.classList.add("enemyCss");
    enemyDiv.setAttribute("id", this.id);

    enemyDiv.style.top = `${this.top}px`;
    enemyDiv.style.left = `${this.left}px`;

    let ul = document.createElement("ul");
    ul.setAttribute("class", "symbols");

    this.symbols.forEach((element) => {
      let li = document.createElement("li");
      li.setAttribute("class", element);

      ul.appendChild(li);
    });

    enemyDiv.appendChild(ul);

    return enemyDiv;
  } //end of createHtml()

  appearOnScreen(enemyHtml) {
    setTimeout(() => {
      enemyHtml.classList.toggle("appear");
      main.appendChild(enemyHtml);

      let enemy = document.getElementById(this.id);
      let enemyEndingCoordinates = enemy.getBoundingClientRect();
      // console.log(enemyEndingCoordinates);

      setTimeout(() => {
        enemyHtml.classList.toggle("appear");
        enemyHtml.classList.toggle("enemyMoves"); //starts moving and lasts 7 secs

        // setTimeout(() => {
        //   this.attack();
        // }, 6000);
      }, 1000);
    }, 0);
  }

  die() {
    this.isDead = true;
    let baddieDiv = document.getElementById(this.id);

    let myMain = document.getElementById("myMain");
    let mainCoordinates = myMain.getBoundingClientRect();
    let enemyEndingCoordinates = baddieDiv.getBoundingClientRect();
    // console.log(this);
    // console.log(enemyEndingCoordinates);
    // console.log(mainCoordinates);
    // this.getPosition();
    let x = Math.abs(enemyEndingCoordinates.left - (mainCoordinates.left + 18));
    let y = Math.abs(enemyEndingCoordinates.top - (mainCoordinates.top + 18));

    // console.log(this.id);
    baddieDiv.setAttribute("class", "poof"); //this will overwrite any previous classes
    baddieDiv.style.top = `${y}px`;
    baddieDiv.style.left = `${x}px`;

    // baddieDiv.classList.toggle("enemyCss");

    setTimeout(() => {
      baddieDiv.remove(); //removing enemy's HTML
      enemiesArray = enemiesArray.filter((element) => element.isDead !== true); //removing enemy from array by assigning enemiesArray a new value

      console.log(enemiesArray);

      if (!(allWaves.indexOf(currentWave) === allWaves.length - 1)) {
        this.respawn();
      }
    }, 600);

    // console.log(enemiesArray);
  }

  respawn() {
    if (enemiesArray.length === 0) {
      currentWave = allWaves[allWaves.indexOf(currentWave) + 1];
      // console.log(currentWave);
      // console.log(allWaves.indexOf(currentWave));
      generateBaddies(currentWave);
    }
  }

  attack() {
    let enemy = document.getElementById(this.id);

    // if enemy is still on screen (exists)
    if (enemy) {
      let myMain = document.getElementById("myMain");
      let mainCoordinates = myMain.getBoundingClientRect();
      let enemyEndingCoordinates = enemy.getBoundingClientRect();
      // console.log(this);
      // console.log(enemyEndingCoordinates);
      // console.log(mainCoordinates);
      let x = Math.abs(enemyEndingCoordinates.left - mainCoordinates.left);
      let y = Math.abs(enemyEndingCoordinates.top - mainCoordinates.top);
      // console.log(x);
      // console.log(y);
      // if(enemyEndingCoordinates.left >= 438 && enemyEndingCoordinates.top >= 644){} // ASK ABOUT THIS

      // enemy.classList.toggle("enemyCss");
      // enemy.remove();
      // enemiesArray = enemiesArray.filter((element) => element.isDead !== true);
      // let leftOffset = enemy.documentOffsetLeft;
      // console.log(leftOffset);
      //==========================================================
      // if (leftOffset >= 670 || leftOffset <= 675) {
      doodleChampion.hearts = doodleChampion.hearts - 1;
      lifeMeter.innerHTML = `HEARTS: ${doodleChampion.hearts}`;
      //=======
      if (doodleChampion.hearts === 0) {
        championDiv.remove();

        gameOver.classList.add("overlay");
        gameOver.innerHTML = "GAME OVER";
        // }
      }
    }
  } //end of attack()
} //end of class

//=================== GENERATE BADDIES FUNCTION ==========================================

function generateBaddies(currentWave) {
  currentWave.forEach((element) => {
    let baddie = new Enemy(
      element.symbols,
      element.id,
      element.top,
      element.left,
      element.delay
    );

    setTimeout(() => {
      enemiesArray.push(baddie);

      let enemyHtml = baddie.createHtml();
      baddie.appearOnScreen(enemyHtml);
    }, baddie.delay * 1000); ///////////////////
  });
  // displayBaddies();
} //end of generateBaddies()

//======================= GENERATE BADDIE'S HTML ======================================

// function displayBaddies() {
//   enemiesArray.forEach((element) => {
//     let enemyHtml = element.createHtml();
//     element.appearOnScreen(enemyHtml);
//   });
// }

//================================== CHAMPION CLASS ======================================

class Champion {
  constructor(name) {
    this.name;
    this.hearts = 4; //aka lives/health
    this.score = 0;
    this.isDead = false; //so far not using it........................REMOVE
  } //end of constructor

  attack() {
    // console.log(enemiesArray);

    const verticalArray = ["l", "I", "1", "/", "i", "\\", "|", ")", "(", "7"];
    const horizontalArray = ["-", "_"];
    const upArrowArray = ["^", "n", "A", "~"];
    const downArrowArray = ["v", "V", "✓", "u", "U", "w", "W"];
    const circleArray = ["O", "①", "⊖", "@", "0", "o", "◦"];

    //=========== CHECKING IF USER ATTACK MATCHES VERTICAL ELEMENTS IN ARRAY
    if (verticalArray.find((element) => element === userAttack)) {
      // console.log("Looks like a vertical attack");

      //Now that we know its a vertical attack, we check which enemies have the letter "l" and get hurt:
      enemiesArray.forEach((enemy) => {
        if (enemy.symbols[0] === "l") {
          enemy.symbols.shift(); //removed first symbol from enemy(object)'s array
          let li = document.querySelector(`#${enemy.id} .symbols > li`);
          li.remove();

          this.score += 100;
          scoreBoard.innerHTML = `SCORE: ${this.score}`;

          if (enemy.symbols.length === 0) {
            // console.log(`am i dying?`);
            enemy.die();
          }
        }
      });

      //============
    } else if (horizontalArray.find((element) => element === userAttack)) {
      // console.log("Looks like a Horizontal attack");

      enemiesArray.forEach((enemy) => {
        if (enemy.symbols[0] === "_") {
          enemy.symbols.shift();
          let li = document.querySelector(`#${enemy.id} .symbols > li`);
          // console.log(enemy);
          li.remove();

          this.score += 100;
          scoreBoard.innerHTML = `SCORE: ${this.score}`;

          if (enemy.symbols.length === 0) {
            enemy.die();
          }
        }
      });

      //===========
    } else if (upArrowArray.find((element) => element === userAttack)) {
      console.log("Looks like an upArrow attack");

      enemiesArray.forEach((enemy) => {
        if (enemy.symbols[0] === "n") {
          enemy.symbols.shift();
          let li = document.querySelector(`#${enemy.id} .symbols > li`);
          li.remove();

          this.score += 100;
          scoreBoard.innerHTML = `SCORE: ${this.score}`;

          if (enemy.symbols.length === 0) {
            enemy.die();
          }
        }
      });

      //=========
    } else if (downArrowArray.find((element) => element === userAttack)) {
      // console.log("Looks like a downArrow attack");

      enemiesArray.forEach((enemy) => {
        if (enemy.symbols[0] === "v") {
          enemy.symbols.shift();
          let li = document.querySelector(`#${enemy.id} .symbols > li`);
          li.remove();

          this.score += 100;
          scoreBoard.innerHTML = `SCORE: ${this.score}`;

          if (enemy.symbols.length === 0) {
            enemy.die();
          }
        }
      });

      //===================
    } else if (circleArray.find((element) => element === userAttack)) {
      // console.log("Looks like a circle attack");
      enemiesArray.forEach((enemy) => {
        if (enemy.symbols[0] === "O") {
          enemy.symbols.shift();
          let li = document.querySelector(`#${enemy.id} .symbols > li`);
          li.remove();

          this.score += 100;
          scoreBoard.innerHTML = `SCORE: ${this.score}`;

          if (enemy.symbols.length === 0) {
            enemy.die();
          }
        }
      });
    }

    // if (this.score === 500) {
    //   gameOver.classList.add("overlay");
    //   gameOver.innerHTML = "LEVEL CLEARED";
    // }
  } //end of a method
} //end of class

//================== INSTANTIATING OUR CHAMPION ==========================================

const doodleChampion = new Champion("champion"); // 'champion' goes to this.name but it is irrelevant for now.
lifeMeter.innerHTML = `HEARTS: ${doodleChampion.hearts}`;

//=================================== START BUTTON ======================================

function startGame() {
  //testing growing baddie
  document.getElementById("test").classList.add("grow");

  startButton.remove();

  generateBaddies(allWaves[0]);
}

//=================================== PAUSE BUTTON =========================================

function pauseAnimations() {
  enemiesArray.forEach((element) => {
    document.getElementById(element.id).classList.toggle("enemyMoves");
    // console.log(document.getElementById(element.id));
  });
}

/*============================== EDITOR (DRAWING PAD) =======================================

//'EXPORTED' is an event listener that listens for the stroke.
//putting an eventListener for after a stroke has been exported to the recog cloud. 
//This is where we can access info about the exported item, including the recognition results/ candidates. */

//ANYTHING INSIDE OF THE EVENT LISTENER WILL ONLY HAPPEN IF WE DRAW ANYTHING ON THE SCREEN!!!!!!!!!!!!!

editorElement.addEventListener("exported", (event) => {
  //our results are sent back as a string, so .parse will turn them back into an Object so we can access it through Dot-Notation:

  apiResults = JSON.parse(
    event.detail.exports["application/vnd.myscript.jiix"] //capturing apiResults //path in object
  );

  if (apiResults.label !== "") {
    //the code belowe will only happen if our label is returned NOT EMPTY:

    userAttack = apiResults.label; //capturing API's BEST GUESS

    //I want each stroke to be analized individually, otherwise itll combine them and try to read them as ONE:

    iink.InkModel.clearModel(editorElement.editor.model);

    editorElement.editor.clear();

    //This is where the attack happens:
    doodleChampion.attack();
  }
}); //end of exported event listener

//=======================================================================================
//API SETUP (required by API docs)

const configuration = {
  //required by the API (as instructed by documentation)
  recognitionParams: {
    iink: {
      gesture: {
        enable: false, //turning magic gestures OFF
      },
      text: {
        guides: {
          enable: false, //removing the 'paper guideLines'
        },
        smartGuide: false, //turning OFF 'suggestions bar'
      },
    },
    type: "TEXT",
    protocol: "WEBSOCKET",
    server: {
      applicationKey: "5dc4c089-2061-4520-8bbd-019a9d19cb02",
      hmacKey: "b21b60ca-b781-44a4-88d9-ca3272228d86",
    },
  },
};

const pencilTheme = {
  ink: {
    //where we're styling our pen/pencil/brush.....
    color: "#0080ffbd",
    "-myscript-pen-width": 5,
  },
  ".text": {
    //where we're styling the text
    "font-size": 10,
  },
};

iink.register(editorElement, configuration, null, pencilTheme); //instantiating our drawing pad/API object

//=======================================================================================

//=======================================================
