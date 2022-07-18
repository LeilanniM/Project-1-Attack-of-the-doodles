class Badguy {
  constructor(name) {
    this.name = name;
  }
}

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

//====================================================================
