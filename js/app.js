//============ Reference for understanding apiResults path ========================================
// words = [
//   {
//     label: "l",
//     candidates: ["l", "I", "1", "/", "i"],
//   },
// ];

//=================================== FORMULA FOR TRACKING OFFSETS ===================================

Object.defineProperty(Element.prototype, "documentOffsetTop", {
  get: function () {
    return (
      this.offsetTop +
      (this.offsetParent ? this.offsetParent.documentOffsetTop : 0)
    );
  },
});

Object.defineProperty(Element.prototype, "documentOffsetLeft", {
  get: function () {
    return (
      this.offsetLeft +
      (this.offsetParent ? this.offsetParent.documentOffsetLeft : 0)
    );
  },
});

// let x = enemy.documentOffsetLeft;

// console.log(x);

//================================ Global access: ====================================================
let candidates;
let apiResults;
let userAttack; //it is the API's bestGuess
let enemyDiv;

const heartArray = ["❤", "💓", "💙", "💕", "💔"];

const championDiv = document.querySelector("#champion"); //grabbing champion DIV
const editorElement = document.getElementById("editor"); // grabbing DIV with "editor" ID
const scoreBoard = document.querySelector("#scoreBoard"); //temporary
const lifeMeter = document.querySelector("#lifeMeter"); //temporary

const main = document.querySelector("main");

const gameOver = document.querySelector(".gameOver");
//===================================== ENEMIES ARRAY =====================================

let enemiesArray = [];

//=================== ENEMY CLASS ========================================================

class Enemy {
  constructor(type, signs, id, top, left) {
    this.type = type; //Single sign OR Combo signs
    this.signs = signs; //array
    this.id = id; //not sure if necessary
    this.top = top;
    this.left = left;
    this.isDead = false;
  }

  spawn() {
    //appears on screen
    enemyDiv = document.createElement("enemyDiv");
    enemyDiv.classList.add("enemyCss");
    enemyDiv.setAttribute("id", this.id);

    enemyDiv.style.top = `${this.top}px`;
    enemyDiv.style.left = `${this.left}px`;

    let ul = document.createElement("ul");
    ul.setAttribute("class", "signs");

    this.signs.forEach((element) => {
      let li = document.createElement("li");
      li.innerHTML = element;

      ul.appendChild(li);
    });

    enemyDiv.appendChild(ul);

    main.appendChild(enemyDiv);

    setTimeout((element) => {
      this.moves();
    }, 0);

    enemiesArray.push(this);
  } //end of spawn()

  moves() {
    //by touching champion aka MOVES towards it

    let enemy = document.getElementById(this.id);
    setTimeout(() => {
      enemy.classList.add("enemyMoves");
    }, 1000);

    setTimeout(() => {
      this.attack();
      enemy.remove();
    }, 5000);
  } //end of moves()

  attack() {
    let enemy = document.getElementById(this.id);
    if (enemy) {
      let leftOffset = enemy.documentOffsetLeft;
      // console.log(leftOffset);
      //=======
      if (leftOffset >= 670 || leftOffset <= 675) {
        doodleChampion.hearts = doodleChampion.hearts - 1;
        lifeMeter.innerHTML = doodleChampion.hearts;
        //=======
        if (doodleChampion.hearts === 0) {
          championDiv.remove();

          gameOver.classList.add("overlay");
          gameOver.innerHTML = "GAME OVER";
        }
      }
    }
  } //end of attack()
} //end of class

//===================== INSTANTIATING VERTICAL ENEMY ====================================

const verticalEnemy = new Enemy("single", ["|"], "verticalEnemy", 36, 0);
// enemiesArray.push(verticalEnemy);

//===================== INSTANTIATING HORIZONTAL ENEMY ====================================

const horizontalEnemy = new Enemy("single", ["-"], "horizontalEnemy", 36, 869);
// enemiesArray.push(horizontalEnemy);

//===================== INSTANTIATING DOWN ARROW ENEMY ====================================

const upArrowEnemy = new Enemy("single", ["^"], "upArrowEnemy", 487, 0);
// enemiesArray.push(upArrowEnemy);

//===================== INSTANTIATING UP ARROW ENEMY ====================================

const downArrowEnemy = new Enemy("single", ["v"], "downArrowEnemy", 485, 869);
// enemiesArray.push(downArrowEnemy);
//================================== CHAMPION CLASS ======================================

class Champion {
  constructor(name) {
    this.name;
    this.hearts = 4; //aka lives/health
    this.score = 0;
    this.isDead = false; //so far not using it........................REMOVE
  } //end of constructor

  attack() {
    console.log(enemiesArray);

    const verticalArray = ["l", "I", "1", "/", "i", "\\", "|", ")", "(", "7"];
    const horizontalArray = ["-", "_"];
    const upArrowArray = ["^", "n", "A", "~"];
    const downArrowArray = ["v", "V", "✓", "u", "U", "w", "W"];
    //===========
    if (verticalArray.find((element) => element === userAttack)) {
      console.log("Looks like a vertical attack");
      enemiesArray.forEach((enemy) => {
        if (enemy.isDead === false) {
          verticalArray.find((element) => {
            if (enemy.signs[0] === element) {
              let grab = document.querySelector(`#${enemy.id}`);
              grab.remove();
              this.score += 100;
              scoreBoard.innerHTML = this.score;
              enemy.isDead = true;
            }
          });
        }
      });

      //============
    } else if (horizontalArray.find((element) => element === userAttack)) {
      console.log("Looks like a Horizontal attack");
      enemiesArray.forEach((enemy) => {
        if (enemy.isDead === false) {
          horizontalArray.find((element) => {
            if (enemy.signs[0] === element) {
              let grab = document.querySelector(`#${enemy.id}`);
              grab.remove();
              this.score += 100;
              scoreBoard.innerHTML = this.score;

              enemy.isDead = true;
            }
          });
        }
      });

      //===========
    } else if (upArrowArray.find((element) => element === userAttack)) {
      console.log("Looks like an upArrow attack");
      enemiesArray.forEach((enemy) => {
        if (enemy.isDead === false) {
          upArrowArray.find((element) => {
            if (enemy.signs[0] === element) {
              let grab = document.querySelector(`#${enemy.id}`);
              grab.remove();
              this.score += 100;
              scoreBoard.innerHTML = this.score;
              enemy.isDead = true;
            }
          });
        }
      });

      //=========
    } else if (downArrowArray.find((element) => element === userAttack)) {
      console.log("Looks like a downArrow attack");
      enemiesArray.forEach((enemy) => {
        if (enemy.isDead === false) {
          downArrowArray.find((element) => {
            if (enemy.signs[0] === element) {
              let grab = document.querySelector(`#${enemy.id}`);
              grab.remove();
              this.score += 100;
              scoreBoard.innerHTML = this.score;
              enemy.isDead = true;
            }
          });
        }
      });
    }

    if (this.score === 400) {
      gameOver.classList.add("overlay");
      gameOver.innerHTML = "LEVEL CLEARED, YOU WIN... for now";
    }
  } //end of a method
} //end of class

//================== INSTANTIATING OUR CHAMPION ==========================================

const doodleChampion = new Champion("champion");
lifeMeter.innerHTML = doodleChampion.hearts;

//=================================== START BUTTON ======================================

setTimeout(() => {
  verticalEnemy.spawn();
}, 1000);

setTimeout(() => {
  horizontalEnemy.spawn();
}, 2000);

setTimeout(() => {
  upArrowEnemy.spawn();
}, 3000);

setTimeout(() => {
  downArrowEnemy.spawn();
}, 4000);

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
