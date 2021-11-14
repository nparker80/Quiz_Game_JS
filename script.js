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

//#region Variables
//#region Constants
// header
const timeEl = document.getElementById("time-span");
const scoreEl = document.getElementById("score-span");

// start div
const startContainer = document.getElementById("start-div");
const startBtn = document.getElementById("start-btn");
const viewScoresBtn = document.getElementById("viewscores-btn");

// quiz div
const quizContainer = document.getElementById("quiz-div");
const questionText = document.getElementById("question-field");
const answerBtn0 = document.getElementById("answer-btn0");
const answerBtn1 = document.getElementById("answer-btn1");
const answerBtn2 = document.getElementById("answer-btn2");
const answerBtn3 = document.getElementById("answer-btn3");

// complete div
const completeContainer = document.getElementById("complete-div");
const userScore = document.getElementById("user-score");
const scoreInitialsInput = document.getElementById("score-initials-input");
const submitBtn = document.getElementById("submit-btn");

// highScore div
const highScoresContainer = document.getElementById("high-score-div");
const rankH1 = document.getElementById("rank-h1");
const scoreList = document.getElementById("score-list");
const restartBtn = document.getElementById("restart-btn");
const clearBtn = document.getElementById("clear-btn");
//#endregion

//#region let
let highScores = [];
let clonedQuestions = [...questions];
let secondsLeft = clonedQuestions.length * 10 + 1;
let score = 0;
let countdown;
let correctAnswer;

//#endregion
//#endregion

function resetQuiz() {
  quizContainer.style.display = "none";
  completeContainer.style.display = "none";
  highScoresContainer.style.display = "none";
  startContainer.style.display = "block";
  clonedQuestions = [...questions];
  secondsLeft = clonedQuestions.length * 10 + 1;
  setTime(secondsLeft);
  score = 0;
  setScore(score);
}

function startQuiz() {
  startContainer.style.display = "none";
  quizContainer.style.display = "block";

  startTimer();
  handleNextQuestion();
}

function endQuiz() {
  quizContainer.style.display = "none";
  completeContainer.style.display = "block";
  clearInterval(countdown);
  setTime(secondsLeft);
  score += secondsLeft;
  setScore(score);
}

function setTime(seconds) {
  timeEl.textContent = "Time: " + seconds;
}

function setScore(points) {
  scoreEl.textContent = "Score: " + points;
}

function startTimer() {
  countdown = setInterval(function () {
    secondsLeft--;
    setTime(secondsLeft);
    if (secondsLeft === 0) {
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
    setScore(score);
  } else {
    secondsLeft -= 5;
  }
  handleNextQuestion();
}

function displayScore() {
  startContainer.style.display = "none";
  quizContainer.style.display = "none";
  completeContainer.style.display = "none";
  highScoresContainer.style.display = "block";
  userScore.textContent = "Your Score: " + score + "!";
  highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
  let newChildren = highScores
    .map((hs, i) => {
      return "<li>" + hs.name + ", " + hs.score + "</li>";
    })
    .join("");
  scoreList.innerHTML = newChildren;
}

function submitScore() {
  let userNameInput = scoreInitialsInput.value;

  let newScore = {
    name: userNameInput,
    score: score,
  };

  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  scoreInitialsInput.textContent = null;
  let userRank =
    highScores.findIndex((hs) => {
      return hs.name === newScore.name && hs.score === newScore.score;
    }) + 1;
  rankH1.textContent = "Rank " + userRank;
  displayScore();
}

startBtn.addEventListener("click", startQuiz);
viewScoresBtn.addEventListener("click", () => {
  displayScore();
});
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
submitBtn.addEventListener("click", () => {
  submitScore();
});
clearBtn.addEventListener("click", () => {
  localStorage.clear();
});
restartBtn.addEventListener("click", () => {
  resetQuiz();
});

resetQuiz();
