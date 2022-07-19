//========================= VERSION 1 ============================================
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

// function spawn(badguy) {
//   setTimeout(() => {
//     badguy.classList.toggle("badguySpawns"); //turnON badguy (appears)

//     setTimeout(() => {
//       badguy.classList.toggle("badguyMoves"); //turnON badguyMoves

//       setTimeout(() => {
//         badguy.removeAttribute("class"); //turnOFF badguy & badguyMoves
//       }, 3000);

//     }, 1000);

//   }, 500);
// }

//========================= VERSION 2 ============================================

//=================== ENEMY CLASS ========================================================

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

//=============================UP ARROW ENEMY ===============================================

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
/* INSIDE EDITOR FUNCTION */
//=========================================================================================

//============

verticalLineArray.find((element) => {
  if (element === apiResults.label) {
    console.log(`valid vertical stroke, it matches our bestGuess: ${element}`);
    verticalEnemy.remove();
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
    console.log(`valid up Arrow stroke, it matches our best guess: ${element}`);
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
