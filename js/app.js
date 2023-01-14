
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
      "myArray.get(index)",
      "myArray.value(index)",
      "myArray[index]",
      "myArray.element",
    ],
    aV: "myArray[index]",
  },
  {
    ques: "How do you access an element in an array in JavaScript?",
    answers: [
      "call myFunction()",
      "execute myFunction()",
      "run myFunction()",
      "myFunction()",
    ],
    correct: "myFunction()",
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
    aV: "var target = event.target",
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

//Elements from HTML
let titleQuestion = document.querySelector("#question");
let answers = document.querySelector("#answers");
//Div to array
let btns = [...answers.children];

let i = 0;
let element;
console.log(questions[i].correct);
//writes the text of the buttons
function writteBtns() {
  btns.forEach((e) => {
    e.textContent = questions[i].answers[e.dataset.number];
  });
}
writteBtns();
//writes the question text
function writeQuestion() {
  titleQuestion.textContent = questions[i].ques;
}
writeQuestion();
//
function checkEvent(event) {
  //brings us the kind of tag it is
  element = event.target;
  //if is a btn
  if (element.tagName === "BUTTON") {
    //brings the text of the clicked btn
    let txt = event.target.textContent;
  //checks if is the correct answer
    if (txt === questions[i].correct) {
    console.log("ycorres");
    } else {
    console.log("nope");
    }
    //add 1 to the i - index
    i++;
    //if is 10, then bring it back to 0
    if (i >= 10) {
      i = 0;
    }
    writeQuestion();
    writteBtns();
  }
}

answers.addEventListener("click", checkEvent);
//Add the timer and the score
//if the question is correct add one point to score
//if the question is incorrect rest 5 seconds to the timer
//when time is equal 0 a modal jumps with the score, a btn.
//When you get the maximun - jumps a victory modal

//timer
// var timer = document.querySelector('#timer');
// var startTime = 60;
// function setTimeout() {
//     var timerInterval = setInterval(function() {
//         startTime--;
//         timer.textContent = startTime;
//         if(startTime == 0){
//             clearInterval(timerInterval);
//             console.log('Time out!')
//         }
//     }, 1000)
// }
// setTimeout();
