// class Badguy {
//   constructor(name) {
//     this.name = name;
//   }
// }

// const badguy1 = new Badguy(); //instantiating first badguy

//add eventlistener for START button:

const start = document.querySelector("#start");
start.addEventListener("click", spawn);

//section 1:
const main = document.querySelector("main");
const badguy = document.createElement("div"); //creating a div for badguy
main.appendChild(badguy); //appending it to main
badguy.setAttribute("id", "badguy");

//section 2:
function spawn() {
  setTimeout(() => {
    badguy.classList.toggle("badguySpawns"); //turnON badguy (appears)
    setTimeout(() => {
      badguy.classList.toggle("badguyMoves"); //turnON badguyMoves
      setTimeout(() => {
        badguy.removeAttribute("class"); //turnOFF badguy1 & badguyMoves
      }, 3000);
    }, 1000);
  }, 500);
}

//what do I want?
//I want section 1 and section 2 to happen for
