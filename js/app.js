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

var container = document.getElementById('container');
var results = document.querySelector('#results');
let pCorrect = document.getElementById('is-correct');
var i = 0;
var time = 60;
var score = 0;

var questionaryContent = `
<div class="questionary">
  <h2 id="question">question</h2>
  <div id="answers-container">
    <button class="answer" data-number="0"></button>
    <button class="answer" data-number="1"></button>
    <button class="answer" data-number="2"></button>
    <button class="answer" data-number="3"></button>
  </div>
`
var result = `
  <h4 id="timer"></h4>
  <h4 id="scorer"></h4>
`;
var start = function innerStart() {
  i = 0;
  time = 60;
  score = 0;
  container.innerHTML = `
  <button id='startBtn' class='startBtn'>Start</button>
  `
  var startBtn = document.getElementById("startBtn");

  startBtn.addEventListener('click', writeQuestionary);
  pCorrect.style = 'display: block';
};
start();

function writeQuestionary() {
  writeResults();
  container.innerHTML = questionaryContent;
  var answersContainer = document.getElementById('answers-container');
  var answer = answersContainer.querySelectorAll('.answer');
  var questionTitle = document.getElementById('question');
  writeQuestion(questionTitle);
  writeAnswer(answer);
}
function writeResults() {
  results.innerHTML = result;
  var timer = document.querySelector('#timer');
  var scorer = document.querySelector('#scorer');
  timer.textContent = time;
  scorer.textContent = score;
}

function writeQuestion(question) {
  question.textContent = questions[i].ques;
}
function writeAnswer(answer) {
  answer.forEach((a) => {
      a.textContent = questions[i].answers[a.dataset.number];
      a.addEventListener("click", checkEvent);
  });
}
function checkEvent(event) {
  element = event.target;
//if is a btn
if (element.tagName === "BUTTON") {
  if(i < 9) {
      isCorrect(element);
      i++;
      return writeQuestionary();
  } else if (i = 9) {
      isCorrect(element);
  } else if (i > 9 && score !== 10) {
      endContent('There is no more questions :(');
  }
  
} }
function isCorrect(a) {
      let pCorrect = document.getElementById('is-correct');
      if(a.textContent == questions[i].correct && score !== 10) {
          score++;
         pCorrect.textContent = 'Correct!'
      } else if (a.textContent !== questions[i].correct && score != 10){
         pCorrect.textContent = 'Incorrect...'
      } else {
          endContent("You won!")
      }
}
function endContent(h2End) {
  pCorrect.style = 'display: none';
  container.innerHTML = `
  <h2>${h2End}</h2>
  <p>You answered all the questions correctly. No everyone is able</p>
  <p>Time: ${time}</p>
  <p>Score: ${score}</p>
  <button id='retryBtn'>Retry Quiz</button>
  `
  let retryBtn = document.getElementById('retryBtn');
  retryBtn.addEventListener('click', start)
};


//hay que quitar el display de result y del isCorrect cuando se desplega el end --> checkea la propiedad display: 
//añadir la funcion setTime out
//restar 5 segundos por fallo
// function setTimeout() {
//   var timerInterval = setInterval(function () {
//     if (time > 0) {
//       time--;
//       timer.textContent = time;
//     } else if ((time = 0)) {
//       clearInterval(timerInterval);
//     }
//   }, 1000);
// }