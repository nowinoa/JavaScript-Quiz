const questions = [
  {
    ques: "What is the difference between let and var in JavaScript?",
    answers: [
      "let can only be used inside an if statement",
      "var is deprecated and should no longer be used",
      "let can only be used inside a loop",
      "let is block-scoped while var is function-scoped",
    ],
    correct: "let is block-scoped while var is function-scoped",
  },
  {
    ques: "What is the difference between == and === in JavaScript?",
    answers: [
      "== and === are the same thing",
      "== compares values, === compares values and types",
      "=== is more efficient than ==",
      " == is used for strings, === is used for numbers",
    ],
    correct: "== compares values, === compares values and types",
  },
  {
    ques: "What is the syntax for an object in JavaScript?",
    answers: [
      "{key: value, key: value}",
      "<key, value, key, value>",
      "[key, value, key, value]",
      "(key, value, key, value)",
    ],
    correct: "{key: value, key: value}",
  },
  {
    ques: "How do you add an element to an array in JavaScript?",
    answers: [
      "myArray[myArray.length] = element",
      "myArray.add(element)",
      "myArray.insert(element)",
      "myArray.push(element)",
    ],
    correct: "myArray.push(element)",
  },
  {
    ques: "How do you access an element in an array in JavaScript?",
    answers: [
      "myArray.get(index)",
      "myArray[index]",
      "myArray.value(index)",
      "myArray.element",
    ],
    correct: "myArray[index]",
  },
  {
    ques: "How do you call a function in JavaScript?",
    answers: [
      "call myFunction()",
      "execute myFunction()",
      "run myFunction()",
      "myFunction()",
    ],
    correct: "myFunction()",
  },
  {
    ques: "What is the function in JavaScript to convert a number to a string?",
    answers: [
      "toString()",
      "stringify()",
      "numberToString()",
      "convertToString()",
    ],
    correct: "toString()",
  },
  {
    ques: "How to load data from local storage in javascript?",
    answers: [
      "var data = localStorage.getItem('key')",
      "var data = loadStorage('key')",
      "var data = window.localStorage.load('key')",
      "var data = storage.load('key')",
    ],
    correct: "var data = loadStorage('key')",
  },
  {
    ques: "How to get the target element of an event in javascript?",
    answers: [
      "var target = event.target",
      "var target = this",
      "var target = event.srcElement",
      "var target = event.currentTarget",
    ],
    correct: "var target = event.target",
  },
  {
    ques: "How to add an event listener to a DOM element in javascript?",
    answers: [
      "element.attachEvent('event', function)",
      "element.on('event', function)",
      "element.addEventListener('event', function)",
      "element.listen('event', function)",
    ],
    correct: "element.addEventListener('event', function)",
  },
];

//inner a start btn on the div container
var container = document.getElementById("container");
var startBtn = `<button id='startBtn' class='startBtn'>Start</button>`;

var time = 60;
var score = 0;
var i = 0;
//starting btn
window.addEventListener("load", writeStart);
function writeStart() {
  container.innerHTML = startBtn;
  var idBtn = document.getElementById("startBtn");
  idBtn.addEventListener("click", start);
}
//when clicking the btn
//the btn disapears
//the questionary is written
//the time starts
function start() {
  startBtn.style = "display: none";
  time = 60;
  score = 0;
  i = 0;
  var setTime = setInterval(function () {
    time--;
    document.getElementById("time").innerHTML = time;
  }, 1000);
  writeQuestionary();
}
var questionary = `
<div class= "results">
    <h4>Time left:<span id="time"> ${time}</span></h4>
    <h4>Score: <span id="score">${score}</span></h4>
</div>
<div class="questionary" id="questionary">
    <h2 id="question">${questions[i].ques}</h2>
    <div class="answers">
        <button class="answer" data-number="0">${questions[i].answers[0]}</button>
        <button class="answer" data-number="1">${questions[i].answers[1]}</button>
        <button class="answer" data-number="2">${questions[i].answers[2]}</button>
        <button class="answer" data-number="3">${questions[i].answers[3]}</button>
    </div>
    <p>is correct</p>
</div>
`;
function writeQuestionary() {
  container.innerHTML = questionary;
  var answer = document.querySelectorAll(".answer");
  document.getElementById("time").innerHTML = time;
  document.getElementById("score").innerHTML = score;  
  document.getElementById("question").innerHTML = questions[i].ques;
  answer.forEach(btn => btn.addEventListener('click', checkEvent));
  answer.forEach( btn => btn.textContent = questions[i].answers[btn.dataset.number]);
}

function checkEvent(event) {
  element = event.target;
//if is a btn
if (element.tagName === "BUTTON") {
  if(score === 10) {
    container.innerHTML = 'hey'   
  } else if (i < 9) {
      i++;
  } else if( i = 9) {
    container.innerHTML = 'ja'
  }
  
} }
// function checkIndex(i) {
//     if (i < 9) {
//         i++;
//         writeQuestionary();
//     } else if( i = 9) {
//       console.log('no more questions')
//     }
// }

// if(i < 9) {
//   i++
//   writeQuestionary()
// } else if (i >= 9) {
//   container.innerHTML = 'ja'
// }