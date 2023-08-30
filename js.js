let sen = [
  ["SNOW WHITE"],
  ["TOMATO TAMATO"],
  ["WATERMELON SUGAR"],
  ["THE GOOSE WITH THE GOLDEN EGG"],
];
let wordpos = [];
let words;
let sentence;
let wordIndex;
let earnings = 0;
let turncount = 0;

window.onload = start();
function start() {
  createboard();
  createabc();
  document.getElementById("popup2").style.display = "none";
  document.getElementById("popup3").style.display = "none";
  document.getElementById("finishedgame").style.display = "none";
  document.getElementById("iknowdiv").style.display = "none";
  document.getElementById("iknow").disabled = true;
  document.getElementById("incorrectguess").style.display = "none";

}

function createboard() {
  let row = 4;
  let colum = 14;
  let board = document.getElementById("board");
  let boxlist = "";
  let counter = 1;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < colum; j++) {
      if (counter == 1 || counter == 14 || counter == 43 || counter == 56) {
        boxlist += "<div class='box noborder' id='cell" + counter + "'></div>";
      } else {
        boxlist += "<div class='box' id='cell" + counter + "'></div>";
      }
      counter++;
    }
  }
  board.innerHTML = boxlist;
}

function createabc() {
  let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let str = "<center>";
  for (let i = 0; i < abc.length; i++) {
    str +=
      '<input type="button" onclick="checkletter(\'' +
      abc[i] +
      '\', this)" value="' +
      abc[i] +
      '">';
  }
  document.getElementById("letters").innerHTML = str + "</center>";
}

// ----------------------
// THE 'WHEEL'
// ----------------------
let wordlistvalues = [
  ["$950", 950],
  ["$0", 0],
  ["NOTHING!", 0],
  ["$800", 800],
  ["$500", 500],
  ["$650", 650],
  ["ONE MILLION $", 1000000],
  ["$900", 900],
  ["BANKRUPT", -1],
  ["$2,500", 2500],
  ["$500", 500],
  ["$900", 900],
  ["$700", 700],
  ["NOTHING!", 0],
  ["$650", 650],
  ["$500", 500],
  ["$700", 700],
  ["$500", 500],
  ["$600", 600],
  ["$550", 550],
  ["ONE MILLION $", 1000000],
  ["$600", 600],
  ["BANKRUPT", -1],
  ["$650", 650],
];
let wordlist = [
  "$950",
  "$0",
  "NOTHING!",
  "$800",
  "$500",
  "$650",
  "ONE MILLION $",
  "$900",
  "BANKRUPT",
  "$2,500",
  "$500",
  "$900",
  "$700",
  "NOTHING!",
  "$650",
  "$500",
  "$700",
  "$500",
  "$600",
  "$550",
  "ONE MILLION $",
  "$600",
  "BANKRUPT",
  "$650",
];
function buildSlotItem(text) {
  return $("<div>").addClass("slottt-machine-recipe__item").text(text);
}

function buildSlotContents($container, wordlist) {
  $items = wordlist.map(buildSlotItem);
  $container.append($items);
}

function popPushNItems($container, n) {
  $children = $container.find(".slottt-machine-recipe__item");
  $children.slice(0, n).insertAfter($children.last());

  if (n === $children.length) {
    popPushNItems($container, 1);
  }
}

// After the slide animation is complete, we want to pop some items off
// the front of the container and push them onto the end. This is
// so the animation can slide upward infinitely without adding
// inifinte div elements inside the container.
function rotateContents($container, n) {
  setTimeout(function () {
    popPushNItems($container, n);
    $container.css({ top: 0 });
  }, 300);
}

function randomSlotttIndex(max) {
  var randIndex = (Math.random() * max) | 0;
  return randIndex > 10 ? randIndex : randomSlotttIndex(max);
}

function animate() {
  wordIndex = randomSlotttIndex(wordlist.length);
  console.log(wordIndex);

  $wordbox.animate({ top: -wordIndex * 150 }, 500, "swing", function () {
    rotateContents($wordbox, wordIndex);
  });
}

function wheel() {
  console.log("hi!");
  $wordbox = $("#wordbox .slottt-machine-recipe__items_container");
  buildSlotContents($wordbox, wordlist);
  // buildSlotContents($wordbox, wordlist);
  // buildSlotContents($wordbox, wordlist);
  // buildSlotContents($wordbox, wordlist);

  //setInterval(animate, 2000);
  animate();

  setTimeout(() => checkbankrupt(), 1000);
}
function checkbankrupt() {
  let selected = document.getElementsByClassName(
    "slottt-machine-recipe__items_container"
  )[0].children[0].innerHTML;

  console.log(selected);
  if (selected == "BANKRUPT") {
    document.getElementById("ws").disabled = false;
    document.getElementById("iknow").disabled = true;
    document.getElementById("letterscon").style.display = "none";

    checkletter("A", null);
  } else {
    document.getElementById("ws").disabled = true;
    document.getElementById("iknow").disabled = false;

    document.getElementById("letterscon").style.display = "block";
    document.getElementById("popup3").style.display = "none";
  }
}

function startgame() {
  document.getElementById("shadow").style.display = "none";
  document.getElementById("popup").style.display = "none";
  document.getElementById("letterscon").style.display = "none";
  preparesen();
  drawsen();
}

function preparesen() {
  let randonum = Math.floor(Math.random() * sen.length);
  sentence = sen[randonum][0];
  words = sentence.split(" ");
  let pos = 3;
  let line = 1;
  for (let i = 0; i < words.length; i++) {
    if (pos - 1 + words[i].length < 13) {
      wordpos.push(pos + (line - 1) * 14);
      pos += words[i].length + 1;
      console.log(pos);
    } else {
      line++;
      pos = 3;
      i--;
    }
  }
  console.log(words);
  console.log(wordpos);
}

function drawsen() {
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      document
        .getElementById("cell" + (wordpos[i] + j))
        .classList.add("gamebox");
    }
  }
}
function explaincore() {
  document.getElementById("popup2").style.display = "block";
  document.getElementById("shadow").style.display = "block";
}
function openguesser() {
  document.getElementById("iknowdiv").style.display = "block";
  document.getElementById("shadow").style.display = "block";
}
function closebtn() {
  document.getElementById("shadow").style.display = "none";
  document.getElementById("popup2").style.display = "none";
  document.getElementById("popup3").style.display = "none";
  document.getElementById("iknowdiv").style.display = "none";
  document.getElementById("incorrectguess").style.display = "none";
}
function guess() {
  let guessval = document.getElementById("text").value.toUpperCase();
  console.log(guessval);
  let selected = document.getElementsByClassName(
    "slottt-machine-recipe__items_container"
  )[0].children[0].innerHTML;

  if (guessval == sentence) {
    letdivs = document.getElementsByClassName("gamebox");
    moneyadd = 0;
    for (let i = 0; i < letdivs.length; i++) {
      if (letdivs[i].innerHTML == "") {
        moneyadd += 1;
      }
    }
    let wordval = 0;
    for (let i = 0; i < wordlistvalues.length; i++) {
      if (wordlistvalues[i][0] == selected) {
        wordval = wordlistvalues[i][1];
      }
    }
    console.log(moneyadd, wordval);
    earnings += moneyadd * wordval;
    document.getElementById("iknowdiv").style.display = "none";
    document.getElementById("shadow").style.display = "none";
    turncount += 1;
    gamefinshed();
  } else {
    turncount += 1;
    document.getElementById("incorrectguess").style.display = "block";
    document.getElementById("shadow").style.display = "block";
  }
}

function checkletter(letter, div) {
  let gamefinshed = true;
  let text;

  let selected = document.getElementsByClassName(
    "slottt-machine-recipe__items_container"
  )[0].children[0].innerHTML;

  if (selected == "BANKRUPT") {
    earnings = 0;
    turncount += 1;
    text = "OH-NO you lost all your money!";
    let letdivs = document.getElementsByClassName("gamebox");
    for (let i = 0; i < letdivs.length; i++) {
      if (letdivs[i].innerHTML == "") {
        gamefinshed = false;
      }
    }
  } else {
    turncount += 1;
    let count = 0;
    for (let i = 0; i < sentence.length; i++) {
      if (sentence[i] == letter) {
        count++;
      }
    }

    div.disabled = true;

    let wordval = 0;
    for (let i = 0; i < wordlistvalues.length; i++) {
      if (wordlistvalues[i][0] == selected) {
        wordval = wordlistvalues[i][1];
      }
    }
    text =
      '"' +
      letter +
      '" was found ' +
      count +
      " times <br> " +
      selected +
      " x " +
      count +
      " = $" +
      count * wordval;
    earnings += count * wordval;

    // writing letters
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words[i].length; j++) {
        if (words[i][j] === letter) {
          document.getElementById("cell" + (wordpos[i] + j)).innerHTML = letter;
        }
      }
    }

    // check if game ended
    letdivs = document.getElementsByClassName("gamebox");
    for (let i = 0; i < letdivs.length; i++) {
      if (letdivs[i].innerHTML == "") {
        gamefinshed = false;
      }
    }
  }

  document.getElementById("bal").innerHTML = earnings;

  document.getElementById("note").innerHTML = text;
  document.getElementById("frontguess").innerHTML=turncount;
  document.getElementById("popup3").style.display = "block";
  document.getElementById("ws").disabled = false;
  document.getElementById("iknow").disabled = true;
  document.getElementById("letterscon").style.display = "none";

  if (gamefinshed) {
   gamefinshed();
  }
}

function newgame() {
  document.getElementById("shadow").style.display = "none";
  document.getElementById("finishedgame").style.display = "none";
  createboard();
  createabc();
}

function gamefinshed() {
  console.log("game finshed");
  document.getElementById("shadow").style.display = "block";
  document.getElementById("popup3").style.display = "none";
  document.getElementById("finishedgame").style.display = "block";
  document.getElementById("senwas").innerHTML =
    'THE SENTENCE WAS: "' + sentence + '"';
  document.getElementById("moneywon").innerHTML =
    "YOU HAVE WON: $" + earnings;
  document.getElementById("turnstook").innerHTML =
    "IT TOOK YOU " + turncount + " TRIES";
}