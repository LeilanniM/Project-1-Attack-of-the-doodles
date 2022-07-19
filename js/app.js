const editorElement = document.getElementById("editor"); // grabbing DIV with "editor" ID
const results = document.querySelector("#results"); //temporary
const baddie1 = document.querySelector("#baddie1");
const baddie2 = document.querySelector("#baddie2");

const main = document.querySelector("main");

//=================== ENEMY CLASS ================================================

class Enemy {
  constructor(signs, id, top, left) {
    this.signs = signs; //array
    this.id = id;
    this.top = top;
    this.left = left;
  }
}

//================== ENEMY FACTORY ==============================================

function enemyFactory(enemy) {
  let div = document.createElement("div");
  div.classList.add("enemyCss");
  div.setAttribute("id", enemy.id);
  // div.style.position = "absolute";
  div.style.top = `${enemy.top}px`;
  div.style.left = `${enemy.left}px`;

  let ul = document.createElement("ul");
  ul.setAttribute("class", "signs");

  enemy.signs.forEach((element) => {
    let li = document.createElement("li");
    li.innerHTML = element;
    ul.appendChild(li);
  });

  div.appendChild(ul);

  console.log(div);
  return div;
} //end of enemyFacotry

//===================== VERTICAL ENEMY  =====================================================

const verticalEnemyData = new Enemy(["|"], "verticalEnemy", 483, 866); //instantiating our first enemyData
// console.log(verticalEnemyData);

let verticalEnemy = enemyFactory(verticalEnemyData); //capturing our first enemy with verticalEnemyData
main.appendChild(verticalEnemy);

setTimeout(() => {
  verticalEnemy.classList.add("verticalEnemyMoves");
}, 1000);

setTimeout(() => {
  verticalEnemy.remove(); //this will be his attack
}, 5000);

//========================== HORIZONTAL ENEMY  =============================================

const horizontalEnemyData = new Enemy(["-"], "horizontalEnemy", 483, 0);

setTimeout(() => {
  let horizontalEnemy = enemyFactory(horizontalEnemyData);
  main.appendChild(horizontalEnemy);
}, 1000);

setTimeout(() => {
  horizontalEnemy.classList.add("horizontalEnemyMoves");
}, 2000);

setTimeout(() => {
  horizontalEnemy.remove();
}, 6000);

//=============================UP ARROW ENEMY =======================================

const upArrowEnemyData = new Enemy(["^"], "upArrowEnemy", 34, 0);

setTimeout(() => {
  let upArrowEnemy = enemyFactory(upArrowEnemyData);
  main.appendChild(upArrowEnemy);
}, 2000);

setTimeout(() => {
  upArrowEnemy.classList.add("upArrowEnemyMoves");
}, 3000);

setTimeout(() => {
  upArrowEnemy.remove();
}, 7000);

//================================DOWN ARROW ENEMY ========================================

const downArrowEnemyData = new Enemy(["v"], "downArrowEnemy", 34, 868);

setTimeout(() => {
  let downArrowEnemy = enemyFactory(downArrowEnemyData);
  main.appendChild(downArrowEnemy);
}, 3000);

setTimeout(() => {
  downArrowEnemy.classList.add("downArrowEnemyMoves");
}, 4000);

setTimeout(() => {
  downArrowEnemy.remove();
}, 8000);

//=========================================================================================
/* ROUND 2  RESPAWN */
//=========================================================================================

//========================================================================================

//I want each stroke to be analized by the recognition software individually, regardless of other strokes being drawn right after (otherwise itll combine them and treat them all as one):

//Global access:
let candidates;
let apiResults;
const verticalLineArray = ["l", "I", "1", "/", "i", "\\", "|", ")", "(", "7"];
const horizontalStrokeArray = ["-", "_"];
const upArrowArray = ["^", "n", "A", "~"];
const downArrowArray = ["v", "V", "✓", "u", "U", "w", "W"];
const heartArray = ["❤", "💓", "💙", "💕", "💔"];

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

    verticalLineArray.find((element) => {
      if (element === apiResults.label) {
        console.log(
          `valid vertical stroke, it matches our bestGuess: ${element}`
        );
        verticalEnemy.remove();
        // badguy.removeAttribute("class"); // <----- UNCOMMENT WHEN WE HAVE BADGUY READY
        //if stroke matches one of our elements in the array, badguy will 'dissapear'
      }
    });

    horizontalStrokeArray.find((element) => {
      if (element === apiResults.label) {
        console.log(
          `valid horizontal stroke, it matches our best guess: ${element}`
        );
        horizontalEnemy.remove();
      }
    });

    upArrowArray.find((element) => {
      if (element === apiResults.label) {
        console.log(
          `valid up Arrow stroke, it matches our best guess: ${element}`
        );
        upArrowEnemy.remove();
      }
    });

    downArrowArray.find((element) => {
      if (element === apiResults.label) {
        console.log(
          `valid down Arrow stroke, it matches our best guess ${element}`
        );
        downArrowEnemy.remove();
      }
    });

    heartArray.find((element) => {
      if (element === apiResults.label) {
        console.log(`valid heart, it matches our best guess ${element}`);
      }
    });

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

//=========================================================================
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

//==========================================================================

//Object Reference
// const apiResults2 = {
//   type: "Text",
//   label: "l",
//   words: [
//     {
//       label: "l",
//       candidates: ["l", "I", "1", "\\", "/"],
//     },
//   ],
//   version: "3",
//   id: "MainBlock",
// };
