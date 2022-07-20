//============ Reference for understanding apiResults path ============
// words = [
//   {
//     label: "l",
//     candidates: ["l", "I", "1", "/", "i"],
//   },
// ];

//================================ Global access: ====================================================
let candidates;
let apiResults;
let label; //it is the API's bestGuess
const verticalArray = ["l", "I", "1", "/", "i", "\\", "|", ")", "(", "7"];
const horizontalArray = ["-", "_"];
const upArrowArray = ["^", "n", "A", "~"];
const downArrowArray = ["v", "V", "✓", "u", "U", "w", "W"];
const heartArray = ["❤", "💓", "💙", "💕", "💔"];

const championDiv = document.querySelector("#champion"); //grabbing champion DIV
const editorElement = document.getElementById("editor"); // grabbing DIV with "editor" ID
const results = document.querySelector("#results"); //temporary

const main = document.querySelector("main");

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
  }

  getsCreatedInHtml() {
    //like in enemyFactory()
  }

  doodleAttack() {
    //by touching champion
  }
} //end of class

//===================== INSTANTIATING VERTICAL ENEMY ===============

const verticalEnemy = new Enemy("single", "|", "verticalEnemy", 0, 0);

//================ CHAMPION CLASS ========================================================

class Champion {
  constructor(name) {
    this.name;
    this.hearts = 5; //aka lives/health
    this.points = 0;
  } //end of constructor

  attack() {
    if (verticalArray.find((element) => element === label)) {
      console.log("You vertically attacked the enemy");
      //verticalEnemy shall disappear
    } else if (horizontalArray.find((element) => element === label)) {
      console.log("You horizontally attacked the enemy");
      //horizontalEnemy shall disappear
    } else if (upArrowArray.find((element) => element === label)) {
      console.log("You upArrow attacked the enemy");
      //upArrowEnemy shall disappear
    } else if (downArrowArray.find((element) => element === label)) {
      console.log("You downArrow attacked the enemy");
      //downArrowEnemy shall disappear
    }
  } //end of a method
} //end of class

//================== INSTANTIATING OUR CHAMPION ========================

const doodleMaster = new Champion("champion");

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
    console.log(apiResults);

    label = apiResults.label;
    console.log(label);

    //I want each stroke to be analized individually, otherwise itll combine them and try to read them as ONE:

    iink.InkModel.clearModel(editorElement.editor.model);

    editorElement.editor.clear();

    doodleMaster.attack();
  }
}); //end of exported event listener

//==========================================
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
