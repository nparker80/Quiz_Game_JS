const questions = [
  {
    question: "DOM stands for:",
    choices: [
      "Document Object Module",
      "Document Object Model",
      "Derivative Object Modification",
      "None of the Above",
    ],
    answer: 1,
  },

  {
    question: "Which of the following is a primitive data type in JavaScript?",
    choices: ["Boolean", "String", "Number", "All of the above"],
    answer: 3,
  },

  {
    question: "What will the following code return: Boolean(10>9):",
    choices: ["NaN", "True", "False", "None of the above"],
    answer: 1,
  },
];

const startBtn = document.getElementById("startQuiz");
const submitBtn = document.querySelector("button.submitBtn");
const answerBtn0 = document.getElementById("answerBtn0");
const answerBtn1 = document.getElementById("answerBtn1");
const answerBtn2 = document.getElementById("answerBtn2");
const answerBtn3 = document.getElementById("answerBtn3");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const questionText = document.getElementById("question-field");
const submitScoreElement = document.querySelector("#submit-score");
let restartBtn = document.querySelector("#restartBtn");
let clearBtn = document.querySelector("#clearBtn");
// let scoreList = document.getElementById("#scoreList");

let userNameInput;
let userScore = document.getElementById("user-score");
let score = 0;
let questionNumber = -1;
let correctAnswer;
let clonedQuestions = [...questions];
let secondsLeft = clonedQuestions.length * 10 + 1;
let countdown;

function startQuiz() {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  startBtn.disabled = true;
  answerBtn0.disabled = false;
  answerBtn1.disabled = false;
  answerBtn2.disabled = false;
  answerBtn3.disabled = false;

  setTime();

  handleNextQuestion();
}

function endQuiz() {
  clearInterval(countdown);
  setTimeout(displayScore, 500);
  answerBtn0.disabled = true;
  answerBtn1.disabled = true;
  answerBtn2.disabled = true;
  answerBtn3.disabled = true;
}

function setTime() {
  countdown = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0 || questionNumber === clonedQuestions.length) {
      endQuiz();
    }
  }, 1000);
}

function handleNextQuestion() {
  const length = clonedQuestions.length;
  if (length === 0) {
    endQuiz();
    return;
  }
  const random = Math.floor(Math.random() * length);
  const currentQuestion = clonedQuestions[random];
  clonedQuestions.splice(random, 1);
  correctAnswer = currentQuestion.answer;
  questionText.textContent = currentQuestion.question;
  answerBtn0.textContent = currentQuestion.choices[0];
  answerBtn1.textContent = currentQuestion.choices[1];
  answerBtn2.textContent = currentQuestion.choices[2];
  answerBtn3.textContent = currentQuestion.choices[3];
}

function handleAnswer(choice) {
  if (choice === correctAnswer) {
    score++;
    scoreEl.textContent = score;
  } else {
    secondsLeft -= 5;
  }
  handleNextQuestion();
}

function displayScore() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("submit-score").style.display = "block";
  userScore.textContent = "Your Score:" + secondsLeft + "!";
}

function addScore() {
  userNameInput = document.getElementById("userInitials").value;

  let newScore = {
    name: userNameInput,
    score: secondsLeft,
  };

  let highScores = JSON.parse(localStorage.getItem("Scores") || "[]");
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

// var allScores = localStorage.getItem("allScores");
// topRank = JSON.parse(allScores);
// if (allScores !== null) {
//   for (var i = 0; i < allScores.length; i++) {
//     var createLi = document.createElement("li");
//     createLi.textContent = allScores[i].initials + " " + allScores[i].score;
//     scoreList.appendChild(createLi);
//   }
// }

startBtn.addEventListener("click", startQuiz);
answerBtn0.addEventListener("click", () => {
  handleAnswer(0);
});
answerBtn1.addEventListener("click", () => {
  handleAnswer(1);
});
answerBtn2.addEventListener("click", () => {
  handleAnswer(2);
});
answerBtn3.addEventListener("click", () => {
  handleAnswer(3);
});
submitBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  addScore();
});
clearBtn.addEventListener("click", function () {
  localStorage.clear();
});
restartBtn.addEventListener("click", function () {
  window.location.replace("./index.html");
});
