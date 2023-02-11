//*********************
// variable declaration
//*********************

const block = document.querySelectorAll(".grid-item");
const container = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const winLable = document.querySelector(".winner-greeting");
const drawLable = document.querySelector(".winner-svg");
const x_socre = document.querySelector(".score__x__change");
const O_socre = document.querySelector(".score__O__change");
const draw = document.querySelector(".score__Draw__change");

// !!=== variable ==========
let count = 0;
let player;
let score = {
  X: 0,
  O: 0,
  draw: 0,
};

//*********************
// Function declaration
//*********************

const mainGame = function (i) {
  if (block[i].innerHTML == "") {
    if (count % 2 == 0) {
      player = "O";
      block[i].style.color = "#fdba74";
    } else {
      player = "X";
      block[i].style.color = "#52525b";
    }

    block[i].innerHTML = player;
    count++;
    checkDraw();
    checkWin(player);
  }
};

const checkWin = function (player) {
  if (
    (block[0].innerHTML == player &&
      block[1].innerHTML == player &&
      block[2].innerHTML == player) ||
    (block[0].innerHTML == player &&
      block[3].innerHTML == player &&
      block[6].innerHTML == player) ||
    (block[0].innerHTML == player &&
      block[4].innerHTML == player &&
      block[8].innerHTML == player) ||
    (block[1].innerHTML == player &&
      block[4].innerHTML == player &&
      block[7].innerHTML == player) ||
    (block[2].innerHTML == player &&
      block[5].innerHTML == player &&
      block[8].innerHTML == player) ||
    (block[2].innerHTML == player &&
      block[4].innerHTML == player &&
      block[6].innerHTML == player) ||
    (block[3].innerHTML == player &&
      block[4].innerHTML == player &&
      block[5].innerHTML == player) ||
    (block[6].innerHTML == player &&
      block[7].innerHTML == player &&
      block[8].innerHTML == player)
  ) {
    showPopup();
    if (player === "O") {
      score.O += 1;
      O_socre.innerHTML = score.O;
    }
    if (player === "X") {
      score.X += 1;
      x_socre.innerHTML = score.X;
    }

    drawLable.classList.remove("hidden");
    winLable.innerHTML = `The player "${player}" Won `;
  }
};

const checkDraw = function () {
  let remain = 9;
  block.forEach(function (ele, index) {
    if (!(ele.innerHTML == "")) {
      remain--;
    }
    if (remain === 0) {
      console.log("Enter");
      // ! draw score handaling
      score.draw += 1;
      console.log("draw", score.draw);
      draw.innerHTML = score.draw;
      showPopup();
      drawLable.classList.add("hidden");
      winLable.innerHTML = " Draw 🙌🏻 ";
    }
  });
};

const hidePopup = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const showPopup = function () {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};

//***************
// Event listener
//***************

// game board event listen
block.forEach(function (ele, index) {
  ele.addEventListener("click", function () {
    mainGame(index);
  });
});

// pop up event listen
close.addEventListener("click", function () {
  hidePopup();
  block.forEach(function (element) {
    element.innerHTML = "";
  });
  count = 0;
});
