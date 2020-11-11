const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let score = 0;
noClicking = false

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target
  currentCard.style.backgroundColor = currentCard.classList[0];


  if (card1 === null) {
    card1 = currentCard;
    card1.classList.add("flipped");
  // tried toggling "flipped" but I guess it doesn't work
  }
  else if (card1 !==null && card2 === null) {
    card1 = card1
    card2 = currentCard;
    card2.classList.add("flipped")
  }

  if (card1 !== null && card2 !== null) {
    flip1 = card1.classList[0];
    flip2 = card2.classList[0];
    
    if (flip1 === flip2) {
    score++;
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
    card1 = null;
    card2 = null;
    }    
  
    else {
      setTimeout(function(){
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1 = null;
        card2 = null;
      }, 1000)
    }
  }

  if (score === 5){
    return alert("DONE")
  } 
}

// when the DOM loads
createDivsForColors(shuffledColors);