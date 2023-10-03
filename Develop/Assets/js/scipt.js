var timeLeft = 60;
var timerInterval;
var questionIndex = 0;

var startButton = document.getElementById("start-button");
var choicesDiv = document.getElementById('choices');
var answerChoicesEl = document.getElementById('answerCheck');
var timerEl = document.getElementById("time-left");
var submitButton = document.getElementById("highScoreBtn");

startButton.addEventListener("click", startQuiz);
choicesDiv.addEventListener("click", checkAnswer);
submitButton.addEventListener("click", saveHighScore);



//activates when ever start button is clicked
function startQuiz() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    startButton.setAttribute('class', 'hide');
    
    loadQuestion();

    timerInterval = setInterval(updateTimer, 1000);
}

//loads question and answer choices
function loadQuestion () {
    if (questionIndex >= questions.length) {
        quizEnd();
        return;
    }

    choicesDiv.innerHTML = "";

    var currentQuestion = questions[questionIndex];

    var questionDiv = document.getElementById("question-text");
    questionDiv.textContent = currentQuestion.title;

    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var choice = currentQuestion.choice[i];
        var choiceEl = document.createElement('button');

        choiceEl.setAttribute('class', 'choice');
        choiceEl.setAttribute('value',  choice);

        choiceEl.textContent = i + 1 + '. ' + choice;

        choicesDiv.appendChild(choiceEl);
    }
}

// timer starts once start button is clicked
function updateTimer() {
    timerEl.textContent = timeLeft;
    if(timeLeft === 0) {
        quizEnd();
        clearInterval(timerInterval);
        alert("Time's up quiz over!");
    } else {
        timeLeft--
    }
}


function checkAnswer(event) {
    var buttonEl = event.target;
    //  if user clicks element outside of button choices return null value or do nothing
    if (!buttonEl.matches(".choice")) {
        return;
    }

    if (buttonEl.value !== questions[questionIndex].correctAnswer) {
        timeLeft -= 10;

        if(timeLeft < 0 ) {
            timeLeft = 0;
        }

        timerEl.textContent = timeLeft;

        answerChoicesEl.textContent = "Incorrect!";
    } else {
        answerChoicesEl.textContent = "Correct!";
    }
    questionIndex++;
    loadQuestion();
}

function quizEnd () {
    document.querySelector("#scoreForm").classList.remove("hide");

    document.getElementById("quiz-container").style.display = "none";

    clearInterval(timerInterval);

    document.getElementById("highScore").textContent = timeLeft;
}

function saveHighScore () {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    var initials = document.querySelector("#initials").value;

    var score = timeLeft;

    var userSubmission = {initials, score};

    highScores.push(userSubmission);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    document.querySelector("#scoreForm").classList.add("hide");

    renderHighScores();
}

function renderHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    if(!highScores.length){
        return;
    } 

    for (var highScore of highScores) {
        
        var container = document.createElement("div")
        container.style.display = "flex";

        var initials = document.createElement("p");
        initials.textContent = highScore.initials +  ": ";

        var score = document.createElement("p");
        score.textContent = highScore.score;

        container.append(initials, score);

        document.querySelector("#highScoreList").append(container);

    }
}





// to do
// 
// add the ability to save my initials and score