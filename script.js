const choices = ["scissor", "paper", "rock"]; // array that will be pick by computer
const playerChoice = document.querySelector(".player-choice"); // getting the class of container that will put the img of hand sign pick of player
const computerChoice = document.querySelector(".computer-choice"); // the container that will nest the img of pick by computer
const loadingAnimation = document.getElementById("loadingAnimation"); // the loading animation for css that can be use to hide and appear
const computerImg = document.getElementById("computerImg"); // this can be used to appear the img of pick of computer after the loading animation
const buttons = document.querySelectorAll("button"); //targeting all buttons that can be able or disable
const playAgainBtn = document.getElementById("playAgainBtn"); // the play again button after the round
const refreshBtn = document.getElementById("refreshBtn");
refreshBtn.addEventListener("click", function () {
  window.location.reload();
});
let resultDom = document.getElementById("result"); // the result dom if you are win, lose, or tie in a round
let playerScore = 0; // this is the score of player that can increase
let computerScore = 0; // the computer score that can also increase

//a function that the computer will automatically pick
function getComputerPick() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

//the function that will return the result of round
function getResult(playerPick, computerPick) {
  if (playerPick === computerPick) {
    return "tie";
  }

  switch (playerPick) {
    case "scissor":
      return computerPick === "paper" ? "win" : "lose";
    case "paper":
      return computerPick === "rock" ? "win" : "lose";
    case "rock":
      return computerPick === "scissor" ? "win" : "lose";
  }
}

// a function that will update the dom of webpage
function updateDOM(playerPick, computerPick) {
  // Clear previous choices
  playerChoice.innerHTML = "";
  loadingAnimation.classList.remove("hidden");
  computerImg.classList.add("hidden");

  // Create and append player image
  const playerImg = document.createElement("img");
  playerImg.src = `${playerPick}.png`;
  playerChoice.append(playerImg);
  // Create and append computer image
}

// this is the most important function that after the play choose of they hand sign pick all function that we create will goes here
function playerPick(choice) {
  document
    .querySelectorAll("#scissorBtn, #paperBtn, #rockBtn")
    .forEach((button) => (button.disabled = true)); //disabling picking button
  const computerPick = getComputerPick(); // getting the random pick of computer using the function we create at the line 13
  const result = getResult(choice, computerPick); // getting the result using a function that we create at the line 19 with the parameter base of player choice at the html file and base the computer random pick
  const playerScoringContainer = document.querySelector(
    ".player .scoring-container"
  ); // getting the container of the scoring box of player at the webpage you will see the 3 circle and the box of itself is the container
  const computerScoringContainer = document.querySelector(
    ".computer .scoring-container"
  ); // also goes here getting the scoring container

  const playerPoints = playerScoringContainer.querySelectorAll(".player-point"); //after getting the container of player at the line 56 this is the time to get the class of 3 circle in the web page so we can update the background color of it after winning
  const computerPoints =
    computerScoringContainer.querySelectorAll(".computer-point"); // also goes here after getting the class of container at the line 59

  updateDOM(choice, computerPick); // now calling the updateDom that we create at the line 35 this function it will remove the previous img of choice of player at the previous round then will add the loading animation for picking of computer then appending the current img that pick by player at the current round

  //now the set time out function that will appearing the img of picked by computer
  // after removing the loading animation and updating the background color of 3 circle that you will see at the webpage
  // then appearing the button that will let us to play again for another round
  // this timeout will having 2 seconds before executing all the code inside
  setTimeout(() => {
    // Hide loading animation and show computer's choice
    loadingAnimation.classList.add("hidden");
    computerImg.src = `${computerPick}.png`;
    computerImg.classList.remove("hidden");
    resultDom.innerHTML = result === "tie" ? `"tie"` : `"you ${result}"`;
    if (result === "win") {
      if (playerScore === 2) {
        document
          .querySelectorAll("#scissorBtn", "#paperBtn", "#rockBtn")
          .forEach((button) => (button.disabled = true)); //disabling all picking button after winning all rounds of player
        playerPoints[2].style.backgroundColor = "green"; //coloring the background color of circle at index 2 after hitting again the win at current 2 points of player
        let playerWin = document.getElementById("winner");
        playerWin.innerHTML = "Player Win";
        playerWin.classList.remove("hidden");
      } else if (playerScore < playerPoints.length) {
        playerPoints[playerScore].style.backgroundColor = "green";
        playAgainBtn.classList.remove("hidden");
      }
      playerScore++;
    } else if (result === "lose") {
      if (computerScore === 2) {
        document
          .querySelectorAll("#scissorBtn", "#paperBtn", "#rockBtn")
          .forEach((button) => (button.disabled = true)); //disabling all picking button after winning all rounds of computer
        computerPoints[2].style.backgroundColor = "green"; //coloring the background color of circle at index 2 after hitting again the win at current 2 points of computer
        let computerWin = document.getElementById("winner");
        computerWin.innerHTML = "Computer Win";
        computerWin.classList.remove("hidden");
      } else if (computerScore < computerPoints.length) {
        computerPoints[computerScore].style.backgroundColor = "green";
        playAgainBtn.classList.remove("hidden");
      }
      computerScore++;
    } else if (result === "tie") {
      playAgainBtn.classList.remove("hidden");
    }
  }, 2000);
}

//this the reset game that the onclick of play again wil have it will remove the dom, appearing again the loading animation, and remove the current reset button because it was another match, and enable all the picking button again
//remember that this function are only at the onclick of play again button at the html and that button will appear after the settimeout function at the line 72-89
function resetGame() {
  playerChoice.innerHTML = "";
  resultDom.innerHTML = "";
  computerImg.classList.add("hidden");

  loadingAnimation.classList.remove("hidden");
  playAgainBtn.classList.add("hidden");

  document
    .querySelectorAll("#scissorBtn, #paperBtn, #rockBtn")
    .forEach((button) => (button.disabled = false));
}

function playAnother() {}
