//=========================================================================
//DOCUMENTATION INSTRUCTIONS AND METHODS

const editorElement = document.getElementById("editor"); // grabbing DIV with "editor" ID

const results = document.querySelector("#results");

//I want each stroke to be analized by the recognition software individually, regardless of other strokes being drawn right after (otherwise itll combine them and treat them all as one):

editorElement.addEventListener("exported", (event) => {
  let apiResults = JSON.parse(
    event.detail.exports["application/vnd.myscript.jiix"] //capturing apiResults
  );
  console.log(apiResults);
  //putting a listener for after a stroke has been exported to the recog cloud. This is where we can access info about the exported item, including the recognition results/ candidates.
  if (apiResults.label !== "") {
    //.detail was instructed by them. | If event has details:
    console.log(event);

    // editorElement.editor.clear(); //API method for clearing the 'drawing pad' of any stroke before anything else is drawn. (parft of documentation, not JS keywords or JS vanilla methods)
    let candidates = apiResults.words[0].candidates; // ====================================> these are the candidates *******************
    console.log(candidates);
    results.innerHTML = candidates;

    if (candidates.length > 0) {
      iink.InkModel.clearModel(editorElement.editor.model); //this will clear the model containing stroke info after ONE STROKE,
      editorElement.editor.clear(); //this will clear the actual screen
    }
  }
}); //end of exported event listener

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

iink.register(editorElement, configuration, null, pencilTheme); //instantiating our drawing pad API object

//==========================================================================

const start = document.querySelector("#start");
start.addEventListener("click", () => {
  spawn(badguy1);
});

//section 1:
const main = document.querySelector("main");
const badguy1 = document.createElement("div"); //creating a div for badguy
main.appendChild(badguy1); //appending it to main
badguy1.setAttribute("id", "badguy");

//section 2:
function spawn(badguy) {
  setTimeout(() => {
    badguy.classList.toggle("badguySpawns"); //turnON badguy (appears)
    setTimeout(() => {
      badguy.classList.toggle("badguyMoves"); //turnON badguyMoves
      setTimeout(() => {
        badguy.removeAttribute("class"); //turnOFF badguy & badguyMoves
      }, 3000);
    }, 1000);
  }, 500);
}
