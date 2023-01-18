let start = document.querySelector(".start");
let start_btn = document.querySelector(".start-btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
let timeCount = document.querySelector(".timer .timer_sec");
const quit_quiz = result_box.querySelector(".buttons .quit");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
const quit_memory_box = document.querySelectorAll(".memory-exit");
let saveBtn = document.querySelector(".save-result");
let socoresBtn = document.querySelector(".scores");
let namePlayer = document.getElementById("player");
let playerDeleteBtn = document.querySelector(".player-delete");
let player_box = document.querySelector(".player_box");
let playerListItem = document.querySelector(".player-info");
let showMemory = document.querySelector(".show-memory");
let memory_box = document.querySelector(".memory_box");
let memoryText = document.querySelector('.memory-text');
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let widthValue = 0;
let time = 60;

/* All Buttons onclick event*/
// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show info box
  start.classList.add("hidde");
  queCounter(1); //passing 1 parameter to queCounter
};
// if exitQuiz button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
  start.classList.remove("hidde");
};
// if continueQuiz button clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.add("activeQuiz"); //show quiz box
  showQuetions(0); //calling showQestions function
  clearInterval(counter);
  startTimer(); //calling startTimer function
};
// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounte
    timeText.textContent = "Time Left"; //change the timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
  } else {
    showResult(); //calling showResult function
  }
};
// if quitQuiz button clicked
quit_quiz.onclick = () => {
  window.location.reload(); //reload the current window
};
//shows memory box
showMemory.addEventListener("click", () => {
  memory_box.classList.remove("hidde");
  result_box.classList.remove("activeResult");
});
//When exit is clicked, the page reloads and you go to start box
quit_memory_box.forEach(
  (btn) =>
    (btn.onclick = () => {
      window.location.reload();
    })
);
playerDeleteBtn.onclick = () => deleteMemory();
saveBtn.onclick = () => {
  keepDetails();
  writeInfoPlayer();
  memoryText.textContent = 'Your details have been succesfully saved';
  saveBtn.setAttribute('disabled', 'disabled');
  saveBtn.style = 'opacity: 0.5';
  namePlayer.value = '';
};
socoresBtn.onclick = () => {
  showScore();
};

/* Functions */
// getting questions and options from array
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
//if user clicked on option
function optionSelected(answer) {
  // clearInterval(counter); //clear counter
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items

  if (userAns == correcAns) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    time -= 5;
    timeCount.textContent = time;
    console.log(time);
    answer.classList.add("incorrect"); //adding red color to correct selected option
    answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
}
//shows the correct answer
function showResult() {
  clearInterval(counter);
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span>and congrats! , You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (userScore > 1) {
    // if user scored more than 1
    let scoreTag =
      "<span>and nice , You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span>and sorry , You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}
//starts the time count after entering to the quiz box
function startTimer() {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value
    if (time < 9) {
      //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      //if timer is less than 0
      showResult();
      clearInterval(counter); //clear counter
      timeText.textContent = "Time Off"; //change the time text to time off
      const allOptions = option_list.children.length; //getting all option items
      let correcAns = questions[que_count].answer; //getting correct answer from array
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
          option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      next_btn.classList.add("show"); //show the next button if user selected any option
    }
  }
}
//actualizes the index to interact with questions[index] -> questions.js -> this makes the code flexible so you can add more questions
function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
//keeps the values of score and name on local storage
function keepDetails() {
  let name = namePlayer.value;
  window.localStorage.setItem("name", name);
  window.localStorage.setItem("score", userScore);
}
//shows the player details screen
function showScore() {
  player_box.classList.add("activePlayer");
  memory_box.classList.add("hidde");
}
//inners the info about the player on local storage in a <li>
function writeInfoPlayer() {
  let name = window.localStorage.getItem("name");
  let score = window.localStorage.getItem("score");
  playerListItem.textContent = name + ": " + score;
}
//clears the local storage
function deleteMemory() {
  window.localStorage.removeItem("score");
  window.localStorage.removeItem("name");
  playerListItem.textContent = "Name: score";
}
