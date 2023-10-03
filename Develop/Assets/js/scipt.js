var timeLeft = 60;
var timerInterval;
var questionIndex = 0;

var startButton = document.getElementById("start-button");
var choicesDiv = document.getElementById('choices');
var answerChoicesEl = document.getElementById('answerCheck');
var timerEl = document.getElementById("time-left");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    startButton.setAttribute('class', 'hide');

    loadQuestion();

    timerInterval = setInterval(updateTimer, 1000);
}

function loadQuestion () {
    var currentQuestion = questions[questionIndex];

    console.log(questions[questionIndex]);

    var questionDiv = document.getElementById("question-text");
    questionDiv.textContent = currentQuestion.title;

    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var choice = currentQuestion.choice[i];
        var choiceEl = document.createElement('button');

        choiceEl.setAttribute('class', 'choice');
        choiceEl.setAttribute('value',  choice);
    }
}