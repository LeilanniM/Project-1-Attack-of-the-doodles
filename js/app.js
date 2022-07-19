//================================ Global access: ====================================================
let candidates;
let apiResults;
const verticalLineArray = ["l", "I", "1", "/", "i", "\\", "|", ")", "(", "7"];
const horizontalStrokeArray = ["-", "_"];
const upArrowArray = ["^", "n", "A", "~"];
const downArrowArray = ["v", "V", "✓", "u", "U", "w", "W"];
const heartArray = ["❤", "💓", "💙", "💕", "💔"];

const editorElement = document.getElementById("editor"); // grabbing DIV with "editor" ID
const results = document.querySelector("#results"); //temporary

const main = document.querySelector("main");

//============================== EDITOR (DRAWING PAD) =======================================

//I want each stroke to be analized by the recognition software individually, regardless of other strokes being drawn right after (otherwise itll combine them and treat them all as one):

//'exported' is an event listener that listens for the stroke
//putting a listener for after a stroke has been exported to the recog cloud. This is where we can access info about the exported item, including the recognition results/ candidates.

editorElement.addEventListener("exported", (event) => {
  // console.log(event.detail.exports["application/vnd.myscript.jiix"]); //before it is parsed it is in the form of a string
  apiResults = JSON.parse(
    event.detail.exports["application/vnd.myscript.jiix"] //capturing apiResults //path in object
  );

  console.log(apiResults);

  //the 'exported' event happens even when it just loads or anything changes on the screen AKA even when strokes aren't being made. We do not want our code to work/run when there are no strokes being made, so we are adding an if statement that will filter that:

  if (apiResults.label !== "") {
    // console.log(event);

    //============

    //this is where our badguys use to die

    //============

    // editorElement.editor.clear(); //API method for clearing the 'drawing pad' of any stroke before anything else is drawn. (parft of documentation, not JS keywords or JS vanilla methods)
    candidates = apiResults.words[0].candidates; // ====================================> these are the candidates *******************
    console.log(candidates);
    results.innerHTML = candidates;

    if (candidates.length > 0) {
      iink.InkModel.clearModel(editorElement.editor.model); //this will clear the model containing stroke info after ONE STROKE,
      editorElement.editor.clear(); //this will clear the actual screen
    }
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

//=================== ENEMY CLASS ========================================================

class Enemy {
  constructor(type, signs, id, top, left) {
    this.type = type; //Single sign OR Combo
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

//================ CHAMPION CLASS ========================================================

class Champion {
  constructor(name) {
    this.name;
    this.hearts = 5;
    this.points = 0;
    this.attacks = {
      verticalAttack: () => {
        verticalLineArray.find((element) => {
          if (element === apiResults.label) {
            //eliminate Vertical enemy
            console.log(`vertical enemy has been eliminates`);
          }
        });
      },
      horizontalAttack: () => {
        horizontalStrokeArray.find((element) => {
          if (element === apiResults.label) {
            //eliminate Horizontal enemy
            console.log(`horizontal enemy has been eliminates`);
          }
        });
      },
      upArrowAttack: () => {
        upArrowArray.find((element) => {
          if (element === apiResults.label) {
            //eliminate upArrow enemy
            console.log(`uparrow enemy has been eliminated`);
          }
        });
      },
      downArrowAttack: () => {
        downArrowArray.find((element) => {
          if (element === apiResults.label) {
            //eliminate downArrow enemy
            console.log(`downArrow enemy has been eliminated`);
          }
        });
      },
    }; //object with attacks ends
  }

  attack() {
    //draws enemy's sign
  }
}
