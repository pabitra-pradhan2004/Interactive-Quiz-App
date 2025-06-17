const questions = [
  {
    question: "HTTPS stands for?",
    answers: [
      { text: "Hypertext Transfer Protocol Secure", correct: true },
      { text: "Hypertext Transfer Performance", correct: false },
      { text: "Hypertext Transition Protocol", correct: false },
      { text: "Hyperlink Transfer Protocol", correct: false }
    ]
  },
  {
    question: "In CSS, what does the padding property do?",
    answers: [
      { text: " Adds space outside the border of an element", correct: false },
      { text: "Adds space inside the border of an element", correct: true },
      { text: "Sets the color of the element's background", correct: false },
      { text: "Defines the font size of text", correct: false }
    ]
  },
  {
    question: "JavaScript is used for?",
    answers: [
      { text: "Styling the webpage", correct: false },
      { text: "Structuring the webpage", correct: false },
      { text: "Making the webpage interactive", correct: true },
      { text: "Managing the server", correct: false }
    ]
  }
  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");

const QUIZ_TIME_LIMIT = 15;
let currentTime = QUIZ_TIME_LIMIT;
let timer = null;

let currentQuestionIndex = 0;
let score = 0;

function startTimer() {
  clearInterval(timer);
  currentTime = QUIZ_TIME_LIMIT;
  timerDisplay.textContent = `${currentTime}s`;

  timer = setInterval(() => {
    currentTime--;
    timerDisplay.textContent = `${currentTime}s`;

    if (currentTime <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "Time's up!";
      disableAnswers();
      nextButton.style.display = "block";
    }
  }, 1000);
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();

  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timer);
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  timerDisplay.textContent = "";
}

function selectAnswer(e) {
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("inCorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function disableAnswers() {
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
}

function showScore() {
  resetState();
  questionElement.innerHTML = ` You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
