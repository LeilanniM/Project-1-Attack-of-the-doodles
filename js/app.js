const editorElement = document.getElementById("editor"); // grabbing DIV with "editor" ID

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
